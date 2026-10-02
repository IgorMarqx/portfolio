"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  rotulo: string;
};

/**
 * Vídeo em miniatura do cartão: mudo, em laço, decorativo. Só baixa quando o
 * cartão chega perto da tela e só toca enquanto está visível — são arquivos de
 * ~20MB e a página tem vários cartões.
 */
export function MiniaturaVideo({ src, rotulo }: Props) {
  const caixa = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [carregar, setCarregar] = useState(false);

  useEffect(() => {
    const elemento = caixa.current;
    if (!elemento) return;
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) setCarregar(true);
        const player = video.current;
        if (!player) return;
        if (entrada.isIntersecting && !semMovimento) player.play().catch(() => undefined);
        else player.pause();
      },
      { rootMargin: "200px 0px" },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, [carregar]);

  return (
    <div ref={caixa} className="relative h-full w-full overflow-hidden">
      {carregar ? (
        <video
          ref={video}
          src={src}
          aria-hidden
          muted
          loop
          playsInline
          preload="metadata"
          // A gravação tem margem em volta da janela do app: o zoom tira a sobra.
          className="absolute inset-0 h-full w-full origin-top scale-[1.45] object-cover object-top"
        />
      ) : null}
      <span className="absolute bottom-2 left-2 border border-line bg-canvas/85 px-2 py-0.5 text-[10px] tracking-[0.2em] text-muted backdrop-blur">
        {rotulo}
      </span>
    </div>
  );
}

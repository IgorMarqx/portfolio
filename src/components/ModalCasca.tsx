"use client";

import { useEffect, useRef, useState } from "react";

import { VisualizadorMidia } from "@/components/VisualizadorMidia";
import { useLeituraGuiada } from "@/hooks/useLeituraGuiada";

type Imagem = { rotulo: string; legenda: string; src?: string; video?: string };

/** Texto do trecho atual, usado como legenda na tela cheia. */
export type Trecho = { titulo: string; paragrafos: string[] };

type Props = {
  etiqueta: string;
  titulo: string;
  subtitulo: string;
  imagem: Imagem;
  trecho: Trecho;
  /** Indicadores do rodapé do palco: um por trecho de leitura. */
  passos: { chave: string; rotulo: string }[];
  passoAtual: number;
  onIrParaPasso: (indice: number) => void;
  onFechar: () => void;
  areaRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
};

/**
 * Casca dos modais de projeto: fundo, teclado, trava de rolagem, cabeçalho e o
 * palco de imagem em cima. O conteúdo de baixo é de quem usa a casca.
 */
export function ModalCasca({
  etiqueta,
  titulo,
  subtitulo,
  imagem,
  trecho,
  passos,
  passoAtual,
  onIrParaPasso,
  onFechar,
  areaRef,
  children,
}: Props) {
  const fechar = useRef<HTMLButtonElement>(null);
  const videoPalco = useRef<HTMLVideoElement>(null);
  const progressoPasso = useRef<HTMLSpanElement>(null);
  const [ampliada, setAmpliada] = useState<{ inicio: number } | null>(null);
  const temMidia = Boolean(imagem.video || imagem.src);
  const ultimoPasso = passos.length - 1;

  useLeituraGuiada(areaRef, videoPalco, passoAtual, !ampliada && Boolean(imagem.video));

  // O tracinho do trecho atual enche conforme o vídeo anda: mostra quando ele vai virar.
  useEffect(() => {
    const preenchimento = progressoPasso.current;
    if (!preenchimento) return;
    if (!imagem.video) {
      preenchimento.style.width = "100%";
      return;
    }
    let quadro = 0;
    function acompanhar() {
      quadro = requestAnimationFrame(acompanhar);
      const video = videoPalco.current;
      if (!video?.duration || !preenchimento) return;
      preenchimento.style.width = `${(video.currentTime / video.duration) * 100}%`;
    }
    preenchimento.style.width = "0%";
    quadro = requestAnimationFrame(acompanhar);
    return () => cancelAnimationFrame(quadro);
  }, [imagem.video, passoAtual]);

  /** Vídeo acabou: segue para o próximo trecho, e o último recomeça. */
  function aoTerminarVideo(video: HTMLVideoElement) {
    if (passoAtual < ultimoPasso) {
      onIrParaPasso(passoAtual + 1);
      return;
    }
    video.currentTime = 0;
    // Pausa no meio do play() rejeita a promise; não é erro.
    video.play().catch(() => undefined);
  }

  function ampliar() {
    const video = videoPalco.current;
    // Um vídeo só tocando: o do palco para enquanto a tela cheia está aberta.
    video?.pause();
    setAmpliada({ inicio: video?.currentTime ?? 0 });
  }

  function fecharAmpliacao() {
    setAmpliada(null);
    videoPalco.current?.play().catch(() => undefined);
  }

  useEffect(() => {
    fechar.current?.focus();
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") onFechar();
    }

    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = overflowAnterior;
    };
  }, [onFechar]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={titulo}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-0 backdrop-blur-sm sm:p-6"
      onMouseDown={(evento) => {
        if (evento.target === evento.currentTarget) onFechar();
      }}
    >
      <div className="painel flex h-[100dvh] w-full max-w-6xl flex-col overflow-hidden sm:h-[88vh]">
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-8">
          <div className="min-w-0">
            <p className="text-[11px] tracking-[0.15em] text-accent">
              {etiqueta}
            </p>
            <h3 className="mt-1 text-lg font-bold leading-snug sm:text-2xl">
              {titulo}
            </h3>
            <p className="rotulo mt-1">{subtitulo}</p>
          </div>

          <button
            ref={fechar}
            type="button"
            onClick={onFechar}
            aria-label="Fechar"
            className="flex h-10 shrink-0 items-center border border-line px-3 text-[11px] font-semibold tracking-[0.15em] transition-colors hover:border-accent hover:text-accent"
          >
            <span className="hidden sm:inline">ESC&nbsp;</span>✕
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col">
          {/* Sem mídia o palco encolhe e o texto ganha a tela; a altura anima para não dar solavanco. */}
          <figure
            className={`flex shrink-0 flex-col gap-3 overflow-hidden border-b border-line bg-panel px-4 pb-2 pt-4 transition-[height] duration-500 ease-out sm:px-8 sm:pt-5 ${
              temMidia ? "h-[38vh] min-h-[180px] sm:h-[52vh]" : "h-[150px] sm:h-[164px]"
            }`}
          >
            {temMidia ? (
              <button
                type="button"
                onClick={ampliar}
                aria-label={`Ampliar: ${imagem.legenda}`}
                className="group relative min-h-0 flex-1 cursor-zoom-in overflow-hidden bg-canvas/60"
              >
                {imagem.video ? (
                  // key força o recarregamento ao trocar de capítulo.
                  <video
                    ref={videoPalco}
                    key={imagem.video}
                    src={imagem.video}
                    aria-hidden
                    autoPlay={!ampliada}
                    muted
                    playsInline
                    onEnded={(evento) => {
                      if (!ampliada) aoTerminarVideo(evento.currentTarget);
                    }}
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imagem.src}
                    alt=""
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                )}

                <span className="absolute bottom-3 right-3 flex items-center gap-2 border border-line bg-canvas/85 px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-fg/80 backdrop-blur transition-colors group-hover:border-accent group-hover:text-accent">
                  ⤢ AMPLIAR
                </span>
              </button>
            ) : (
              // Trecho sem tela para mostrar: o palco vira cartão de capítulo, sem
              // mudar de altura — o texto de baixo não pula ao rolar.
              <div className="grade flex min-h-0 flex-1 items-center gap-4 border border-line bg-canvas/40 px-5">
                <span className="shrink-0 text-[11px] tracking-[0.2em] text-accent">
                  {String(passoAtual + 1).padStart(2, "0")} — {imagem.rotulo}
                </span>
                <span className="truncate text-sm font-semibold text-fg/80 sm:text-base">
                  {passos[passoAtual]?.rotulo}
                </span>
              </div>
            )}

            <figcaption className="text-xs leading-relaxed text-muted">
              <span className="text-accent">
                {String(passoAtual + 1).padStart(2, "0")}/
                {String(passos.length).padStart(2, "0")}
              </span>{" "}
              {imagem.legenda}
            </figcaption>

            <div className="flex gap-1.5">
              {passos.map((passo, indice) => (
                <button
                  key={passo.chave}
                  type="button"
                  onClick={() => onIrParaPasso(indice)}
                  aria-label={passo.rotulo}
                  aria-current={passoAtual === indice}
                  className="group flex h-6 flex-1 items-center"
                >
                  <span
                    className={`relative block h-1 w-full overflow-hidden transition-colors ${
                      indice < passoAtual
                        ? "bg-accent/40"
                        : "bg-line group-hover:bg-muted"
                    }`}
                  >
                    {passoAtual === indice ? (
                      <span
                        ref={progressoPasso}
                        className="absolute inset-y-0 left-0 w-0 bg-accent"
                      />
                    ) : null}
                  </span>
                </button>
              ))}
            </div>
          </figure>

          <div
            ref={areaRef}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-8 sm:px-8 sm:py-10"
          >
            <div className="mx-auto max-w-2xl">{children}</div>
          </div>
        </div>
      </div>

      {ampliada ? (
        <VisualizadorMidia
          imagem={imagem}
          trecho={trecho}
          inicio={ampliada.inicio}
          passoAtual={passoAtual}
          totalPassos={passos.length}
          onIrParaPasso={onIrParaPasso}
          onTerminarVideo={aoTerminarVideo}
          onFechar={fecharAmpliacao}
        />
      ) : null}
    </div>
  );
}

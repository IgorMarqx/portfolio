"use client";

import { useEffect, useRef } from "react";

type Imagem = { rotulo: string; legenda: string; src?: string };

type Props = {
  etiqueta: string;
  titulo: string;
  subtitulo: string;
  imagem: Imagem;
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
 * palco de imagem à esquerda. O conteúdo da direita é de quem usa a casca.
 */
export function ModalCasca({
  etiqueta,
  titulo,
  subtitulo,
  imagem,
  passos,
  passoAtual,
  onIrParaPasso,
  onFechar,
  areaRef,
  children,
}: Props) {
  const fechar = useRef<HTMLButtonElement>(null);

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

        <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] lg:grid-cols-[1.35fr_1fr] lg:grid-rows-1">
          <figure className="flex h-[38vh] min-h-[180px] flex-col gap-3 border-b border-line bg-panel p-4 sm:p-6 lg:h-auto lg:min-h-0 lg:gap-4 lg:border-b-0 lg:border-r lg:p-8">
            <div className="flex flex-1 items-center justify-center border border-dashed border-line">
              {imagem.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagem.src}
                  alt={imagem.legenda}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="px-4 text-center text-[11px] tracking-[0.2em] text-muted">
                  {imagem.rotulo}
                  <span className="mt-2 block text-[10px] tracking-normal text-muted/70">
                    imagem ainda não capturada
                  </span>
                </span>
              )}
            </div>

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
                    className={`block h-1 w-full transition-colors ${
                      passoAtual === indice
                        ? "bg-accent"
                        : "bg-line group-hover:bg-muted"
                    }`}
                  />
                </button>
              ))}
            </div>
          </figure>

          <div
            ref={areaRef}
            className="min-h-0 overflow-y-auto overscroll-contain px-4 py-5 sm:px-8 sm:py-6"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

import type { Trecho } from "@/components/ModalCasca";
import { contarPalavras, PALAVRAS_POR_SEGUNDO, progressoDeLeitura } from "@/lib/ritmo-de-leitura";

type Props = {
  imagem: { rotulo: string; legenda: string; src?: string; video?: string };
  trecho: Trecho;
  /** Segundo em que o vídeo do palco estava — a ampliação continua dali. */
  inicio: number;
  passoAtual: number;
  totalPassos: number;
  onIrParaPasso: (indice: number) => void;
  onTerminarVideo: (video: HTMLVideoElement) => void;
  onFechar: () => void;
};

const ZOOM_MIN = 1;
const ZOOM_MAX = 5;
const LEGENDA_MINIMA_MS = 5000;

type Vista = { escala: number; x: number; y: number };

const VISTA_INICIAL: Vista = { escala: 1, x: 0, y: 0 };

/**
 * Tela cheia por cima do modal do projeto, com zoom e arrasto. Roda do mouse e
 * pinça ampliam em direção ao ponteiro; duplo clique alterna entre 1x e 2.5x.
 *
 * O texto do trecho corre embaixo como legenda de filme: com vídeo, cada
 * parágrafo ocupa uma fatia igual da duração; sem vídeo, o tempo de leitura.
 */
export function VisualizadorMidia({
  imagem,
  trecho,
  inicio,
  passoAtual,
  totalPassos,
  onIrParaPasso,
  onTerminarVideo,
  onFechar,
}: Props) {
  const palco = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const ponteiros = useRef(new Map<number, { x: number; y: number }>());
  const pinca = useRef<{ distancia: number; escala: number } | null>(null);
  const rolagemLegenda = useRef<HTMLDivElement>(null);
  const barra = useRef<HTMLDivElement>(null);
  /** O `inicio` vale só para o vídeo que estava no palco ao abrir. */
  const videoDeAbertura = useRef(imagem.video);
  const [vista, setVista] = useState<Vista>(VISTA_INICIAL);
  const [pausado, setPausado] = useState(false);
  const [comLegenda, setComLegenda] = useState(true);
  const [paragrafo, setParagrafo] = useState(0);

  // Em ref: quem chama recria a função a cada render, e o relógio da legenda não pode zerar por isso.
  const irParaPasso = useRef(onIrParaPasso);
  irParaPasso.current = onIrParaPasso;

  const { video, src } = imagem;
  const totalParagrafos = trecho.paragrafos.length;
  const textoAtual = trecho.paragrafos[paragrafo] ?? "";
  const comTexto = comLegenda && totalParagrafos > 0;
  const ultimoPasso = totalPassos - 1;

  // Trocou de trecho: zoom e legenda recomeçam.
  useEffect(() => {
    setVista(VISTA_INICIAL);
    setParagrafo(0);
    setPausado(false);
  }, [passoAtual]);

  // Sem vídeo, a legenda anda pelo tempo de leitura e, no fim, passa o trecho.
  useEffect(() => {
    if (video || pausado) return;
    const palavras = contarPalavras(textoAtual);
    const espera = Math.max(LEGENDA_MINIMA_MS, (palavras / PALAVRAS_POR_SEGUNDO) * 1000);

    const relogio = setTimeout(() => {
      if (paragrafo < totalParagrafos - 1) setParagrafo(paragrafo + 1);
      else if (passoAtual < ultimoPasso) irParaPasso.current(passoAtual + 1);
    }, espera);
    return () => clearTimeout(relogio);
  }, [video, pausado, paragrafo, textoAtual, totalParagrafos, passoAtual, ultimoPasso]);

  // Com vídeo: a legenda rola contínua (texto corrido, como teleprompter) no
  // ritmo de leitura, e a barra de progresso anda com o vídeo. Escrito direto no DOM a
  // cada quadro para não renderizar o componente 60 vezes por segundo.
  useEffect(() => {
    if (!video) return;
    let quadro = 0;
    const palavras = trecho.paragrafos.reduce((soma, texto) => soma + contarPalavras(texto), 0);

    function acompanhar() {
      quadro = requestAnimationFrame(acompanhar);
      const elemento = player.current;
      if (!elemento || !elemento.duration) return;
      const progresso = elemento.currentTime / elemento.duration;
      if (barra.current) barra.current.style.width = `${progresso * 100}%`;

      const caixa = rolagemLegenda.current;
      if (!caixa) return;
      caixa.scrollTop =
        progressoDeLeitura(elemento, palavras) * (caixa.scrollHeight - caixa.clientHeight);

      // Destaque: o último parágrafo cujo topo já passou de 40% da faixa.
      const linha = caixa.getBoundingClientRect().top + caixa.clientHeight * 0.4;
      let atual = 0;
      caixa.querySelectorAll<HTMLElement>("[data-paragrafo]").forEach((item, indice) => {
        if (item.getBoundingClientRect().top <= linha) atual = indice;
      });
      setParagrafo(atual);
    }

    quadro = requestAnimationFrame(acompanhar);
    return () => cancelAnimationFrame(quadro);
  }, [video, comTexto, trecho.paragrafos]);

  // Sem vídeo: o relógio troca o parágrafo e a faixa rola até ele.
  useEffect(() => {
    if (video) return;
    const caixa = rolagemLegenda.current;
    const item = caixa?.querySelector<HTMLElement>(`[data-paragrafo="${paragrafo}"]`);
    if (!caixa || !item) return;
    const topo = item.getBoundingClientRect().top - caixa.getBoundingClientRect().top + caixa.scrollTop;
    caixa.scrollTo({ top: topo, behavior: "smooth" });
  }, [video, paragrafo, passoAtual]);

  useEffect(() => {
    // Captura na window: o Esc fecha só a ampliação, não o modal que está embaixo.
    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        evento.stopPropagation();
        onFechar();
      }
      if (evento.key === "+" || evento.key === "=") ampliarNoCentro(1.25);
      if (evento.key === "-") ampliarNoCentro(0.8);
      if (evento.key === "0") setVista(VISTA_INICIAL);
    }

    window.addEventListener("keydown", aoTeclar, true);
    return () => window.removeEventListener("keydown", aoTeclar, true);
  }, [onFechar]);

  useEffect(() => {
    // A roda precisa de listener não passivo para impedir a rolagem da página.
    const elemento = palco.current;
    if (!elemento) return;

    function aoRolar(evento: WheelEvent) {
      evento.preventDefault();
      const fator = Math.exp(-evento.deltaY * 0.0015);
      ampliarEm(fator, evento.clientX, evento.clientY);
    }

    elemento.addEventListener("wheel", aoRolar, { passive: false });
    return () => elemento.removeEventListener("wheel", aoRolar);
  }, []);

  /** Mantém a mídia dentro do palco: sem zoom não há o que arrastar. */
  function limitar(proxima: Vista): Vista {
    const elemento = palco.current;
    if (!elemento || proxima.escala <= 1) return VISTA_INICIAL;
    const folgaX = ((proxima.escala - 1) * elemento.clientWidth) / 2;
    const folgaY = ((proxima.escala - 1) * elemento.clientHeight) / 2;
    return {
      escala: proxima.escala,
      x: Math.min(folgaX, Math.max(-folgaX, proxima.x)),
      y: Math.min(folgaY, Math.max(-folgaY, proxima.y)),
    };
  }

  /** Amplia mantendo parado o ponto da tela que está sob o ponteiro. */
  function ampliarEm(fator: number, clienteX: number, clienteY: number) {
    const elemento = palco.current;
    if (!elemento) return;
    const caixa = elemento.getBoundingClientRect();
    const px = clienteX - caixa.left - caixa.width / 2;
    const py = clienteY - caixa.top - caixa.height / 2;

    setVista((atual) => {
      const escala = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, atual.escala * fator));
      const razao = escala / atual.escala;
      return limitar({
        escala,
        x: px - (px - atual.x) * razao,
        y: py - (py - atual.y) * razao,
      });
    });
  }

  function ampliarNoCentro(fator: number) {
    const caixa = palco.current?.getBoundingClientRect();
    if (!caixa) return;
    ampliarEm(fator, caixa.left + caixa.width / 2, caixa.top + caixa.height / 2);
  }

  function aoPressionar(evento: React.PointerEvent<HTMLDivElement>) {
    evento.currentTarget.setPointerCapture(evento.pointerId);
    ponteiros.current.set(evento.pointerId, { x: evento.clientX, y: evento.clientY });

    if (ponteiros.current.size === 2) {
      const [a, b] = Array.from(ponteiros.current.values());
      pinca.current = { distancia: Math.hypot(a.x - b.x, a.y - b.y), escala: vista.escala };
    }
  }

  function aoMover(evento: React.PointerEvent<HTMLDivElement>) {
    const anterior = ponteiros.current.get(evento.pointerId);
    if (!anterior) return;
    const atual = { x: evento.clientX, y: evento.clientY };
    ponteiros.current.set(evento.pointerId, atual);

    if (ponteiros.current.size === 2 && pinca.current) {
      const [a, b] = Array.from(ponteiros.current.values());
      const distancia = Math.hypot(a.x - b.x, a.y - b.y);
      const alvo = (pinca.current.escala * distancia) / pinca.current.distancia;
      ampliarEm(alvo / vista.escala, (a.x + b.x) / 2, (a.y + b.y) / 2);
      return;
    }

    setVista((vistaAtual) =>
      limitar({
        ...vistaAtual,
        x: vistaAtual.x + atual.x - anterior.x,
        y: vistaAtual.y + atual.y - anterior.y,
      }),
    );
  }

  function aoSoltar(evento: React.PointerEvent<HTMLDivElement>) {
    ponteiros.current.delete(evento.pointerId);
    if (ponteiros.current.size < 2) pinca.current = null;
  }

  function alternarPausa() {
    const elemento = player.current;
    if (!elemento) {
      setPausado((atual) => !atual);
      return;
    }
    if (elemento.paused) elemento.play().catch(() => undefined);
    else elemento.pause();
  }

  /** Clique na barra leva o vídeo para aquele ponto. */
  function buscar(evento: React.MouseEvent<HTMLDivElement>) {
    const elemento = player.current;
    if (!elemento?.duration) return;
    const caixa = evento.currentTarget.getBoundingClientRect();
    const fracao = (evento.clientX - caixa.left) / caixa.width;
    elemento.currentTime = Math.min(1, Math.max(0, fracao)) * elemento.duration;
  }

  const ampliado = vista.escala > 1;
  const numero = (valor: number) => String(valor).padStart(2, "0");
  const botao =
    "flex h-9 min-w-9 items-center justify-center rounded-full border border-white/15 px-3 text-xs font-semibold text-white/80 transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Ampliação: ${imagem.legenda}`}
      className="fixed inset-0 z-[70] flex flex-col bg-black"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={() => onIrParaPasso(passoAtual - 1)}
            disabled={passoAtual === 0}
            aria-label="Trecho anterior"
            className={botao}
          >
            ◀
          </button>
          <span className="shrink-0 text-xs tabular-nums text-accent">
            {numero(passoAtual + 1)}/{numero(totalPassos)}
          </span>
          <button
            type="button"
            onClick={() => onIrParaPasso(passoAtual + 1)}
            disabled={passoAtual === ultimoPasso}
            aria-label="Próximo trecho"
            className={botao}
          >
            ▶
          </button>
          <p className="ml-2 hidden min-w-0 truncate text-xs text-white/70 md:block">
            {imagem.legenda}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={alternarPausa}
            aria-label={pausado ? "Continuar" : "Pausar"}
            className={botao}
          >
            {pausado ? "▶" : "❚❚"}
          </button>
          <button
            type="button"
            onClick={() => setComLegenda((atual) => !atual)}
            aria-pressed={comLegenda}
            aria-label="Mostrar texto"
            className={`${botao} ${comLegenda ? "border-accent/60 text-accent" : ""}`}
          >
            CC
          </button>
          <button type="button" onClick={() => ampliarNoCentro(0.8)} aria-label="Diminuir zoom" className={`${botao} hidden sm:flex`}>
            −
          </button>
          <button
            type="button"
            onClick={() => setVista(VISTA_INICIAL)}
            aria-label="Voltar ao tamanho original"
            className={`${botao} hidden w-14 tabular-nums sm:flex`}
          >
            {Math.round(vista.escala * 100)}%
          </button>
          <button type="button" onClick={() => ampliarNoCentro(1.25)} aria-label="Aumentar zoom" className={`${botao} hidden sm:flex`}>
            +
          </button>
          <button type="button" onClick={onFechar} aria-label="Fechar ampliação" className={`${botao} ml-2`}>
            <span className="hidden sm:inline">ESC&nbsp;</span>✕
          </button>
        </div>
      </div>

      <div
        ref={palco}
        onPointerDown={aoPressionar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        onDoubleClick={(evento) =>
          ampliado
            ? setVista(VISTA_INICIAL)
            : ampliarEm(2.5, evento.clientX, evento.clientY)
        }
        className={`relative min-h-0 flex-1 touch-none select-none overflow-hidden ${
          ampliado ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
        }`}
      >
        <div
          className="absolute inset-0 p-2 sm:p-6"
          style={{
            transform: `translate(${vista.x}px, ${vista.y}px) scale(${vista.escala})`,
            transition: ponteiros.current.size ? "none" : "transform 120ms ease-out",
          }}
        >
          {video ? (
            <video
              key={video}
              ref={player}
              src={video}
              aria-label={imagem.legenda}
              autoPlay
              muted
              playsInline
              onLoadedMetadata={(evento) => {
                if (video === videoDeAbertura.current) evento.currentTarget.currentTime = inicio;
              }}
              onPlay={() => setPausado(false)}
              onPause={() => setPausado(true)}
              onEnded={(evento) => onTerminarVideo(evento.currentTarget)}
              className="pointer-events-none h-full w-full object-contain"
            />
          ) : src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={imagem.legenda}
              draggable={false}
              className="pointer-events-none h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {numero(passoAtual + 1)} — {imagem.rotulo}
              </span>
              <span className="max-w-2xl text-2xl font-bold leading-snug text-white sm:text-4xl">
                {trecho.titulo}
              </span>
            </div>
          )}
        </div>
      </div>

      {video ? (
        <div
          onClick={buscar}
          role="presentation"
          className="group h-3 shrink-0 cursor-pointer border-t border-white/10 py-1"
        >
          <div className="h-1 w-full bg-white/10 transition-[height] group-hover:h-1.5">
            <div ref={barra} className="h-full w-0 bg-accent" />
          </div>
        </div>
      ) : null}

      {comTexto ? (
        // Faixa própria, fora do vídeo: tela branca atrás não apaga o texto.
        // Altura fixa para o vídeo não pular; o texto rola dentro dela.
        <div className="flex h-44 shrink-0 flex-col items-center bg-black px-4 pt-3 sm:h-52">
          <p className="flex w-full max-w-4xl flex-wrap items-center gap-x-3 text-xs font-semibold tracking-[0.14em] text-accent">
            <span>
              {numero(passoAtual + 1)} — {trecho.titulo.toUpperCase()}
            </span>
            <span className="text-white/40">
              {numero(paragrafo + 1)}/{numero(totalParagrafos)}
            </span>
          </p>
          <div
            ref={rolagemLegenda}
            className="sem-barra mt-2 min-h-0 w-full max-w-4xl flex-1 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to bottom, transparent, black 12%, black 80%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 12%, black 80%, transparent)",
            }}
          >
            <div className="space-y-4 py-4">
              {trecho.paragrafos.map((texto, indice) => (
                <p
                  key={texto}
                  data-paragrafo={indice}
                  aria-current={indice === paragrafo}
                  className={`text-sm leading-relaxed transition-colors duration-500 sm:text-base sm:leading-7 ${
                    indice === paragrafo ? "text-white" : "text-white/30"
                  }`}
                >
                  {texto}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <p className="hidden border-t border-white/10 px-4 py-2 text-center text-xs text-white/60 sm:block">
        Role ou pince para dar zoom · arraste para mover · duplo clique alterna · CC mostra o texto
      </p>
    </div>
  );
}

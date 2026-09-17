"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { CartaoProjeto } from "@/components/CartaoProjeto";
import { ModalProjeto } from "@/components/ModalProjeto";
import { ModalTecnico } from "@/components/ModalTecnico";
import { projetos } from "@/data/conteudo";
import { detalhesProjetos } from "@/data/detalhes-projetos";
import { tecnicosProjetos } from "@/data/tecnicos-projetos";

const INTERVALO_MS = 5000;

export function Projetos() {
  const trilho = useRef<HTMLUListElement>(null);
  const [atual, setAtual] = useState(0);
  type Modo = "narrativa" | "tecnico";
  const [aberto, setAberto] = useState<{ slug: string; modo: Modo } | null>(
    null,
  );
  const [pausado, setPausado] = useState(false);
  const [arrastando, setArrastando] = useState(false);
  // Guarda o ponto onde o arraste começou; `moveu` distingue arrastar de clicar.
  const inicio = useRef({ x: 0, scroll: 0, moveu: false });

  const irPara = useCallback((indice: number) => {
    const elemento = trilho.current;
    if (!elemento) return;

    const cartao = elemento.children[indice] as HTMLElement | undefined;
    if (!cartao) return;

    // scrollLeft em vez de scrollIntoView: a página inteira não pode se mexer
    // quando o carrossel avança sozinho.
    elemento.scrollTo({
      left: cartao.offsetLeft - elemento.offsetLeft,
      behavior: "smooth",
    });
  }, []);

  // Avanço automático. Para quando o leitor está no comando: cursor em cima,
  // foco dentro do trilho, detalhe aberto ou aba em segundo plano.
  useEffect(() => {
    if (pausado || aberto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const relogio = window.setInterval(() => {
      if (document.hidden) return;
      setAtual((anterior) => {
        const proximo = (anterior + 1) % projetos.length;
        irPara(proximo);
        return proximo;
      });
    }, INTERVALO_MS);

    return () => window.clearInterval(relogio);
  }, [pausado, aberto, irPara]);

  // Rolagem manual (arraste ou trackpad) também move o indicador.
  useEffect(() => {
    const elemento = trilho.current;
    if (!elemento) return;

    let agendado = 0;
    function aoRolar() {
      window.clearTimeout(agendado);
      agendado = window.setTimeout(() => {
        if (!elemento) return;
        const cartoes = Array.from(elemento.children) as HTMLElement[];
        const posicao = elemento.scrollLeft + elemento.offsetLeft;
        const maisProximo = cartoes.reduce(
          (melhor, cartao, indice) =>
            Math.abs(cartao.offsetLeft - posicao) < melhor.distancia
              ? { indice, distancia: Math.abs(cartao.offsetLeft - posicao) }
              : melhor,
          { indice: 0, distancia: Number.POSITIVE_INFINITY },
        );
        setAtual(maisProximo.indice);
      }, 120);
    }

    elemento.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      elemento.removeEventListener("scroll", aoRolar);
      window.clearTimeout(agendado);
    };
  }, []);

  function aoPressionar(evento: React.PointerEvent<HTMLUListElement>) {
    // Só o botão principal do mouse arrasta. No toque, quem rola é o próprio
    // navegador: sequestrar o gesto aqui trava a rolagem vertical da página.
    if (evento.button !== 0 || evento.pointerType === "touch") return;
    const elemento = trilho.current;
    if (!elemento) return;

    inicio.current = {
      x: evento.clientX,
      scroll: elemento.scrollLeft,
      moveu: false,
    };
    setArrastando(true);
    setPausado(true);
  }

  function aoMover(evento: React.PointerEvent<HTMLUListElement>) {
    if (!arrastando) return;
    const elemento = trilho.current;
    if (!elemento) return;

    const deslocamento = evento.clientX - inicio.current.x;
    // 6px de folga: sem isso, o tremor da mão ao clicar já vira arraste e o
    // "Entender mais sobre" deixa de abrir.
    if (Math.abs(deslocamento) > 6) {
      inicio.current.moveu = true;
      elemento.setPointerCapture?.(evento.pointerId);
    }
    if (!inicio.current.moveu) return;

    elemento.scrollLeft = inicio.current.scroll - deslocamento;
  }

  function aoSoltar(evento: React.PointerEvent<HTMLUListElement>) {
    if (!arrastando) return;
    trilho.current?.releasePointerCapture?.(evento.pointerId);
    setArrastando(false);
    setPausado(false);
  }

  function passo(direcao: 1 | -1) {
    const proximo = (atual + direcao + projetos.length) % projetos.length;
    setAtual(proximo);
    irPara(proximo);
  }

  function abrirModal(slug: string, modo: Modo, indice: number) {
    // Soltar o arraste em cima do botão não pode abrir o modal.
    if (inicio.current.moveu) {
      inicio.current.moveu = false;
      return;
    }
    setAberto({ slug, modo });
    setAtual(indice);
  }

  const projetoAberto =
    projetos.find((projeto) => projeto.slug === aberto?.slug) ?? null;
  const detalheAberto = projetoAberto
    ? detalhesProjetos[projetoAberto.slug]
    : undefined;
  const tecnicoAberto = projetoAberto
    ? tecnicosProjetos[projetoAberto.slug]
    : undefined;

  return (
    <section id="projetos" className="scroll-mt-24">
      <div className="painel flex flex-wrap items-center justify-between gap-3 px-6 py-4">
        <h2 className="text-xs tracking-[0.2em] text-muted">
          // PROJETOS E SISTEMAS
        </h2>

        <div className="flex items-center gap-3">
          <span className="text-xs tracking-[0.2em] text-accent">
            {String(atual + 1).padStart(2, "0")}/
            {String(projetos.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => passo(-1)}
            aria-label="Projeto anterior"
            className="flex h-9 w-9 items-center justify-center border border-line text-xs text-muted transition-colors hover:border-accent hover:text-accent"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => passo(1)}
            aria-label="Próximo projeto"
            className="flex h-9 w-9 items-center justify-center border border-line text-xs text-muted transition-colors hover:border-accent hover:text-accent"
          >
            →
          </button>
        </div>
      </div>

      <ul
        ref={trilho}
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
        onFocusCapture={() => setPausado(true)}
        onBlurCapture={() => setPausado(false)}
        onPointerDown={aoPressionar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        className={`sem-barra mt-4 flex gap-4 overflow-x-auto ${
          arrastando
            ? "cursor-grabbing select-none snap-none scroll-auto"
            : "cursor-grab snap-x snap-mandatory scroll-smooth"
        }`}
      >
        {projetos.map((projeto, indice) => (
          <li
            key={projeto.slug}
            className="w-[84%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] xl:w-[calc((100%-2rem)/3)]"
          >
            <CartaoProjeto
              projeto={projeto}
              aberto={aberto?.slug === projeto.slug}
              onAbrirNarrativa={() =>
                abrirModal(projeto.slug, "narrativa", indice)
              }
              onAbrirTecnico={() => abrirModal(projeto.slug, "tecnico", indice)}
            />
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-center gap-2">
        {projetos.map((projeto, indice) => (
          <button
            key={projeto.slug}
            type="button"
            onClick={() => {
              setAtual(indice);
              irPara(indice);
            }}
            aria-label={`Ir para ${projeto.nome}`}
            aria-current={atual === indice}
            className="group flex h-6 items-center px-1"
          >
            <span
              className={`block h-1 overflow-hidden transition-all ${
                atual === indice
                  ? "w-10 bg-line"
                  : "w-3 bg-line group-hover:bg-muted"
              }`}
            >
              {atual === indice ? (
                // `key` no índice reinicia a animação a cada virada; sem isso o
                // preenchimento só roda na primeira vez.
                <span
                  key={atual}
                  className="animar-progresso block h-full bg-accent"
                  style={{
                    animationDuration: `${INTERVALO_MS}ms`,
                    animationPlayState:
                      pausado || aberto ? "paused" : "running",
                  }}
                />
              ) : null}
            </span>
          </button>
        ))}
      </div>

      {projetoAberto && aberto?.modo === "narrativa" && detalheAberto ? (
        <ModalProjeto
          projeto={projetoAberto}
          detalhe={detalheAberto}
          onFechar={() => setAberto(null)}
        />
      ) : null}

      {projetoAberto && aberto?.modo === "tecnico" && tecnicoAberto ? (
        <ModalTecnico
          projeto={projetoAberto}
          tecnico={tecnicoAberto}
          onFechar={() => setAberto(null)}
        />
      ) : null}
    </section>
  );
}

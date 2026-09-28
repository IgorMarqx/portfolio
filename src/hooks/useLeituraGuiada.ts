"use client";

import { useEffect, useRef } from "react";

import { LINHA_DE_LEITURA_PX } from "@/hooks/usePassoLido";
import { contarPalavras, progressoDeLeitura } from "@/lib/ritmo-de-leitura";

/** Depois de o leitor mexer no texto, quanto tempo a rolagem automática espera. */
const PAUSA_APOS_INTERACAO_MS = 5000;

/**
 * Rola o texto do trecho atual como um teleprompter enquanto o vídeo toca, no
 * ritmo de leitura (ou no do vídeo, se for mais rápido) — ver progressoDeLeitura.
 *
 * Quem lê manda: rolar, tocar ou usar o teclado na área suspende a rolagem
 * automática por alguns segundos. A barra de rolagem não dispara wheel, então
 * qualquer scrollTop diferente do último que este hook escreveu também conta
 * como leitor mexendo.
 */
export function useLeituraGuiada(
  area: React.RefObject<HTMLDivElement>,
  video: React.RefObject<HTMLVideoElement>,
  passo: number,
  ativo: boolean,
) {
  // Fora do efeito: trocar de trecho rolando não pode zerar a pausa de quem está lendo.
  const suspensoAte = useRef(0);

  useEffect(() => {
    const elemento = area.current;
    if (!elemento || !ativo) return;
    const raiz = elemento;

    let quadro = 0;
    let palavras = 0;
    let ultimoEscrito: number | null = null;

    function suspender() {
      suspensoAte.current = performance.now() + PAUSA_APOS_INTERACAO_MS;
    }

    function acompanhar() {
      quadro = requestAnimationFrame(acompanhar);
      const player = video.current;
      if (!player || player.paused || !player.duration) return;
      if (ultimoEscrito !== null && Math.abs(raiz.scrollTop - ultimoEscrito) > 2) suspender();
      if (performance.now() < suspensoAte.current) {
        ultimoEscrito = null;
        return;
      }

      const secao = raiz.querySelector<HTMLElement>(`[data-indice="${passo}"]`);
      if (!secao) return;
      if (!palavras) palavras = contarPalavras(secao.textContent ?? "");
      const proxima = raiz.querySelector<HTMLElement>(`[data-indice="${passo + 1}"]`);

      const origem = raiz.getBoundingClientRect().top - raiz.scrollTop;
      const topo = secao.getBoundingClientRect().top - origem;
      const fimDoTrecho = proxima
        ? proxima.getBoundingClientRect().top - origem
        : raiz.scrollHeight;

      const inicio = topo - 16;
      // Para antes de o próximo trecho cruzar a linha de leitura.
      const fim = Math.max(inicio, fimDoTrecho - Math.min(LINHA_DE_LEITURA_PX, raiz.clientHeight * 0.5) - 24);
      const progresso = progressoDeLeitura(player, palavras);
      raiz.scrollTop = inicio + (fim - inicio) * progresso;
      ultimoEscrito = raiz.scrollTop;
    }

    const eventos = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    eventos.forEach((nome) => raiz.addEventListener(nome, suspender, { passive: true }));
    quadro = requestAnimationFrame(acompanhar);

    return () => {
      cancelAnimationFrame(quadro);
      eventos.forEach((nome) => raiz.removeEventListener(nome, suspender));
    };
  }, [area, video, passo, ativo]);
}

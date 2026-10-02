"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Distância do topo da área em que um trecho passa a contar como "sendo lido".
 * Em pixels, não em fração da altura: o palco encolhe nos trechos sem mídia, a
 * área de texto cresce, e uma linha proporcional andaria e trocaria o trecho sozinha.
 */
export const LINHA_DE_LEITURA_PX = 140;

/**
 * Marca qual trecho está sendo lido dentro de uma área rolável e oferece o
 * atalho para ir até outro. É o que faz a imagem do modal acompanhar o texto.
 *
 * O trecho lido é o último cujo topo já passou da linha de leitura. Um
 * IntersectionObserver com faixa no meio falhava quando a área ficava baixa
 * (palco em cima): a faixa encolhia para poucos pixels.
 */
export function usePassoLido(area: React.RefObject<HTMLDivElement>, dependencia: unknown) {
  const [passo, setPasso] = useState(0);
  /** Enquanto uma rolagem pedida por código anda, a posição do meio do caminho não conta. */
  const destino = useRef<number | null>(null);
  const soltarDestino = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const elemento = area.current;
    if (!elemento) return;
    const raiz = elemento;

    function calcular() {
      if (destino.current !== null) return;
      const secoes = Array.from(raiz.querySelectorAll<HTMLElement>("[data-indice]"));
      if (secoes.length === 0) return;

      const noFim = raiz.scrollTop + raiz.clientHeight >= raiz.scrollHeight - 4;
      const linha = raiz.getBoundingClientRect().top + Math.min(LINHA_DE_LEITURA_PX, raiz.clientHeight * 0.5);

      let atual = 0;
      secoes.forEach((secao) => {
        if (secao.getBoundingClientRect().top <= linha) atual = Number(secao.dataset.indice);
      });
      // No fim da rolagem os últimos trechos podem nunca alcançar a linha.
      if (noFim) atual = Number(secoes[secoes.length - 1].dataset.indice);
      setPasso(atual);
    }

    function aoTerminarRolagem() {
      if (destino.current === null) return;
      destino.current = null;
      clearTimeout(soltarDestino.current);
    }

    raiz.addEventListener("scroll", calcular, { passive: true });
    raiz.addEventListener("scrollend", aoTerminarRolagem);
    calcular();
    return () => {
      raiz.removeEventListener("scroll", calcular);
      raiz.removeEventListener("scrollend", aoTerminarRolagem);
    };
  }, [area, dependencia]);

  useEffect(() => () => clearTimeout(soltarDestino.current), []);

  function irPara(indice: number) {
    const elemento = area.current;
    const alvo = elemento?.querySelector<HTMLElement>(`[data-indice="${indice}"]`);
    if (!elemento || !alvo) return;

    setPasso(indice);
    destino.current = indice;
    // Safari não tem scrollend: o prazo garante que a rolagem volta a mandar.
    clearTimeout(soltarDestino.current);
    soltarDestino.current = setTimeout(() => {
      destino.current = null;
    }, 1200);

    const topo =
      alvo.getBoundingClientRect().top - elemento.getBoundingClientRect().top + elemento.scrollTop;
    elemento.scrollTo({ top: topo - 16, behavior: "smooth" });
  }

  return { passo, irPara };
}

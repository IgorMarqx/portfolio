"use client";

import { useEffect, useState } from "react";

/**
 * Marca qual trecho está sendo lido dentro de uma área rolável e oferece o
 * atalho para ir até outro. É o que faz a imagem do modal acompanhar o texto.
 */
export function usePassoLido(area: React.RefObject<HTMLDivElement>, dependencia: unknown) {
  const [passo, setPasso] = useState(0);

  useEffect(() => {
    const elemento = area.current;
    if (!elemento) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((entrada) => entrada.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visivel) return;
        const indice = Number((visivel.target as HTMLElement).dataset.indice);
        if (!Number.isNaN(indice)) setPasso(indice);
      },
      { root: elemento, rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    elemento.querySelectorAll("[data-indice]").forEach((secao) => observador.observe(secao));
    return () => observador.disconnect();
  }, [area, dependencia]);

  function irPara(indice: number) {
    const elemento = area.current;
    const alvo = elemento?.querySelector<HTMLElement>(`[data-indice="${indice}"]`);
    if (!elemento || !alvo) return;
    elemento.scrollTo({ top: alvo.offsetTop - elemento.offsetTop - 16, behavior: "smooth" });
  }

  return { passo, irPara };
}

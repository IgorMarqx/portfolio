"use client";

import { useRef } from "react";

import { ModalCasca } from "@/components/ModalCasca";
import type { Projeto } from "@/data/conteudo";
import type { DetalheProjeto } from "@/data/detalhes-projetos";
import { usePassoLido } from "@/hooks/usePassoLido";

type Props = {
  projeto: Projeto;
  detalhe: DetalheProjeto;
  onFechar: () => void;
};

export function ModalProjeto({ projeto, detalhe, onFechar }: Props) {
  const narrativa = useRef<HTMLDivElement>(null);
  const { passo, irPara } = usePassoLido(narrativa, detalhe);
  const capitulo = detalhe.capitulos[passo];

  return (
    <ModalCasca
      etiqueta={`// ${projeto.numero} · ${projeto.categoria}`}
      titulo={detalhe.titulo}
      subtitulo={detalhe.resumo}
      imagem={capitulo.imagem}
      trecho={{ titulo: capitulo.titulo, paragrafos: capitulo.paragrafos }}
      passos={detalhe.capitulos.map((cap) => ({
        chave: cap.id,
        rotulo: cap.titulo,
      }))}
      passoAtual={passo}
      onIrParaPasso={irPara}
      onFechar={onFechar}
      areaRef={narrativa}
    >
      <div className="space-y-4 border-l-2 border-accent pl-5 text-[15px] leading-7 text-fg/90 sm:text-base sm:leading-8">
        {[detalhe.abertura].flat().map((paragrafo) => (
          <p key={paragrafo}>{paragrafo}</p>
        ))}
      </div>

      {detalhe.capitulos.map((cap, indice) => (
        <section
          key={cap.id}
          data-indice={indice}
          className="mt-14 scroll-mt-4 border-t border-line pt-10"
        >
          <p className="text-[11px] tracking-[0.2em] text-accent">
            {String(indice + 1).padStart(2, "0")} — {cap.imagem.rotulo}
          </p>
          <h4 className="mt-3 text-xl font-bold leading-snug sm:text-2xl">{cap.titulo}</h4>

          <div className="mt-5 space-y-5">
            {cap.paragrafos.map((paragrafo) => (
              <p key={paragrafo} className="text-[15px] leading-7 text-fg/80">
                {paragrafo}
              </p>
            ))}
          </div>
        </section>
      ))}

      <p className="mt-14 border-t border-line pt-10 text-[15px] leading-7 text-fg/90">
        {detalhe.fecho}
      </p>

      <div className="mt-6 flex flex-wrap gap-2 pb-4">
        {projeto.tags.map((tag) => (
          <span
            key={tag}
            className="border border-line px-2 py-1 text-[11px] text-fg/80"
          >
            {tag}
          </span>
        ))}
      </div>
    </ModalCasca>
  );
}

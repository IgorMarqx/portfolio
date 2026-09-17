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
      passos={detalhe.capitulos.map((cap) => ({
        chave: cap.id,
        rotulo: cap.titulo,
      }))}
      passoAtual={passo}
      onIrParaPasso={irPara}
      onFechar={onFechar}
      areaRef={narrativa}
    >
      <p className="border-l-2 border-accent pl-4 text-sm leading-relaxed text-fg/85">
        {detalhe.abertura}
      </p>

      {detalhe.capitulos.map((cap, indice) => (
        <section
          key={cap.id}
          data-indice={indice}
          className="mt-10 scroll-mt-4"
        >
          <p className="text-[11px] tracking-[0.2em] text-accent">
            {String(indice + 1).padStart(2, "0")} — {cap.imagem.rotulo}
          </p>
          <h4 className="mt-2 text-lg font-bold">{cap.titulo}</h4>

          <div className="mt-3 space-y-4">
            {cap.paragrafos.map((paragrafo) => (
              <p key={paragrafo} className="text-sm leading-relaxed text-fg/80">
                {paragrafo}
              </p>
            ))}
          </div>
        </section>
      ))}

      <p className="mt-10 border-t border-line pt-6 text-sm leading-relaxed text-fg/85">
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

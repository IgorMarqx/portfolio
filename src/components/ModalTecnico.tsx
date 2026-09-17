"use client";

import { useRef } from "react";

import { ModalCasca } from "@/components/ModalCasca";
import type { Projeto } from "@/data/conteudo";
import type { DetalheTecnico } from "@/data/tecnicos-projetos";
import { usePassoLido } from "@/hooks/usePassoLido";

type Props = {
  projeto: Projeto;
  tecnico: DetalheTecnico;
  onFechar: () => void;
};

export function ModalTecnico({ projeto, tecnico, onFechar }: Props) {
  const area = useRef<HTMLDivElement>(null);
  const { passo, irPara } = usePassoLido(area, tecnico);
  const secao = tecnico.secoes[passo];

  return (
    <ModalCasca
      etiqueta={`// ${projeto.numero} · DETALHES TÉCNICOS`}
      titulo={projeto.nome}
      subtitulo={tecnico.resumo}
      imagem={secao.imagem}
      passos={tecnico.secoes.map((item) => ({
        chave: item.id,
        rotulo: item.titulo,
      }))}
      passoAtual={passo}
      onIrParaPasso={irPara}
      onFechar={onFechar}
      areaRef={area}
    >
      {tecnico.secoes.map((item, indice) => (
        <section
          key={item.id}
          data-indice={indice}
          className={indice === 0 ? "scroll-mt-4" : "mt-10 scroll-mt-4"}
        >
          <p className="text-[11px] tracking-[0.2em] text-accent">
            {String(indice + 1).padStart(2, "0")} — {item.imagem.rotulo}
          </p>
          <h4 className="mt-2 text-lg font-bold">{item.titulo}</h4>

          {item.texto ? (
            <p className="mt-3 text-sm leading-relaxed text-fg/80">
              {item.texto}
            </p>
          ) : null}

          {item.passos ? (
            <ol className="mt-4 space-y-2">
              {item.passos.map((passoTexto, ordem) => (
                <li
                  key={passoTexto}
                  className="flex gap-3 text-sm leading-relaxed text-fg/80"
                >
                  <span className="shrink-0 text-accent">
                    {String(ordem + 1).padStart(2, "0")}
                  </span>
                  {passoTexto}
                </li>
              ))}
            </ol>
          ) : null}

          {item.itens ? (
            <dl className="mt-4 divide-y divide-line border-y border-line">
              {item.itens.map((tecnologia) => (
                <div
                  key={tecnologia.nome}
                  className="flex flex-wrap gap-x-3 gap-y-1 py-3"
                >
                  <dt className="flex items-center gap-2 text-sm font-semibold text-fg">
                    {tecnologia.nome}
                    {tecnologia.confirmar ? (
                      <span className="border border-line px-1.5 py-0.5 text-[10px] tracking-[0.1em] text-muted">
                        A CONFIRMAR
                      </span>
                    ) : null}
                  </dt>
                  <dd className="w-full text-xs leading-relaxed text-muted">
                    {tecnologia.papel}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </section>
      ))}

      <p className="mt-10 border-t border-line pt-6 text-xs leading-relaxed text-muted">
        Itens marcados como <span className="text-fg">A CONFIRMAR</span> ainda
        não foram checados contra o projeto real — estão aqui como lacuna
        assumida, não como afirmação.
      </p>
    </ModalCasca>
  );
}

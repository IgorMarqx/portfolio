"use client";

import { useEffect, useState } from "react";

import { AlternarTema } from "@/components/AlternarTema";
import { navegacao, perfil } from "@/data/conteudo";

function estiloDoItem(ativo: boolean) {
  return ativo
    ? "whitespace-nowrap rounded-full bg-accent/10 px-3 py-1.5 text-accent"
    : "whitespace-nowrap rounded-full px-3 py-1.5 text-muted transition-colors hover:text-fg";
}

export function Cabecalho() {
  const [ativo, setAtivo] = useState(navegacao[0].id);

  useEffect(() => {
    const secoes = navegacao
      .map((item) => document.getElementById(item.id))
      .filter((secao): secao is HTMLElement => secao !== null);

    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((entrada) => entrada.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visivel) setAtivo(visivel.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    secoes.forEach((secao) => observador.observe(secao));
    return () => observador.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 py-3 sm:py-4">
          <a href="#home" className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-sm font-extrabold text-canvas">
              {perfil.iniciais}
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-[15px] font-bold">{perfil.nome}</span>
              <span className="hidden truncate text-xs text-sky sm:block">
                {perfil.titulo}
              </span>
            </span>
          </a>

          {/* No celular a navegação desce para a própria linha; aqui fica só o tema. */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
              {navegacao.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={estiloDoItem(ativo === item.id)}
                >
                  {item.rotulo}
                </a>
              ))}
            </nav>
            <AlternarTema />
          </div>
        </div>

        <nav className="sem-barra -mx-4 flex gap-1 overflow-x-auto px-4 pb-3 text-sm font-medium md:hidden">
          {navegacao.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={estiloDoItem(ativo === item.id)}
            >
              {item.rotulo}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

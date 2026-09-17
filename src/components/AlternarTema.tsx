"use client";

import { useEffect, useState } from "react";

type Tema = "dark" | "light";

function lerTemaAtual(): Tema {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function AlternarTema() {
  // Começa no escuro para o HTML do servidor bater com o do cliente; o valor real
  // é lido do <html> depois da montagem, onde o script anti-flash já o aplicou.
  const [tema, setTema] = useState<Tema>("dark");

  useEffect(() => {
    setTema(lerTemaAtual());
  }, []);

  function alternar() {
    const proximo: Tema = tema === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = proximo;
    try {
      localStorage.setItem("tema", proximo);
    } catch {
      // Navegação privada pode bloquear o storage: o tema vale só para esta visita.
    }
    setTema(proximo);
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={
        tema === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"
      }
      title={tema === "dark" ? "Tema claro" : "Tema escuro"}
      className="flex h-8 items-center gap-2 border border-line px-2 text-[11px] tracking-[0.15em] text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <span aria-hidden>{tema === "dark" ? "☾" : "☀"}</span>
      <span className="hidden sm:inline">
        {tema === "dark" ? "DARK" : "LIGHT"}
      </span>
    </button>
  );
}

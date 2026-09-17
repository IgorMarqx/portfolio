import { perfil } from "@/data/conteudo";

export function Rodape() {
  return (
    <footer className="painel flex flex-col gap-4 px-5 py-5 text-[11px] tracking-[0.15em] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center border border-line text-accent">
          {perfil.iniciais}
        </span>
        <span>// OBRIGADO PELA VISITA</span>
      </div>

      <p>
        © {new Date().getFullYear()} {perfil.nome.toUpperCase()} — JOÃO PESSOA,
        PB
      </p>

      <div className="flex gap-5">
        <a
          href={perfil.github}
          target="_blank"
          rel="noreferrer"
          className="hover:text-accent"
        >
          GitHub
        </a>
        <a
          href={perfil.linkedin}
          target="_blank"
          rel="noreferrer"
          className="hover:text-accent"
        >
          LinkedIn
        </a>
        <a href={`mailto:${perfil.email}`} className="hover:text-accent">
          Email
        </a>
      </div>
    </footer>
  );
}

import { perfil } from "@/data/conteudo";

export function Contato() {
  return (
    <section id="contato" className="grid gap-4 scroll-mt-24 lg:grid-cols-2">
      <div className="painel p-6 sm:p-8">
        <p className="text-[11px] tracking-[0.2em] text-muted">
          &gt; VAMOS_CONSTRUIR_ALGO_BOM
        </p>
        <h2 className="mt-5 text-2xl font-bold leading-tight sm:mt-6 sm:text-4xl">
          Pronto para criar
          <br />o que <span className="text-accent">importa.</span>
        </h2>
      </div>

      <div className="painel p-6 sm:p-8">
        <p className="text-[11px] tracking-[0.2em] text-accent">
          &gt; ENVIAR_MENSAGEM
        </p>
        <p className="mt-4 text-sm text-muted">
          Disponível para projetos, freelances e colaborações técnicas.
        </p>

        <a
          href={`mailto:${perfil.email}`}
          className="mt-8 flex items-center justify-between border border-accent px-5 py-4 text-xs font-semibold tracking-[0.15em] text-fg transition-colors hover:bg-accent hover:text-base"
        >
          INICIAR CONVERSA <span aria-hidden>➤</span>
        </a>

        <div className="mt-6 space-y-1 break-words text-xs text-muted">
          <p>{perfil.email}</p>
          <p>{perfil.telefone}</p>
          <p>{perfil.local}</p>
        </div>
      </div>
    </section>
  );
}

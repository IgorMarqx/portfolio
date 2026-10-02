import { perfil } from "@/data/conteudo";

export function Contato() {
  return (
    <section id="contato" className="grid gap-4 scroll-mt-24 lg:grid-cols-2">
      <div className="painel brilho p-6 sm:p-8">
        <p className="rotulo">Vamos construir algo bom</p>
        <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:mt-6 sm:text-4xl">
          Pronto para criar
          <br />o que <span className="text-accent">importa.</span>
        </h2>
      </div>

      <div className="painel p-6 sm:p-8">
        <p className="rotulo">Enviar mensagem</p>
        <p className="mt-4 text-[15px] text-muted">
          Disponível para projetos, freelances e colaborações técnicas.
        </p>

        <a
          href={perfil.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="mt-8 flex items-center justify-between rounded-xl bg-accent px-5 py-4 text-sm font-bold text-canvas transition-opacity hover:opacity-90"
        >
          Iniciar conversa no WhatsApp <span aria-hidden>→</span>
        </a>

        <div className="mt-6 space-y-1 break-words text-sm text-muted">
          <p>{perfil.email}</p>
          <p>{perfil.telefone}</p>
          <p>{perfil.local}</p>
        </div>
      </div>
    </section>
  );
}

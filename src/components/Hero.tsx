import { RedesSociais } from "@/components/RedesSociais";
import { perfil } from "@/data/conteudo";

const fichas = [
  { rotulo: "Quem sou", valor: perfil.nomeCompleto },
  { rotulo: "Função", valor: `${perfil.titulo}\nPHP/Laravel · Go · Node.js` },
  { rotulo: "Local", valor: perfil.local },
  { rotulo: "Experiência", valor: perfil.experiencia },
  { rotulo: "Disponibilidade", valor: perfil.disponibilidade },
];

export function Hero() {
  return (
    <section id="home" className="painel brilho scroll-mt-24 overflow-hidden">
      <div className="grid gap-10 px-5 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.4fr_1fr] lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
            Disponível para projetos
          </p>

          <h1 className="mt-6 text-[2.25rem] font-extrabold leading-[1.1] tracking-tight sm:mt-8 sm:text-5xl lg:text-6xl">
            Sistemas que aguentam
            <br />o <span className="text-accent">mundo real.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {perfil.resumo}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#projetos"
              className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-sm font-bold text-canvas transition-opacity hover:opacity-90 sm:py-3"
            >
              Ver projetos <span aria-hidden>↗</span>
            </a>
            <a
              href={`mailto:${perfil.email}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-line px-6 py-4 text-sm font-bold transition-colors hover:border-accent hover:text-accent sm:py-3"
            >
              Falar comigo <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <dl className="space-y-5">
            {fichas.map((ficha) => (
              <div key={ficha.rotulo}>
                <dt className="rotulo">{ficha.rotulo}</dt>
                <dd className="mt-1 whitespace-pre-line text-[15px] text-fg">
                  {ficha.valor}
                </dd>
              </div>
            ))}
          </dl>

          <p className="rotulo mt-8">Contato</p>
          <div className="mt-3">
            <RedesSociais />
          </div>
        </div>
      </div>
    </section>
  );
}

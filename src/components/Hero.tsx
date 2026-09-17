import { perfil } from "@/data/conteudo";

const fichas = [
  { rotulo: "QUEM_SOU", valor: perfil.nomeCompleto },
  { rotulo: "FUNÇÃO", valor: `${perfil.titulo}\nPHP/Laravel · Go · Node.js` },
  { rotulo: "LOCAL", valor: perfil.local },
  { rotulo: "EXPERIÊNCIA", valor: perfil.experiencia },
  { rotulo: "DISPONIBILIDADE", valor: perfil.disponibilidade },
];

export function Hero() {
  return (
    <section id="home" className="painel grade scroll-mt-24">
      <div className="grid gap-8 px-5 py-10 sm:gap-10 sm:px-10 sm:py-14 lg:grid-cols-[1.4fr_1fr] lg:py-20">
        <div>
          <p className="text-xs text-muted">&gt; INICIANDO_PORTFOLIO.EXE</p>
          <p className="mt-1 text-xs text-muted">
            &gt; STATUS: <span className="text-accent">DISPONÍVEL</span>
          </p>

          <h1 className="mt-6 text-[2rem] font-bold leading-tight sm:mt-8 sm:text-5xl lg:text-6xl">
            Sistemas que aguentam
            <br />o <span className="text-accent">mundo real.</span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
            {perfil.resumo}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#projetos"
              className="flex items-center justify-center gap-2 bg-accent px-5 py-4 text-xs font-semibold tracking-[0.15em] text-base transition-opacity hover:opacity-90 sm:justify-start sm:py-3"
            >
              VER PROJETOS <span aria-hidden>↗</span>
            </a>
            <a
              href={`mailto:${perfil.email}`}
              className="flex items-center justify-center gap-2 border border-line px-5 py-4 text-xs font-semibold tracking-[0.15em] transition-colors hover:border-accent hover:text-accent sm:justify-start sm:py-3"
            >
              FALAR COMIGO <span aria-hidden>→</span>
            </a>
          </div>

          <p className="mt-10 text-[11px] tracking-[0.2em] text-muted sm:mt-12">
            &gt; ROLE_PARA_EXPLORAR ↓
          </p>
        </div>

        <dl className="space-y-5 border-t border-line pt-8 sm:space-y-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          {fichas.map((ficha) => (
            <div key={ficha.rotulo}>
              <dt className="text-[11px] tracking-[0.2em] text-accent">
                &gt; {ficha.rotulo}
              </dt>
              <dd className="mt-1 whitespace-pre-line text-sm text-fg/90">
                {ficha.valor}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

import { experiencias, formacao, perfil } from "@/data/conteudo";

export function Experiencia() {
  return (
    <section
      id="sobre"
      className="grid gap-4 scroll-mt-24 lg:grid-cols-[1.5fr_1fr]"
    >
      <div className="painel p-5 sm:p-6">
        <h2 className="text-xs tracking-[0.2em] text-muted">// EXPERIÊNCIA</h2>

        <ol className="mt-8 space-y-10">
          {experiencias.map((experiencia) => (
            <li
              key={experiencia.empresa}
              className="border-l border-line pl-4 sm:pl-6"
            >
              <p className="text-[11px] tracking-[0.15em] text-accent">
                {experiencia.periodo}
              </p>
              <h3 className="mt-2 text-lg font-bold">{experiencia.cargo}</h3>
              <p className="rotulo mt-1">{experiencia.empresa}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {experiencia.descricao}
              </p>

              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-fg/80">
                {experiencia.destaques.map((destaque) => (
                  <li key={destaque} className="flex gap-2">
                    <span className="text-accent" aria-hidden>
                      ·
                    </span>
                    {destaque}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>

      <div className="painel flex flex-col p-5 sm:p-6">
        <h2 className="text-xs tracking-[0.2em] text-muted">// SOBRE</h2>
        <p className="mt-6 text-sm leading-relaxed text-fg/85">
          {perfil.sobre}
        </p>

        <div className="mt-8 border-t border-line pt-6">
          <p className="text-[11px] tracking-[0.2em] text-accent">
            &gt; FORMAÇÃO
          </p>
          <p className="mt-2 text-sm text-fg/90">{formacao.curso}</p>
          <p className="rotulo mt-1">{formacao.instituicao}</p>
          <p className="rotulo mt-1">{formacao.periodo}</p>
        </div>

        <div className="mt-8 border border-line bg-panel p-4 text-xs leading-relaxed text-muted">
          <p className="text-accent">&gt; SYSTEM_LOG</p>
          <p className="mt-3">[10:30:15] Integrações conectadas</p>
          <p>[10:30:16] Filas consumindo</p>
          <p>[10:30:17] Produção estável.</p>
        </div>
      </div>
    </section>
  );
}

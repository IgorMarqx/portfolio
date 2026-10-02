import { experiencias, formacao, perfil } from "@/data/conteudo";

export function Experiencia() {
  return (
    <section
      id="sobre"
      className="grid gap-4 scroll-mt-24 lg:grid-cols-[1.5fr_1fr]"
    >
      <div className="painel p-5 sm:p-6">
        <h2 className="text-lg font-bold sm:text-xl">Experiência</h2>

        <ol className="mt-8 space-y-10">
          {experiencias.map((experiencia) => (
            <li
              key={experiencia.empresa}
              className="border-l-2 border-accent/50 pl-4 sm:pl-6"
            >
              <p className="text-sm font-semibold text-accent">
                {experiencia.periodo}
              </p>
              <h3 className="mt-1 text-xl font-bold tracking-tight">{experiencia.cargo}</h3>
              <p className="rotulo mt-1">{experiencia.empresa}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {experiencia.descricao}
              </p>

              <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-fg/90">
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
        <h2 className="text-lg font-bold sm:text-xl">Sobre</h2>
        <p className="mt-6 text-[15px] leading-relaxed text-fg/90">
          {perfil.sobre}
        </p>

        <div className="mt-8 border-t border-line pt-6">
          <p className="rotulo">Formação</p>
          <p className="mt-2 text-[15px] font-bold text-fg">{formacao.curso}</p>
          <p className="mt-1 text-sm text-muted">{formacao.instituicao}</p>
          <p className="mt-1 text-sm text-muted">{formacao.periodo}</p>
        </div>
      </div>
    </section>
  );
}

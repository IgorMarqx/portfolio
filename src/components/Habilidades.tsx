import { ferramentas, habilidades, servicos } from "@/data/conteudo";

export function Habilidades() {
  return (
    <section className="painel grid divide-y divide-line lg:grid-cols-3 lg:divide-x lg:divide-y-0">
      <div className="p-5 sm:p-6">
        <h2 className="text-lg font-bold sm:text-xl">Habilidades técnicas</h2>
        <ul className="mt-6 space-y-4">
          {habilidades.map((habilidade) => (
            <li key={habilidade.area} className="border-l-2 border-line pl-4">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-[15px] font-bold text-fg">
                  {habilidade.area}
                </span>
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-accent">
                  {habilidade.uso}
                </span>
              </div>
              <p className="mt-1 text-sm text-sky">{habilidade.detalhe}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {habilidade.onde}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-5 sm:p-6">
        <h2 className="text-lg font-bold sm:text-xl">O que eu faço</h2>
        <ul className="mt-6 space-y-3">
          {servicos.map((servico) => (
            <li
              key={servico}
              className="flex items-center justify-between gap-3 rounded-xl border border-line bg-panel/50 px-4 py-4 text-[15px] font-medium text-fg"
            >
              {servico}
              <span className="text-accent" aria-hidden>
                ↗
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-5 sm:p-6">
        <h2 className="text-lg font-bold sm:text-xl">Ferramentas</h2>
        <ul className="mt-6 space-y-3 text-[15px]">
          {ferramentas.map((ferramenta) => (
            <li
              key={ferramenta}
              className="flex items-center justify-between text-fg/90"
            >
              {ferramenta}
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

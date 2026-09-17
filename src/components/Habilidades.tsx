import { ferramentas, habilidades, servicos } from "@/data/conteudo";

export function Habilidades() {
  return (
    <section className="painel grid divide-y divide-line lg:grid-cols-3 lg:divide-x lg:divide-y-0">
      <div className="p-5 sm:p-6">
        <h2 className="text-xs tracking-[0.2em] text-muted">
          &lt;/&gt; HABILIDADES TÉCNICAS
        </h2>
        <ul className="mt-6 space-y-4">
          {habilidades.map((habilidade) => (
            <li key={habilidade.area} className="border-l border-line pl-4">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-sm font-semibold text-fg">
                  {habilidade.area}
                </span>
                <span className="border border-line px-1.5 py-0.5 text-[10px] tracking-[0.15em] text-accent">
                  {habilidade.uso}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">{habilidade.detalhe}</p>
              <p className="mt-1 text-xs leading-relaxed text-fg/70">
                {habilidade.onde}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-5 sm:p-6">
        <h2 className="text-xs tracking-[0.2em] text-muted">◈ O QUE EU FAÇO</h2>
        <ul className="mt-6 space-y-3">
          {servicos.map((servico) => (
            <li
              key={servico}
              className="flex items-center justify-between gap-3 border border-line px-4 py-4 text-sm text-fg/90"
            >
              {servico}
              <span className="text-muted" aria-hidden>
                ↗
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-5 sm:p-6">
        <h2 className="text-xs tracking-[0.2em] text-muted">▣ FERRAMENTAS</h2>
        <ul className="mt-6 space-y-3 text-sm">
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

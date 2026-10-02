import { stack } from "@/data/conteudo";

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-24">
      <div className="painel px-6 py-4">
        <h2 className="text-lg font-bold sm:text-xl">Stack técnica</h2>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {Object.entries(stack).map(([area, itens]) => (
          <div key={area} className="painel p-5 sm:p-6">
            <h3 className="rotulo">{area}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {itens.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-panel px-3 py-1 text-sm font-medium text-fg/90"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { stack } from "@/data/conteudo";

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-24">
      <div className="painel px-6 py-4">
        <h2 className="text-xs tracking-[0.2em] text-muted">
          // STACK TÉCNICA
        </h2>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {Object.entries(stack).map(([area, itens]) => (
          <div key={area} className="painel p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.2em] text-accent">
              &gt; {area}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {itens.map((item) => (
                <span
                  key={item}
                  className="border border-line px-2 py-1 text-[11px] text-fg/80"
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

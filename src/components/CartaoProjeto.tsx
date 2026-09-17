import type { Projeto } from "@/data/conteudo";

type Props = {
  projeto: Projeto;
  aberto: boolean;
  onAbrirNarrativa: () => void;
  onAbrirTecnico: () => void;
};

export function CartaoProjeto({
  projeto,
  aberto,
  onAbrirNarrativa,
  onAbrirTecnico,
}: Props) {
  return (
    <article
      className={`painel flex h-full flex-col p-5 transition-colors sm:p-6 ${
        aberto ? "border-accent" : "hover:border-accent/50"
      }`}
    >
      <div className="flex items-start justify-between text-xs text-muted">
        <span>{projeto.numero}</span>
        <span className="text-accent">{aberto ? "−" : "+"}</span>
      </div>

      <p className="mt-4 text-[11px] tracking-[0.15em] text-accent">
        // {projeto.categoria}
      </p>
      <h3 className="mt-2 text-xl font-bold sm:text-2xl">{projeto.nome}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {projeto.descricao}
      </p>

      <div className="mt-6 flex h-28 items-center justify-center border border-line bg-panel text-[11px] tracking-[0.2em] text-muted">
        {projeto.visual}
      </div>

      <p className="mt-6 border-l border-accent/40 pl-3 text-xs leading-relaxed text-muted">
        {projeto.impacto}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {projeto.tags.map((tag) => (
          <span
            key={tag}
            className="border border-line px-2 py-1 text-[11px] text-fg/80"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* mt-auto prende os botões no rodapé: os cartões têm alturas de texto diferentes. */}
      <div className="mt-auto grid gap-2 pt-6 sm:grid-cols-2">
        <button
          type="button"
          onClick={onAbrirNarrativa}
          aria-haspopup="dialog"
          className="flex items-center justify-between gap-2 border border-line px-4 py-3 text-[11px] font-semibold tracking-[0.15em] transition-colors hover:border-accent hover:text-accent"
        >
          ENTENDER MAIS
          <span aria-hidden>↗</span>
        </button>

        <button
          type="button"
          onClick={onAbrirTecnico}
          aria-haspopup="dialog"
          className="flex items-center justify-between gap-2 border border-accent/40 bg-accent/5 px-4 py-3 text-[11px] font-semibold tracking-[0.15em] text-accent transition-colors hover:bg-accent hover:text-base"
        >
          DETALHES TÉCNICOS
          <span aria-hidden>{"</>"}</span>
        </button>
      </div>
    </article>
  );
}

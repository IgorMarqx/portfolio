import { MiniaturaVideo } from "@/components/MiniaturaVideo";
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
      <div className="flex items-center justify-between gap-3">
        <p className="rotulo">{projeto.categoria}</p>
        <span className="text-sm font-semibold tabular-nums text-muted">
          {projeto.numero}
        </span>
      </div>
      <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">{projeto.nome}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">
        {projeto.descricao}
      </p>

      {projeto.miniatura ? (
        <div className="mt-6 h-32 overflow-hidden rounded-xl border border-line bg-panel">
          <MiniaturaVideo src={projeto.miniatura} rotulo={projeto.visual} />
        </div>
      ) : (
        <div className="brilho mt-6 flex h-32 items-center justify-center rounded-xl border border-line bg-panel text-sm font-semibold text-sky">
          {projeto.visual}
        </div>
      )}

      <p className="mt-6 border-l-2 border-accent pl-3 text-sm leading-relaxed text-fg/85">
        {projeto.impacto}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {projeto.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-panel px-3 py-1 text-xs font-medium text-fg/85"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* mt-auto prende os botões no rodapé: os cartões têm alturas de texto diferentes.
          Um embaixo do outro: lado a lado, o cartão estreito quebrava o texto em duas linhas. */}
      <div className="mt-auto grid gap-2 pt-6">
        <button
          type="button"
          onClick={onAbrirNarrativa}
          aria-haspopup="dialog"
          className="flex items-center justify-between gap-2 rounded-xl border border-line px-4 py-3 text-sm font-bold transition-colors hover:border-accent hover:text-accent"
        >
          Entender mais
          <span aria-hidden>↗</span>
        </button>

        <button
          type="button"
          onClick={onAbrirTecnico}
          aria-haspopup="dialog"
          className="flex items-center justify-between gap-2 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-bold text-accent transition-colors hover:bg-accent hover:text-canvas"
        >
          Detalhes técnicos
          <span aria-hidden>{"</>"}</span>
        </button>
      </div>
    </article>
  );
}

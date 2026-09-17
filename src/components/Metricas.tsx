import { metricas } from "@/data/conteudo";

export function Metricas() {
  return (
    <section className="painel grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {metricas.map((metrica) => (
        <div key={metrica.rotulo} className="px-5 py-5 sm:px-6 sm:py-7">
          <p className="text-2xl font-bold text-accent sm:text-3xl">
            {metrica.valor}
          </p>
          <p className="rotulo mt-2">{metrica.rotulo}</p>
        </div>
      ))}
    </section>
  );
}

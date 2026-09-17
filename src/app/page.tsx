import { Cabecalho } from "@/components/Cabecalho";
import { Contato } from "@/components/Contato";
import { Experiencia } from "@/components/Experiencia";
import { Habilidades } from "@/components/Habilidades";
import { Hero } from "@/components/Hero";
import { Metricas } from "@/components/Metricas";
import { Projetos } from "@/components/Projetos";
import { Rodape } from "@/components/Rodape";
import { Stack } from "@/components/Stack";

export default function Home() {
  return (
    <>
      <Cabecalho />
      <main className="mx-auto flex max-w-6xl flex-col gap-3 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <Hero />
        <Metricas />
        <Projetos />
        <Habilidades />
        <Stack />
        <Experiencia />
        <Contato />
        <Rodape />
      </main>
    </>
  );
}

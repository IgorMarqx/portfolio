# portfolio

Portfólio pessoal do Igor Marques — Next.js 15, React 18, TypeScript e Tailwind.
Visual de terminal (mono, fundo escuro, malha de grade, acento azul), página única
com âncoras.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run typecheck
```

## Estrutura

- `src/data/conteudo.ts` — **toda** a informação do currículo em um só lugar
  (perfil, métricas, experiências, projetos, stack, contato). Editar o portfólio
  é editar esse arquivo.
- `src/components/` — um componente por seção: cabeçalho, hero, métricas,
  projetos, habilidades, stack, experiência, contato e rodapé.
- `src/app/page.tsx` — só a composição das seções.

## Seções

`01_HOME` · `02_PROJETOS` · `03_STACK` · `04_SOBRE` · `05_CONTATO` — a navegação
usa âncoras (`href="#id"`) e o item ativo é marcado por `IntersectionObserver`.

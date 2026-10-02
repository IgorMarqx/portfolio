import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import { perfil } from "@/data/conteudo";

// Inter no texto corrido: a monoespaçada cansava a leitura, e a Plus Jakarta tem
// espaço entre palavras estreito demais para parágrafo.
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Plus Jakarta só em título: é a sem serifa geométrica, do mesmo desenho do "SDI".
const titulo = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-titulo",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Deixa o pinch-zoom livre: travar o zoom quebra a leitura de quem precisa dele.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1c" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8fc" },
  ],
};

export const metadata: Metadata = {
  title: `${perfil.nome} — ${perfil.titulo}`,
  description: perfil.resumo,
  openGraph: {
    title: `${perfil.nome} — ${perfil.titulo}`,
    description: perfil.resumo,
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${titulo.variable}`} suppressHydrationWarning>
      <head>
        {/* Aplica o tema salvo antes da primeira pintura: sem isso, quem escolheu
            claro vê um piscar escuro a cada carregamento. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("tema");if(!t){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}if(t==="light"){document.documentElement.dataset.theme="light";}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

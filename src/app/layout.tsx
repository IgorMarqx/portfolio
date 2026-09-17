import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { perfil } from "@/data/conteudo";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Deixa o pinch-zoom livre: travar o zoom quebra a leitura de quem precisa dele.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05070a" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7fa" },
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
    <html lang="pt-BR" className={mono.variable} suppressHydrationWarning>
      <head>
        {/* Aplica o tema salvo antes da primeira pintura: sem isso, quem escolheu
            claro vê um piscar escuro a cada carregamento. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("tema");if(!t){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}if(t==="light"){document.documentElement.dataset.theme="light";}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}

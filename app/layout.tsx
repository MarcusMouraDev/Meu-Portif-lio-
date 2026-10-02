import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://marcus-moura-portfolio.mpfagundesmoura.chatgpt.site";
const socialImage = `${siteUrl}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Marcus Moura — Engenharia de Software",
  description: "Portfólio de Marcus Moura: projetos em Python, web, APIs, automação e experiências mobile.",
  alternates: { canonical: siteUrl },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Marcus Moura — Engenharia de Software",
    description: "Projetos em Python, web, APIs e automação.",
    url: siteUrl,
    images: [{ url: socialImage, width: 1200, height: 630, type: "image/png", alt: "Portfólio de Marcus Moura" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: [socialImage] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" data-theme="dark"><body>{children}</body></html>;
}

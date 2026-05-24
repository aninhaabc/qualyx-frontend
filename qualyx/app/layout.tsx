import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qualyx ",
  description:
    "Monitore, avalie e detecte falhas em agentes de IA automaticamente, com foco em negócio e compliance.",
  openGraph: {
    title: "Qualyx ",
    description: "Sua IA atende clientes. A Qualyx garante a qualidade.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={geist.className}>{children}</body>
    </html>
  );
}

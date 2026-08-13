import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import "./globals.css";

// Serifada de display. Fallback de TAN Twinkle (licenciada) até o cliente
// hospedar a fonte de marca — mesma escolha do protótipo do handoff.
const serif = EB_Garamond({
  variable: "--font-domi-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Tipografia de UI/texto.
const sans = Inter({
  variable: "--font-domi-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Domi Semijoias",
  description:
    "Domi — semijoias com acabamento fino. Loja em construção.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${serif.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans">
        {children}
      </body>
    </html>
  );
}

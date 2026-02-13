import type { Metadata } from "next";
import { Geist, Geist_Mono, Righteous, Cal_Sans } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/layout/SmoothScroll";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const righteous = Righteous({
  variable: "--font-righteous",
  subsets: ["latin"],
  weight: "400",
});
const calSans = Cal_Sans({
  variable: "--font-cal-sans",
  subsets: ["latin"],
  weight: "400",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hendra Sutrisno — Fullstack Web Developer",
  description: "Portfolio of Hendra Sutrisno",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${righteous.variable}
          ${calSans.variable}
          font-sans
          bg-[color:var(--bg)]
          text-[color:var(--text)]
          transition-colors
          antialiased
        `}
      >
        <LanguageProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
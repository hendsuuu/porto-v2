import type { Metadata } from "next";
import { Geist, Geist_Mono, Righteous, Cal_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/Providers";

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
  fallback: ["system-ui", "Arial", "sans-serif"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hendsuuu.my.id"),

  title: {
    default: "Hendra Sutrisno — Fullstack Web Developer",
    template: "%s | Hendra Sutrisno",
  },

  description:
    "Portfolio Hendra Sutrisno — Fullstack Web Developer specializing in Next.js, Laravel, and modern web technologies. Building fast, scalable, and user-focused web applications.",

  keywords: [
    "Hendra Sutrisno",
    "Fullstack Developer",
    "Web Developer Indonesia",
    "Next.js Developer",
    "Laravel Developer",
    "Frontend Developer",
    "Backend Developer",
    "Portfolio Developer",
  ],

  authors: [{ name: "Hendra Sutrisno", url: "https://hendsuuu.my.id" }],

  creator: "Hendra Sutrisno",
  publisher: "Hendra Sutrisno",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  openGraph: {
    title: "Hendra Sutrisno — Fullstack Web Developer",
    description:
      "Explore the portfolio of Hendra Sutrisno, a Fullstack Web Developer building modern web applications using Next.js and Laravel.",
    url: "https://hendsuuu.my.id",
    siteName: "Hendra Sutrisno Portfolio",
    images: [
      {
        url: "/image/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hendra Sutrisno Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hendra Sutrisno — Fullstack Web Developer",
    description: "Portfolio of Hendra Sutrisno — Fullstack Web Developer.",
    images: ["/image/og-image.png"],
  },

  alternates: {
    canonical: "https://hendsuuu.my.id",
  },

  category: "technology",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "id" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: <T = any>(key: string) => T;
};

const LanguageContext = createContext<Ctx | null>(null);

const DICT = {
  id: {
    hero: {
      subtitle:
        "Punya ide besar? Yuk, kita wujudkan bersama. Dari data menjadi insight, dari insight menjadi solusi nyata. Saya siap berkolaborasi untuk membangun produk digital yang tidak hanya berjalan, tapi juga terus berkembang.",
      quote: "Mari Bangun Sesuatu yang Bermakna !!!"
    },
    about:{
        im: "Saya",
        desc:"Saya lulusan Teknik Informatika dengan pengalaman lebih dari 1 tahun membangun aplikasi web yang menyelesaikan masalah nyata. Saya telah mengerjakan lebih dari 20 proyek, merancang solusi yang skalabel dan berfokus pada pengguna dari konsep hingga deployment. Stack saya meliputi HTML, CSS, JavaScript, PHP, Laravel, dan MySQL mencakup pengembangan front-end dan back-end. Saya berkembang di lingkungan yang dinamis di mana ide bergerak cepat dan eksekusi sangat penting. Tujuan saya? Membangun produk yang tidak hanya fungsional, tetapi juga berdampak, skalabel, dan siap untuk tumbuh."
    },
    nav: {
      projects: "Projects",
      about: "About",
      contact: "Contact",
      faq: "FAQ",
    },
    contact: {
      badge: "Contact",
      title: "Let’s work together",
      subtitle:
        "Kirim pesan lewat form ini. Pesan akan masuk langsung ke email saya, dan kamu bisa mendapatkan balasan via email.",
      leftTitle: "Ketersediaan & Detail",
      leftDesc:
        "Saya bisa membantu mulai dari landing page, dashboard, sampai aplikasi web end-to-end. Fokus: UI rapi, performa, dan UX smooth.",
      formTitle: "Kirim Pesan",
      yourEmail: "Email kamu",
      subject: "Subjek",
      message: "Pesan",
      placeholderEmail: "kamu@email.com",
      placeholderSubject: "Pertanyaan project",
      placeholderMessage: "Ceritakan project kamu, timeline, dan goals...",
      send: "Kirim pesan",
      sending: "Mengirim...",
      success: "✅ Pesan terkirim. Terima kasih! Saya akan balas via email.",
      privacy: "Dengan mengirim form ini, email kamu dipakai hanya untuk membalas pesan.",
    },
    faq: {
      badge: "FAQ",
      title: "Pertanyaan yang sering ditanyakan",
      subtitle:
        "Beberapa jawaban singkat supaya kamu tahu cara saya bekerja dan stack yang saya kuasai.",
      items: [
        {
          q: "Apakah kamu open untuk kerja dengan klien internasional?",
          a: "Ya. Saya terbiasa komunikasi dalam bahasa Inggris (async maupun meeting). Saya juga nyaman bekerja dengan timezone yang berbeda selama scope dan timeline jelas.",
        },
        {
          q: "Berapa lama biasanya kamu mengerjakan sebuah project?",
          a: "Tergantung scope. Landing page 3–7 hari, website dengan beberapa halaman 1–3 minggu, dan aplikasi yang lebih kompleks bisa 4+ minggu. Saya biasa mulai dengan breakdown fitur + estimasi.",
        },
        {
          q: "Kamu expert dalam stack apa?",
          a: "Utama: Next.js/React, TypeScript, TailwindCSS, GSAP/Lenis untuk motion. Backend: Laravel/Node.js. Database: PostgreSQL/MySQL. Saya fokus pada UI yang rapi, performa, dan maintainability.",
        },
        {
          q: "Apakah kamu menerima maintenance atau revisi setelah launch?",
          a: "Ya. Saya bisa bantu maintenance, improvement, dan bug fixing. Biasanya saya tawarkan paket support mingguan/bulanan tergantung kebutuhan.",
        },
      ],
    },
    footer: {
      tagline:
        "Fullstack Web Developer — fokus pada UI yang rapi, motion yang halus, dan web yang cepat.",
      built: "Built with Next.js • Tailwind • GSAP",
      legal: "Legal",
      status: "Status",
      cols: {
        explore: "Explore",
        work: "Work",
        connect: "Connect",
      },
    },
  },

  en: {
    hero: {
      subtitle:
        "Have a big idea? Let’s bring it to life together. Turning data into insights, and insights into real solutions. I’m ready to collaborate and build digital products that don’t just function, but continue to grow and evolve.",
       quote:"Let’s Build Something Meaningful !!!"
    },
    about:{
        im: "I’m",
        desc:"I’m an Informatics Engineering graduate with 1+ YOE building web applications that solve real problems. I’ve worked on 20+ projects, crafting scalable, user-focused solutions from concept to deployment. My stack includes HTML, CSS, JavaScript, PHP, Laravel, and MySQL covering both front-end and back-end development. I thrive in fast-paced environments where ideas move quickly and execution matters. My goal? To build products that are not just functional, but impactful, scalable, and ready to grow."
    },
    nav: {
      projects: "Projects",
      about: "About",
      contact: "Contact",
      faq: "FAQ",
    },
    contact: {
      badge: "Contact",
      title: "Let’s work together",
      subtitle:
        "Send a message through this form. It will be delivered directly to my email and I’ll reply back to you.",
      leftTitle: "Availability & Details",
      leftDesc:
        "I can help from landing pages and dashboards to end-to-end web apps. Focus: clean UI, performance, and smooth UX.",
      formTitle: "Send a message",
      yourEmail: "Your email",
      subject: "Subject",
      message: "Message",
      placeholderEmail: "you@email.com",
      placeholderSubject: "Project inquiry",
      placeholderMessage: "Tell me about your project, timeline, and goals...",
      send: "Send message",
      sending: "Sending...",
      success: "✅ Message sent. Thank you! I’ll reply via email.",
      privacy: "By submitting this form, your email is used only to reply.",
    },
    faq: {
      badge: "FAQ",
      title: "Frequently asked questions",
      subtitle:
        "Quick answers so you know how I work and what I’m best at.",
      items: [
        {
          q: "Are you open to working with international clients?",
          a: "Yes. I’m comfortable communicating in English (async or meetings) and working across time zones as long as scope and timeline are clear.",
        },
        {
          q: "How long does a typical project take?",
          a: "It depends on scope. A landing page usually takes 3–7 days, a multi-page website 1–3 weeks, and more complex apps 4+ weeks. I start with feature breakdown + estimation.",
        },
        {
          q: "What stack are you most experienced with?",
          a: "Primary: Next.js/React, TypeScript, TailwindCSS, GSAP/Lenis for motion. Backend: Laravel/Node.js. Database: PostgreSQL/MySQL. I focus on clean UI, performance, and maintainability.",
        },
        {
          q: "Do you offer maintenance or revisions after launch?",
          a: "Yes. I can help with maintenance, improvements, and bug fixes. I usually offer weekly/monthly support depending on needs.",
        },
      ],
    },
    footer: {
      tagline:
        "Fullstack Web Developer — focused on clean UI, smooth motion, and fast websites.",
      built: "Built with Next.js • Tailwind • GSAP ",
      legal: "Legal",
      status: "Status",
      cols: {
        explore: "Explore",
        work: "Work",
        connect: "Connect",
      },
    },
  },
} as const;

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "id" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const t = <T,>(key: string) => {
    const parts = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let cur: any = DICT[lang];
    for (const p of parts) cur = cur?.[p];
    return cur as T;
  };

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
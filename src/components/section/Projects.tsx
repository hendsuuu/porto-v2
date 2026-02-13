"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../i18n/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  title: string;
  description: string;
  image: string; // path di /public
  stack: string[];
  href: string; // bisa ke /projects/[slug] atau link demo
};

const projects: Project[] = [
  {
    title: "Portfolio Motion",
    description: "Landing page cinematic dengan GSAP + Lenis + dark/light theme.",
    image: "/image/foto1.jpg",
    stack: ["Next.js", "TypeScript", "Tailwind", "GSAP"],
    href: "/projects/portfolio-motion",
  },
  {
    title: "Inventory Dashboard",
    description: "Dashboard manajemen stok dengan chart, roles, dan CRUD data.",
    image: "/image/foto2.jpg",
    stack: ["Next.js", "shadcn/ui", "PostgreSQL"],
    href: "/projects/inventory-dashboard",
  },
  {
    title: "Document Management",
    description: "Sistem arsip PDF & metadata dengan pencarian cepat dan kategori.",
    image: "/image/foto3.jpg",
    stack: ["Laravel", "MySQL", "Tailwind", "Redis"],
    href: "/projects/document-management",
  },
  {
    title: "Inventory Dashboard 2",
    description: "Dashboard manajemen stok dengan chart, roles, dan CRUD data.",
    image: "/image/foto2.jpg",
    stack: ["Next.js", "shadcn/ui", "PostgreSQL"],
    href: "/projects/inventory-dashboard",
  },
  {
    title: "Document Management 2",
    description: "Sistem arsip PDF & metadata dengan pencarian cepat dan kategori.",
    image: "/image/foto3.jpg",
    stack: ["Laravel", "MySQL", "Tailwind", "Redis"],
    href: "/projects/document-management",
  },
];

export default function Projects() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-proj='heading']",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        "[data-proj='card']",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start: "top 65%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-dvh flex items-center bg-[color:var(--bg)]"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Heading */}
        <div data-proj="heading" className="text-center max-w-2xl mx-auto">
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ui-border)] bg-[color:var(--surface)] px-4 py-2 backdrop-blur"> */}
            {/* <span className="h-2 w-2 rounded-full bg-[color:var(--ui-accent)]" /> */}
            {/* <p className="text-sm sm:text-2xl font-semibold tracking-wide text-[color:var(--text)]">
              Projects
            </p> */}
          {/* </div> */}

          <h2 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight text-[color:var(--text)]">
            Selected work
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[color:var(--text-secondary)]">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-4 sm:gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.title}
              data-proj="card"
              className="
                group
                rounded-2xl
                border border-[color:var(--ui-border)]
                bg-[color:var(--surface)]
                backdrop-blur
                overflow-hidden
                transition
                hover:bg-[color:var(--bg-secondary)]
                hover:border-[color:var(--ui-accent)]
              "
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                {/* kalau image belum ada, tetap aman: kasih fallback gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(600px_220px_at_20%_10%,rgba(76,92,120,0.18),transparent_60%)]" />

                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority={false}
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">
                  {p.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                  {p.description}
                </p>

                {/* Stack */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="
                        rounded-full
                        border border-[color:var(--ui-border)]
                        bg-[color:var(--surface)]
                        px-3 py-1
                        text-xs
                        text-[color:var(--text-secondary)]
                      "
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-5 flex items-center justify-between">
                  <Link
                    href={p.href}
                    className="
                      inline-flex items-center gap-2
                      text-sm font-medium
                      text-[color:var(--text)]
                      opacity-90
                      hover:opacity-100
                      transition
                    "
                  >
                    View details
                    <span className="inline-flex transition group-hover:translate-x-1">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path
                          d="M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>

                  <span className="text-xs text-[color:var(--text-secondary)]">
                    {p.stack[0]}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-48"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--bg) 60%, transparent) 60%, var(--bg) 100%)",
        }}
      />
    </section>
  );
}
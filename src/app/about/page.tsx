"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "@/components/Nav";

gsap.registerPlugin(ScrollTrigger);

type TimelineItem = {
  year: string;
  title: string;
  company?: string;
  desc: string;
  tags: string[];
};

const timeline: TimelineItem[] = [
  {
    year: "2026",
    title: "Fullstack Web Developer",
    company: "Freelance / Contract",
    desc: "Membangun website dan web app end-to-end: UI, API, database, deployment.",
    tags: ["Next.js", "Laravel", "PostgreSQL"],
  },
  {
    year: "2025",
    title: "Frontend Focus",
    company: "Projects & Products",
    desc: "Fokus UI engineering, motion, performance, dan design system.",
    tags: ["React", "TypeScript", "Tailwind", "GSAP"],
  },
  {
    year: "2024",
    title: "Backend & Data",
    company: "Learning & Practice",
    desc: "Mendalami API, auth, caching, dan database untuk aplikasi scalable.",
    tags: ["Node.js", "Redis", "SQL"],
  },
];

export default function AboutPage() {
  const rootRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  const timelineWrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  useEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    if (!root || !line) return;

    // (Opsional) Sync Lenis -> ScrollTrigger, tapi harus ada cleanup
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    const lenis = w.__lenis as { on?: Function; off?: Function } | undefined;

    const onLenisScroll = () => ScrollTrigger.update();
    lenis?.on?.("scroll", onLenisScroll);

    const ctx = gsap.context(() => {
      const wrap = timelineWrapRef.current;
      const accentPath = pathRef.current;
      const svg = svgRef.current;

      if (!wrap || !accentPath || !svg) return;
      const basePath = svg.querySelector("#tl-base") as SVGPathElement | null;

      const updatePath = () => {
        const wrapRect = wrap.getBoundingClientRect();
        const dots = dotsRef.current.filter(Boolean) as HTMLDivElement[];
        if (dots.length < 2) return;

        const pts = dots.map((dot) => {
          const r = dot.getBoundingClientRect();
          return {
            x: r.left + r.width / 2 - wrapRect.left,
            y: r.top + r.height / 2 - wrapRect.top,
          };
        });

        const d = pts
          .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
          .join(" ");

        if (basePath) basePath.setAttribute("d", d);
        accentPath.setAttribute("d", d);

        const len = accentPath.getTotalLength();
        gsap.set(accentPath, { strokeDasharray: len, strokeDashoffset: len });
      };

      // ✅ penting: tunggu 1 frame biar dotRef sudah terisi
      requestAnimationFrame(() => {
        updatePath();
        ScrollTrigger.refresh();
      });

      // ✅ draw animation (scrub)
      gsap.to(accentPath, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrap, // lebih akurat daripada selector
          start: "top 70%",
          end: "bottom 25%",
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: () => {
            updatePath(); // hitung ulang d + panjang path
          },
        },
      });

      // ✅ keep in sync on resize
      const onResize = () => {
        updatePath();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", onResize);

      // Intro reveal
      gsap.fromTo(
        "[data-about='intro']",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      );

      // Timeline line draw (IMPORTANT: use gsap.set, not gsap.to inside onUpdate)
      gsap.set(line, { scaleY: 0, transformOrigin: "top" });

      gsap.to(line, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-about='timeline']",
          start: "top 70%",
          end: "bottom 25%",
          scrub: true,
        },
      });

      // Dots + cards
      const items = gsap.utils.toArray<HTMLElement>("[data-tl='item']");

      items.forEach((item, i) => {
        const dot = dotsRef.current[i];
        const card = item.querySelector(
          "[data-tl='card']",
        ) as HTMLElement | null;

        if (dot) {
          gsap.set(dot, { scale: 0.7, opacity: 0.35 });
          gsap.to(dot, {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 72%",
              end: "top 74%",
              scrub: true,
            },
          });
        }

        if (card) {
          gsap.fromTo(
            card,
            { y: 14, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
              },
            },
          );
        }
      });
      return () => {
        window.removeEventListener("resize", onResize);
      };
    }, rootRef);

    return () => {
      lenis?.off?.("scroll", onLenisScroll); // ✅ cleanup listener
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={rootRef}
      className="bg-[color:var(--bg)] text-[color:var(--text)]">
      <section className="relative">
        <Nav />
      </section>

      {/* Intro */}
      <section className="relative">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div
            data-about="intro"
            className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            {/* Left */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ui-border)] bg-[color:var(--surface)] px-4 py-2 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                <p className="text-sm sm:text-base font-medium tracking-wide">
                  About
                </p>
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                Hi, I&apos;m{" "}
                <span className="[font-family:var(--font-display)]">
                  Hendra Sutrisno
                </span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-[color:var(--text-secondary)] leading-relaxed">
                Fullstack Web Developer yang fokus pada UI yang rapi, performa
                tinggi, dan pengalaman pengguna yang smooth. Saya suka membangun
                produk dengan sentuhan motion halus dan arsitektur yang
                maintainable.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "React",
                  "TypeScript",
                  "Laravel",
                  "GSAP",
                  "Lenis",
                  "PostgreSQL",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[color:var(--ui-border)] bg-[color:var(--surface)] px-3 py-1 text-xs text-[color:var(--text-secondary)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right photo */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-[color:var(--ui-border)] bg-[color:var(--surface)]">
                <div className="absolute inset-0 bg-[radial-gradient(700px_300px_at_20%_10%,rgba(76,92,120,0.18),transparent_60%)] dark:bg-[radial-gradient(700px_300px_at_20%_10%,rgba(138,151,166,0.12),transparent_60%)]" />
                <Image
                  src="/me.jpg"
                  alt="Hendra Sutrisno"
                  width={900}
                  height={1100}
                  className="relative h-[420px] w-full object-cover sm:h-[520px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section data-about="timeline" className="relative">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ui-border)] bg-[color:var(--surface)] px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
              <p className="text-sm sm:text-base font-medium tracking-wide">
                Career Timeline
              </p>
            </div>

            <h2 className="mt-5 text-2xl sm:text-3xl font-semibold tracking-tight">
              Dot-to-dot journey
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[color:var(--text-secondary)]">
              Timeline ini bisa kamu sesuaikan (tahun, role, perusahaan, dan
              deskripsi).
            </p>
          </div>

          <div ref={timelineWrapRef} className="relative mt-12">
            {/* SVG connector (desktop only) */}
            <svg
              ref={svgRef}
              className="pointer-events-none absolute inset-0 hidden lg:block"
              width="100%"
              height="100%">
              {/* base line */}
              <path
                id="tl-base"
                d=""
                className="stroke-[color:var(--border)]"
                strokeWidth="2"
                fill="none"
                opacity="0.9"
              />

              <path
                id="tl-accent"
                ref={pathRef}
                d=""
                className="stroke-[color:var(--accent)]"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* base line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[color:var(--ui-border)] lg:block" />
            {/* animated overlay */}
            <div
              ref={lineRef}
              className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[color:var(--ui-accent)] lg:block"
            />

            <div className="space-y-6">
              {timeline.map((it, idx) => {
                const isLeft = idx % 2 === 0;

                return (
                  <div
                    key={it.year + it.title}
                    data-tl="item"
                    className="relative grid gap-4 lg:grid-cols-2">
                    {/* dot */}
                    <div className="absolute left-1/2 top-6 hidden -translate-x-1/2 lg:block">
                      <div
                        ref={(el) => {
                          dotsRef.current[idx] = el;
                        }}
                        className="h-4 w-4 rounded-full bg-[color:var(--bg)] border-2 border-[color:var(--accent)] shadow-sm"
                      />
                    </div>

                    <div
                      className={isLeft ? "lg:pr-10" : "lg:order-2 lg:pl-10"}>
                      <div
                        data-tl="card"
                        className="rounded-2xl border border-[color:var(--ui-border)] bg-[color:var(--surface)] backdrop-blur p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-semibold tracking-wide text-[color:var(--text-secondary)]">
                              {it.year}
                            </p>
                            <h3 className="mt-1 text-lg font-semibold tracking-tight">
                              {it.title}
                            </h3>
                            {it.company && (
                              <p className="mt-1 text-sm text-[color:var(--text-secondary)]">
                                {it.company}
                              </p>
                            )}
                          </div>

                          <span className="rounded-full border border-[color:var(--ui-border)] bg-[color:var(--bg)] px-3 py-1 text-xs text-[color:var(--text-secondary)]">
                            {idx + 1}/{timeline.length}
                          </span>
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                          {it.desc}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {it.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-[color:var(--ui-border)] bg-[color:var(--bg)] px-3 py-1 text-xs text-[color:var(--text-secondary)]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div
                      className={
                        isLeft
                          ? "hidden lg:block lg:order-2"
                          : "hidden lg:block"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-48"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--bg) 60%, transparent) 60%, var(--bg) 100%)",
          }}
        />
      </section>
    </main>
  );
}

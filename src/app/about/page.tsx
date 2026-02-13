"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "@/components/Nav";
import Footer from "@/components/section/Footer";
import { useLang } from "@/components/i18n/LanguageProvider";
import { s } from "motion/react-client";
import TiltedCard from "@/components/TiltedCard";

gsap.registerPlugin(ScrollTrigger);

type ExperienceItem = {
  id: number;
  company: string;
  logo: string;
  description: string;
  tasks: string[];
};

const items: ExperienceItem[] = [
  {
    id: 1,
    company: "PT. Hwaseung Indonesia 2 Pati",
    logo: "/image/hwp.png",
    description: "Data & System • Oct 2025 – Present",
    tasks: [
      "Developed QIP App to support quality inspection processes using Laravel.",
      "Fixed bugs and performed ongoing system maintenance.",
      "Handled data entry in the Quality Control department for production analysis purposes.",
    ],
  },
  {
    id: 2,
    company: "Indosat Ooredoo Hutchison",
    logo: "/image/indosat.png",
    description: "Data Analyst Intern • July – Dec 2024",
    tasks: [
      "Analyzed competitor data and built a market share dashboard using Laravel Fillament.",
      "Developed market trend analysis using Python and Pandas.",
      "Presented insights and findings to the business team.",
    ],
  },
  {
    id: 3,
    company: "BPS Kota Semarang",
    logo: "/image/bps.png",
    description: "Web Developer & Data Entry Intern • Jul – Aug 2024",
    tasks: [
      "Developed a CodeIgniter-based employee permission and survey tracking system.",
      "Performed data validation and cleaning for statistical publication datasets.",
      "Supported the internal web development team in improving the organization's website.",
    ],
  },
  {
    id: 4,
    company: "Bangkit Academy by Google",
    logo: "/image/bangkit.png",
    description: "Machine Learning Cohort • Feb – Jul 2024",
    tasks: [
      "Built an LSTM model for product classification in a Gen-Z financial management app.",
      "Train and evaluate models using TensorFlow to optimize performance.",
      "Collaborate with Mobile and Cloud teams on a capstone project for a financial tracking application.",
    ],
  },
  {
    id: 5,
    company: "Dinus Open Source Community",
    logo: "/image/dsc.jpeg",
    description: "Programming Division Coordinator • Jun 2023 – Jun 2024",
    tasks: [
      "Organized regular training sessions to improve members’ programming skills.",
      "Supported the development of open-source projects by community members.",
      "Lead and managed all activities under the Programming Division.",
    ],
  },
];

export default function AboutPage() {
  const rootRef = useRef<HTMLElement | null>(null);

  const { t } = useLang();
  // timeline rail refs
  const timelineWrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const accentPathRef = useRef<SVGPathElement | null>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    const lenis = w.__lenis as { on?: Function; off?: Function } | undefined;

    const onLenisScroll = () => ScrollTrigger.update();
    lenis?.on?.("scroll", onLenisScroll);

    const ctx = gsap.context(() => {
      // Intro reveal
      gsap.fromTo(
        "[data-about='intro']",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      );

      const wrap = timelineWrapRef.current;
      const svg = svgRef.current;
      const accent = accentPathRef.current;
      const base = svg?.querySelector("#tl-base") as SVGPathElement | null;

      if (!wrap || !svg || !accent) return;

      let ro: ResizeObserver | null = null;

      const updatePath = () => {
        const dots = dotsRef.current.filter(Boolean) as HTMLDivElement[];
        if (dots.length < 2) return;

        // kalau dot belum visible (breakpoint belum lg), skip
        if (dots.some((d) => d.offsetParent === null)) return;

        const wrapRect = wrap.getBoundingClientRect();

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

        if (base) base.setAttribute("d", d);
        accent.setAttribute("d", d);

        const len = accent.getTotalLength();
        gsap.set(accent, { strokeDasharray: len, strokeDashoffset: len });
      };

      const syncNow = () => {
        updatePath();
        ScrollTrigger.refresh();
      };

      const raf1 = requestAnimationFrame(() => {
        syncNow();
        requestAnimationFrame(() => syncNow());
      });

      gsap.to(accent, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top 75%",
          end: "bottom 20%",
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: () => updatePath(),
        },
      });

      const onRefreshInit = () => updatePath();
      ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

      // dots pop + cards reveal
      const nodes = gsap.utils.toArray<HTMLElement>("[data-tl='item']");
      nodes.forEach((node, i) => {
        const dot = dotsRef.current[i];
        const card = node.querySelector(
          "[data-tl='card']",
        ) as HTMLElement | null;

        if (dot) {
          gsap.set(dot, { scale: 0.75, opacity: 0.35 });
          gsap.to(dot, {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: node,
              start: "top 80%",
              end: "top 60%",
              scrub: true,
            },
          });
        }

        if (card) {
          gsap.fromTo(
            card,
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power2.out",
              scrollTrigger: {
                trigger: node,
                start: "top 82%",
              },
            },
          );
        }
      });

      const onResize = () => {
        updatePath();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      if ("ResizeObserver" in window) {
        ro = new ResizeObserver(() => {
          updatePath();
          ScrollTrigger.refresh();
        });
        ro.observe(wrap);
      }

      return () => {
        cancelAnimationFrame(raf1);
        window.removeEventListener("resize", onResize);
        ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
        ro?.disconnect();
      };
    }, rootRef);

    return () => {
      lenis?.off?.("scroll", onLenisScroll);
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={rootRef}
      className="bg-[color:var(--bg)] text-[color:var(--text)]"
    >
      {/* Nav */}
      <section className="relative">
        <Nav />
      </section>

      {/* Intro */}
      <section className="relative">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div
            data-about="intro"
            className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center"
          >
            {/* Left */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                <p className="text-sm sm:text-base font-medium tracking-wide">
                  About
                </p>
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                Hi, {t("about.im")}{" "}
                <span className="[font-family:var(--font-display)]">
                  Hendra Sutrisno
                </span>
              </h1>

              <p className="mt-4 text-justify text-base sm:text-lg text-[color:var(--text-secondary)] leading-relaxed">
                {t("about.desc")}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "React",
                  "TypeScript",
                  "Laravel",
                  "GSAP",
                  "Python",
                  "MySQL",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs text-[color:var(--text-secondary)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right photo */}
            <div className="relative">
              <div className="lg:hidden relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]">
                <div className="absolute inset-0 bg-[radial-gradient(700px_300px_at_20%_10%,rgba(76,92,120,0.18),transparent_60%)] dark:bg-[radial-gradient(700px_300px_at_20%_10%,rgba(138,151,166,0.12),transparent_60%)]" />
                <Image
                  src="/image/me.jpeg"
                  alt="Hendra Sutrisno"
                  width={900}
                  height={1100}
                  className="relative h-[420px] w-full object-cover sm:h-[520px]"
                  priority
                />
              </div>
              <div className="lg:block hidden">
                <TiltedCard
                  imageSrc="/image/me.jpeg"
                  altText="Hendra Sutrisno - Portfolio"
                  captionText="Hendra Sutrisno - Web Developer"
                  containerHeight="420px"
                  containerWidth="380px"
                  imageHeight="420px"
                  imageWidth="380px"
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip
                  // displayOverlayContent
                  overlayContent={
                    <p className="tilted-card-demo-text">Hendra Sutrisno</p>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline / Experience */}
      <section data-about="timeline" className="relative">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
              <p className="text-sm sm:text-base font-medium tracking-wide">
                Experience
              </p>
            </div>

            <h2 className="mt-5 text-2xl sm:text-3xl font-semibold tracking-tight">
              Career Timeline
            </h2>
          </div>

          {/* WRAP: rail kiri */}
          <div ref={timelineWrapRef} className="relative mt-12">
            <div className="space-y-6">
              {items.map((it, idx) => (
                <div key={it.id} data-tl="item" className="relative">
                  {/* card */}
                  <div
                    data-tl="card"
                    className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] backdrop-blur p-5 sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left header */}
                      <div className="flex items-start gap-4">
                        {/* Logo */}
                        {/* <div className="relative mt-0.5 h-30 w-30 shrink-0 overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)]">
                          <Image
                            src={it.logo}
                            alt={it.company}
                            fill
                            className="object-contain p-2"
                            sizes="60px"
                          />
                        </div> */}

                        {/* Company + role */}
                        <div>
                          <h3 className="text-lg font-semibold tracking-tight">
                            {it.company}
                          </h3>
                          <p className="mt-1 text-sm text-[color:var(--text-secondary)]">
                            {it.description}
                          </p>
                        </div>
                      </div>

                      {/* Counter */}
                      <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-1 text-xs text-[color:var(--text-secondary)]">
                        {idx + 1}/{items.length}
                      </span>
                    </div>

                    {/* Tasks */}
                    <ul className="mt-4 space-y-2 text-sm text-[color:var(--text-secondary)]">
                      {it.tasks.map((t, i) => (
                        <li key={i} className="flex gap-2 leading-relaxed">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)] opacity-80" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
        {/* bottom fade */}
        {/* <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-48"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--bg) 60%, transparent) 60%, var(--bg) 100%)",
          }}
        /> */}
      </section>
      {/* Footer */}
    </main>
  );
}

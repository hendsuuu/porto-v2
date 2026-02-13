"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Nav from "../Nav";
// import LightRays from "../LightRays";
import GradientText from "../GradientText";
import { useLang } from "../i18n/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { t } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      gsap.fromTo(
        "[data-hero='tagline']",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.05 },
      );

      gsap.fromTo(
        "[data-hero='title']",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "power2.out", delay: 0.12 },
      );

      gsap.fromTo(
        "[data-hero='subtitle']",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: "power2.out", delay: 0.2 },
      );

      gsap.fromTo(
        "[data-hero='cta']",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.28 },
      );

      // Subtle scroll parallax
      gsap.to("[data-hero='parallax']", {
        y: -24,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // ✅ Premium "walking" stacked arrows (2 arrows, vertical)
      const arrows = gsap.utils.toArray<HTMLElement>(
        "[data-hero='scroll-arrow-walk']",
      );

      // reset
      gsap.set(arrows, { y: 0, opacity: 0.35 });

      // animate like "down-down" stepping
      gsap.to(arrows, {
        y: 5,
        opacity: 1,
        duration: 0.65,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.18,
          repeat: -1,
          yoyo: true,
        },
      });

      // subtle pulse on the pill container
      gsap.to("[data-hero='scroll-pill']", {
        boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
        duration: 1.2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-dvh overflow-hidden bg-[color:var(--bg)]"
    >
      {/* BG layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        data-hero="parallax"
      >
        {/* <LightRays /> */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_30%_20%,rgba(47,58,74,0.10),transparent_60%)] dark:bg-[radial-gradient(1200px_600px_at_30%_20%,rgba(138,151,166,0.12),transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Nav />

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[calc(100dvh-120px)] place-items-center py-16 sm:py-20">
            <div className="w-full max-w-3xl text-center">
              {/* NAME */}
              <h1
                data-hero="name"
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[color:var(--text)]"
              >
                <GradientText
                  colors={["#3A4A66", "#6C7A96", "#9AA7B8"]}
                  animationSpeed={8}
                  showBorder={false}
                  className="select-none custom-class font-display font-semibold text-4xl sm:text-5xl lg:text-7xl px-4"
                >
                  Hendra Sutrisno
                </GradientText>
              </h1>

              {/* ROLE */}
              <p
                data-hero="title"
                className="select-none mt-3 text-lg sm:text-xl lg:text-2xl font-medium text-[color:var(--accent)]"
              >
                Fullstack Web Developer
              </p>

              {/* DESCRIPTION */}
              <p
                data-hero="subtitle"
                className="select-none mx-auto mt-5 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-[color:var(--text-secondary)]"
              >
                {t("hero.subtitle")}
              </p>

              <p className="select-none mx-auto mt-5 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-[color:var(--text-secondary)]">
                {t("hero.quote")}
              </p>

              {/* CTA */}
              <div
                data-hero="cta"
                className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
              >
                <a
                  href="#projects"
                  className="select-none inline-flex items-center justify-center rounded-xl bg-[color:var(--accent)] px-6 py-3 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-[color:var(--accent-hover)] transition"
                >
                  My Projects
                </a>

                <a
                  href="#contact"
                  className="select-none inline-flex items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-3 text-sm sm:text-base font-medium text-[color:var(--text)] backdrop-blur hover:bg-[color:var(--bg-secondary)] transition"
                >
                  Get in touch
                </a>
              </div>

              {/* ✅ Premium scroll hint (oval) + stacked walking arrows */}
              <div className="mt-12 flex justify-center">
                <a
                  href="#about"
                  aria-label="Scroll to explore"
                  className="group select-none inline-flex items-center"
                >
                  <span
                    data-hero="scroll-pill"
                    className="
                      relative inline-flex items-center gap-4
                      rounded-full px-5 py-3
                      border border-[color:var(--ui-border)]
                      bg-[color:var(--surface)]
                      backdrop-blur
                      transition
                      hover:bg-[color:var(--bg-secondary)]
                      hover:shadow-lg
                      overflow-hidden
                    "
                  >
                    {/* subtle premium sheen */}
                    <span
                      className="
                        pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition
                        bg-[radial-gradient(800px_120px_at_10%_0%,rgba(255,255,255,0.10),transparent_60%)]
                        dark:bg-[radial-gradient(800px_120px_at_10%_0%,rgba(255,255,255,0.06),transparent_60%)]
                      "
                    />

                    <span className="relative text-xs sm:text-sm text-[color:var(--text-secondary)] group-hover:text-[color:var(--text)] transition">
                      Scroll to explore
                    </span>

                    {/* divider */}
                    <span className="relative h-6 w-px bg-[color:var(--border)]  opacity-70" />

                    {/* stacked arrows (VERTICAL) */}
                    <span className="relative flex flex-col items-center -space-y-2.5">
                      <svg
                        data-hero="scroll-arrow-walk"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-[color:var(--text)]"
                      >
                        <path
                          d="M7 10l5 5 5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <svg
                        data-hero="scroll-arrow-walk"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-[color:var(--text)]"
                      >
                        <path
                          d="M7 10l5 5 5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </a>
              </div>
              {/* end scroll hint */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Nav from "../Nav";
import LightRays from "../LightRays";
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
        y: -18,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
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
        {/* Tint overlay biar cocok light/dark */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_30%_20%,rgba(47,58,74,0.10),transparent_60%)] dark:bg-[radial-gradient(1200px_600px_at_30%_20%,rgba(138,151,166,0.12),transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Nav />

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Center: min height dikurangi area nav + padding responsif */}
          <div className="grid min-h-[calc(100dvh-120px)] place-items-center py-16 sm:py-20">
            <div className="w-full max-w-3xl text-center">
              {/* NAME (primary focus) */}
              <h1
                data-hero="name"
                className="
        text-4xl 
        sm:text-5xl 
        lg:text-6xl 
        font-semibold 
        text-[color:var(--text)]
      "
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
                className=" select-none
        mt-3 
        text-lg 
        sm:text-xl 
        lg:text-2xl 
        font-medium
        text-[color:var(--accent)]
      "
              >
                Fullstack Web Developer
              </p>

              {/* DESCRIPTION */}
              <p
                data-hero="subtitle"
                className=" select-none
        mx-auto 
        mt-5 
        max-w-xl 
        text-sm 
        sm:text-base 
        lg:text-lg 
        leading-relaxed
        text-[color:var(--text-secondary)]
      "
              >
                {t("hero.subtitle")}
              </p>

              <p
                className="select-none
        mx-auto 
        mt-5 
        max-w-xl 
        text-sm 
        sm:text-base 
        lg:text-lg 
        leading-relaxed
        text-[color:var(--text-secondary)]
      "
              >
                {t("hero.quote")}
              </p>

              {/* CTA */}
              <div
                data-hero="cta"
                className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
              >
                <a
                  href="#projects"
                  className="select-none
          inline-flex items-center justify-center 
          rounded-xl 
          bg-[color:var(--accent)] 
          px-6 py-3 
          text-sm sm:text-base
          font-medium 
          text-white 
          shadow-sm 
          hover:bg-[color:var(--accent-hover)] 
          transition
        "
                >
                  My Projects
                </a>

                <a
                  href="#contact"
                  className="select-none
          inline-flex items-center justify-center 
          rounded-xl 
          border border-[color:var(--border)] 
          bg-[color:var(--surface)] 
          px-6 py-3 
          text-sm sm:text-base
          font-medium 
          text-[color:var(--text)] 
          backdrop-blur 
          hover:bg-[color:var(--bg-secondary)] 
          transition
        "
                >
                  Get in touch
                </a>
              </div>

              {/* Scroll hint */}
              <div className="mt-12 flex justify-center">
                <div
                  className="select-none
        rounded-full 
        border border-[color:var(--border)] 
        bg-[color:var(--surface)] 
        px-4 py-2 
        text-xs 
        text-[color:var(--text-secondary)]
      "
                >
                  Scroll to explore ↓
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

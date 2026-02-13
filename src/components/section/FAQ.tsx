"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/components/i18n/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const { t } = useLang();
  const items = t<Array<{ q: string; a: string }>>("faq.items");

  const sectionRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-faq='heading']",
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 70%" },
        }
      );

      gsap.fromTo(
        "[data-faq='item']",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 65%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative min-h-dvh flex items-center bg-[color:var(--bg)]"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Heading */}
        <div data-faq="heading" className="text-center max-w-2xl mx-auto">
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ui-border)] bg-[color:var(--surface)] px-4 py-2 backdrop-blur"> */}
            {/* <span className="h-2 w-2 rounded-full bg-[color:var(--ui-accent)]" /> */}
            {/* <p className="text-sm sm:text-xl font-semibold tracking-wide text-[color:var(--text)]">
              {t<string>("faq.badge")}
            </p> */}
          {/* </div> */}

          <h2 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight text-[color:var(--text)]">
            {t<string>("faq.title")}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[color:var(--text-secondary)]">
            {t<string>("faq.subtitle")}
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-10 mx-auto max-w-3xl space-y-3">
          {items.map((it, idx) => {
            const isOpen = open === idx;

            return (
              <div
                key={it.q}
                data-faq="item"
                className="
                  rounded-2xl
                  border border-[color:var(--ui-border)]
                  bg-[color:var(--surface)]
                  backdrop-blur
                  overflow-hidden
                "
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="
                    w-full
                    flex items-center justify-between gap-4
                    px-5 py-4
                    text-left
                    cursor-pointer
                    hover:bg-[color:var(--bg-secondary)]
                    transition
                  "
                >
                  <span className="font-medium text-[color:var(--text)]">
                    {it.q}
                  </span>

                  <span
                    className={[
                      "shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--ui-border)] bg-[color:var(--surface)] transition",
                      isOpen ? "rotate-45" : "rotate-0",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                <div
                  className={[
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  ].join(" ")}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 text-[color:var(--text-secondary)] leading-relaxed">
                      {it.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
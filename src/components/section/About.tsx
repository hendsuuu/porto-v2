"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLang } from "../i18n/LanguageProvider";

import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiLaravel,
  SiTailwindcss,
  SiPostgresql,
  SiNodedotjs,
    SiPython,
    SiMysql
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { BsStars } from "react-icons/bs";
import ScrollFloat from "../ScrollFloat";

const techStack = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Laravel", icon: SiLaravel },
  { name: "TailwindCSS", icon: SiTailwindcss },
  { name: "GSAP", icon: BsStars },
  { name: "Python", icon: SiPython },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "MySQL", icon: SiMysql },
];

export default function About() {
  const btnRef = useRef<HTMLAnchorElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);
  const { t } = useLang();
  useEffect(() => {
    const btn = btnRef.current;
    const arrow = arrowRef.current;
    if (!btn || !arrow) return;

    // Hover arrow slide
    const onEnter = () => {
      gsap.to(arrow, { x: 6, duration: 0.25, ease: "power2.out" });
      gsap.to(btn, { scale: 1.01, duration: 0.25, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(arrow, { x: 0, duration: 0.25, ease: "power2.out" });
      gsap.to(btn, { scale: 1, duration: 0.25, ease: "power2.out" });
      gsap.to(btn, { x: 0, y: 0, duration: 0.25, ease: "power2.out" });
    };

    // Simple magnet effect
    const strength = 50;
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);

      const x = (mx / r.width) * strength;
      const y = (my / r.height) * strength;

      gsap.to(btn, { x, y, duration: 0.2, ease: "power2.out" });
    };

    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onLeave);
    btn.addEventListener("mousemove", onMove);

    return () => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
      btn.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[color:var(--bg-secondary)]" />
      <section
        id="about"
        className="relative min-h-dvh flex items-center bg-[color:var(--bg-secondary)]">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <div className="max-w-xl">
              {/* Bigger "About me" badge */}
              {/* <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ui-border)] bg-[color:var(--surface)] px-4 py-2 backdrop-blur"> */}
              <p className="text-xl sm:text-2xl font-semibold tracking-wide text-[color:var(--text)]">
                {/* <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=40%"
                // markers={false}
                textClassName="text-xl sm:text-2xl font-semibold tracking-wide text-[color:var(--text)]"
                stagger={0.03}> */}
                About me
                {/* </ScrollFloat> */}
              </p>
              {/* </div> */}

              <h2 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight text-[color:var(--text)]">
                Hi, {t("about.im")} Hendra Sutrisno
              </h2>

              <p className="mt-5 text-justify text-base sm:text-lg leading-relaxed text-[color:var(--text-secondary)]">
                {t("about.desc")}
              </p>

              {/* CTA to /about */}
              <div className="mt-7">
                <Link
                  ref={btnRef}
                  href="/about"
                  className="
                  inline-flex items-center gap-2
                  cursor-pointer select-none
                  rounded-xl
                  border border-[color:var(--ui-border)]
                  bg-[color:var(--surface)]
                  px-5 py-3
                  text-sm sm:text-base
                  font-medium
                  text-[color:var(--text)]
                  backdrop-blur
                  hover:bg-[color:var(--bg-secondary)]
                  transition
                ">
                  Read more
                  <span
                    ref={arrowRef}
                    className="inline-flex items-center"
                    aria-hidden="true">
                    {/* arrow icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h12"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
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
              </div>
            </div>

            {/* RIGHT — TECH STACK */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {techStack.map(({ name, icon: Icon }) => (
                <div
                  key={name}
                  className="
                  group cursor-pointer
                  flex items-center gap-3
                  rounded-xl
                  border border-[color:var(--ui-border)]
                  bg-[color:var(--surface)]
                  px-4 py-3
                  transition-all duration-300
                  hover:bg-[color:var(--bg-secondary)]
                  hover:scale-[1.03]
                  hover:border-[color:var(--ui-accent)]
                ">
                  <Icon
                    size={18}
                    className="text-[color:var(--text-secondary)] transition group-hover:text-[color:var(--ui-accent)]"
                  />
                  <span className="text-sm text-[color:var(--text)]">
                    {name}
                  </span>
                </div>
              ))}
            </div>
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
    </>
  );
}

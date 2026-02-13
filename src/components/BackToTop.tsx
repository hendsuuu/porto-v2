"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 500);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    if (show) {
      gsap.fromTo(
        el,
        { y: 16, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
      );
    } else {
      gsap.to(el, { y: 12, opacity: 0, duration: 0.25, ease: "power2.out" });
    }
  }, [show]);

  const scrollToTop = () => {
    // ✅ coba pakai Lenis kalau kamu sudah pakai
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const lenis = w.__lenis;

    if (lenis?.scrollTo) {
      lenis.scrollTo(0, { duration: 1.2 });
      return;
    }

    // fallback native
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // tetap render untuk animasi, tapi tidak bisa diklik ketika hidden
  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`
        fixed right-15 bottom-15 z-50
        h-12 w-12
        cursor-pointer
        rounded-2xl
        border border-[color:var(--ui-border)]
        bg-[color:var(--surface)]
        backdrop-blur
        text-[color:var(--text)]
        shadow-sm
        hover:bg-[color:var(--bg-secondary)]
        transition
        grid place-items-center
        ${show ? "pointer-events-auto" : "pointer-events-none opacity-0"}
      `}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 19V5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M6 11l6-6 6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

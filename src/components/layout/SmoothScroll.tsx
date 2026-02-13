"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // init once
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Support "#id" dan "/#id"
      const url = new URL(href, window.location.href);

      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash) return;

      const el = document.querySelector(url.hash);
      if (!(el instanceof HTMLElement)) return;

      e.preventDefault();
      lenis.scrollTo(el, { offset: -100, duration: 1.2 });
    };

    document.addEventListener("click", handleClick);

    const ro = new ResizeObserver(() => {
      lenis.resize();
    });
    ro.observe(document.documentElement);

    return () => {
      document.removeEventListener("click", handleClick);
      ro.disconnect();

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;

      lenis.destroy();
      lenisRef.current = null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).__lenis === lenis) delete (window as any).__lenis;
    };
  }, []);

  return <>{children}</>;
}

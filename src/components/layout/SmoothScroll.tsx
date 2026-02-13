"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname, useSearchParams } from "next/navigation";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // init once
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis; // biar bisa dipakai komponen lain (GSAP, anchor handler, dll)

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

      // hanya intercept kalau masih di halaman yang sama (same pathname) dan punya hash
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash) return;

      const el = document.querySelector(url.hash);
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el, { offset: -100, duration: 1.2 });
    };

    document.addEventListener("click", handleClick);

    // kalau konten sering berubah tinggi (images, fonts, data), ResizeObserver bantu banget
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
      if ((window as any).__lenis === lenis) delete (window as any).__lenis;
    };
  }, []);

  // route change handling (recalc height & reset/clamp)
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // tunggu layout settle 1 frame
    requestAnimationFrame(() => {
      lenis.resize();

      // rekomendasi: reset ke atas agar tidak “nyangkut” posisi dari halaman sebelumnya
      // kalau kamu mau tetap mempertahankan posisi scroll antar halaman, hapus baris ini.
    //   lenis.scrollTo(0, { immediate: true });
    });
  }, [pathname, searchParams]);

  return <>{children}</>;
}
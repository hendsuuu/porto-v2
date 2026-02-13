"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function LenisRouteSync() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // trigger setelah route berubah
    requestAnimationFrame(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis;
      if (lenis?.resize) lenis.resize();
      // kalau mau reset ke top tiap pindah halaman, aktifkan ini:
      // if (lenis?.scrollTo) lenis.scrollTo(0, { immediate: true });
    });
  }, [pathname, searchParams]);

  return null;
}

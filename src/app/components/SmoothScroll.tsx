"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 🟢 INIT LENIS
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,   // scroll wheel smooth
      smoothTouch: false,  // boleh diubah ke true kalau mau di HP juga smooth
    });

    // 🔗 Hubungkan LENIS → ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // 🚀 Jalankan Lenis di GSAP ticker
    const raf = (time: number) => {
      lenis.raf(time * 1000); // gsap time (detik) → lenis (ms)
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

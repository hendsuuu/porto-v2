"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const splashRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = splashRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        onFinish();
      },
    });
    // tl.fromTo(
    //   el,
    //   { opacity: 0, scale: 1.1 },
    //   { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }
    // );

    tl.to(el, {
      opacity: 0,
      scale: 1,
      duration: 1.5,
      ease: "power1.out",
    });
  }, []);

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 bg-[#F08787] flex flex-col items-center justify-center z-[9999]"
    >
      <h1 className="text-white text-4xl font-bold">Hendra Sutrisno</h1>
      <p className="text-gray-300 mt-2">Welcome to my portfolio</p>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AvailabilityBadge() {
  const dot = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.to(dot.current, {
      scale: 2,
      opacity: 0,
      duration: 0.8,
      ease: "power1.out",
      repeat: -1,
    });
  }, []);

  return (
    <div className="flex items-center gap-3 mb-3">
      {/* Green blinking lamp */}
      <div className="relative w-3 h-3">
        {/* core */}
        <span className="absolute inset-0 bg-green-400 rounded-full z-10" />
        {/* pulse */}
        <span
          ref={dot}
          className="absolute inset-0 bg-green-400 rounded-full opacity-60"
        />
      </div>

      <span className="text-sm uppercase tracking-widest text-green-400 font-medium">
        Available for Project
      </span>
    </div>
  );
}

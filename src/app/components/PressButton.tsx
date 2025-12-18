"use client";

import { useRef } from "react";
import gsap from "gsap";

export default function PressButton({ label = "CLICK ME" }) {
  const btn = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLDivElement>(null);

  // samakan dengan translate shadow tailwind di bawah
  const dx = 12; // kanan (px)
  const dy = 8; // bawah (px)

  const press = () => {
    gsap.to(btn.current, {
      x: dx,
      y: dy,
      duration: 0.12,
      ease: "power2.out",
    });

    // shadow sedikit "ngepress" biar makin realistis
    gsap.to(shadow.current, {
      scaleX: 0.98,
      scaleY: 0.9,
      duration: 0.12,
      ease: "power2.out",
    });
  };

  const release = () => {
    gsap.to(btn.current, {
      x: 0,
      y: 0,
      duration: 0.18,
      ease: "power3.out",
    });

    gsap.to(shadow.current, {
      scaleX: 1,
      scaleY: 1,
      duration: 0.18,
      ease: "power3.out",
    });
  };

  return (
    <div
      className="relative inline-block select-none cursor-pointer z-50"
      onPointerDown={press}
      onPointerUp={release}
      onPointerLeave={release}
    >
      {/* shadow tetap offset kanan+bawah */}
      <div
        ref={shadow}
        className="absolute inset-0 bg-[#526D82] translate-x-3 translate-y-2 pointer-events-none"
      />

      {/* tombol bergerak menuju shadow saat press */}
      <div
        ref={btn}
        className="relative bg-white border-2 text-[#27374D] border-[#526D82] px-18 py-6 text-xl font-bold"
      >
        {label}
      </div>
    </div>
  );
}

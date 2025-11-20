"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomBounce } from "gsap/CustomBounce";
import CustomEase from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const ballRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);

  const [showContent, setShowContent] = useState(false);

  gsap.registerPlugin(CustomEase, CustomBounce, ScrollTrigger);

  useEffect(() => {
    if (!ballRef.current) return;

    CustomBounce.create("myBounceOnce", {
      strength: 0.6,
      squash: 2,
    });

    const tl = gsap.timeline();

    tl.to(ballRef.current, {
      y: 500,
      duration: 1.2,
      ease: "myBounceOnce",
      delay: 1,
    })
      .to(
        ballRef.current,
        {
          scaleY: 0.6,
          scaleX: 1.2,
          duration: 1.2,
          ease: "myBounceOnce-squash",
          transformOrigin: "bottom",
        },
        "<"
      )
      .to(ballRef.current, {
        scale: 70,
        duration: 0.9,
        ease: "power3.inOut",
      })
      .call(() => {
        setShowContent(true);

        setTimeout(() => {
          if (!contentRef.current) return;

          // fade in
          gsap.fromTo(
            contentRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.7 }
          );

          // 🔥 ANIMASI LINE HORIZONTAL
          gsap.fromTo(
            lineFillRef.current,
            { width: 0 },
            {
              width: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: contentRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }, 50);
      });
  }, []);

  return (
    <>
      <div className="w-full h-screen bg-[#F8FAB4] overflow-hidden relative">

        {/* Ball */}
        <div
          ref={ballRef}
          className="w-10 h-10 rounded-full bg-[#FFC7A7] shadow-lg absolute left-1/2 -top-10"
          style={{ transform: "translateX(-50%)" }}
        />

        {/* SECTION 1 — Horizontal Line */}
        {showContent && (
          <div
            ref={contentRef}
            className="absolute inset-0 w-full h-full bg-[#FFC7A7] flex flex-col gap-3 items-center justify-center p-[5em] z-50"
            style={{ opacity: 0 }}
          >
            <div className="w-full h-full bg-[#FFC7A7] p-4">
              <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
            </div>
            <div className="relative w-full h-[5px] bg-gray-200 rounded-full overflow-hidden">
              <div
                ref={lineFillRef}
                className="absolute left-0 top-0 h-full bg-black rounded-full"
                style={{ width: 0 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* OTHER SECTIONS */}
      <div className="w-full h-[100vh] bg-white flex items-center justify-center">
        <h1 className="text-black text-4xl font-bold">Section 2</h1>
      </div>
      <div className="w-full h-[100vh] bg-[#FEE2AD] flex items-center justify-center">
        <h1 className="text-black text-4xl font-bold">Section 3</h1>
      </div>
      <div className="w-full h-[100vh] bg-white flex items-center justify-center">
        <h1 className="text-black text-4xl font-bold">Section 4</h1>
      </div>
    </>
  );
}

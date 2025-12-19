"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomBounce } from "gsap/CustomBounce";
import CustomEase from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import StaggeredMenu from "@/components/StaggeredMenu";
import PressButton from "./components/PressButton";
import AvailabilityBadge from "./components/AvailabilityBadge";
import Stacker from "./components/Stacker";
import Magnet from "@/components/Magnet";

export default function Home() {
  const ballRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);

  const [showContent, setShowContent] = useState(false);

  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "About", ariaLabel: "Learn about us", link: "/about" },
    { label: "Services", ariaLabel: "View our services", link: "/services" },
    { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
  ];

  const socialItems = [
    { label: "Twitter", link: "https://twitter.com" },
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];
  gsap.registerPlugin(CustomEase, CustomBounce, ScrollTrigger);
  useEffect(() => {
    if (!showContent || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".grid-fill", {
        maskPosition: "100% 100%",
        WebkitMaskPosition: "100% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top top",
          end: "top+=300 top",
          scrub: true,
          markers: false,
        },
      });
    }, contentRef);

    return () => ctx.revert();
  }, [showContent]);

  useEffect(() => {
    if (!ballRef.current) return;

    CustomBounce.create("myBounceOnce", {
      strength: 0.6,
      squash: 2,
    });

    const tl = gsap.timeline();

    tl.to(ballRef.current, {
      y: 500,
      duration: 0.8,
      ease: "myBounceOnce",
      delay: 1,
    })
      .to(
        ballRef.current,
        {
          scaleY: 0.6,
          scaleX: 1.2,
          duration: 0.8,
          ease: "myBounceOnce-squash",
          transformOrigin: "bottom",
        },
        "<"
      )
      .to(ballRef.current, {
        scale: 90,
        duration: 0.7,
        ease: "power3.inOut",
      })
      .to("#splashscreen", {
        hidden: true,
        duration: 0.1,
        ease: "power3.inOut",
        pointerEvents: "none",
      })
      .to(ballRef.current, {
        hidden: true,
        duration: 0.1,
        ease: "power3.inOut",
        pointerEvents: "none",
      })

      .call(() => {
        setShowContent(true);

        setTimeout(() => {
          if (!contentRef.current) return;

          // fade in
          gsap.fromTo(
            contentRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }
          );
          gsap.fromTo(
            "#firstname",
            { x: -100, opacity: 1 },
            { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
          );
          gsap.fromTo(
            "#title",
            { x: 900, opacity: 1 },
            { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
          );
          tl.fromTo(
            "#lastname",
            { x: -100, opacity: 1 },
            { x: 50, opacity: 1, duration: 1, ease: "power3.out" }
          )
            .fromTo(
              "#firstname",
              { x: 0 },
              {
                x: -550,
                duration: 1,
                skewX: 30,
                opacity: 0,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: contentRef.current,
                  start: "top top",
                  end: "bottom-=100 top",
                  scrub: true,
                  markers: false,
                },
              }
            )
            .fromTo(
              "#lastname",
              { x: 50 },
              {
                x: 550,
                duration: 0.8,
                opacity: 0,
                skewX: -30,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: contentRef.current,
                  start: "top top",
                  end: "bottom-=100 top",
                  scrub: true,
                  markers: false,
                },
              }
            )
            .fromTo(
              "#title",
              { x: 0 },
              {
                x: -550,
                duration: 0.8,
                opacity: 0,
                skewX: -30,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: contentRef.current,
                  start: "top top",
                  end: "bottom-=100 top",
                  scrub: true,
                  markers: false,
                },
              }
            );

          // ANIMASI LINE HORIZONTAL
          gsap.fromTo(
            lineFillRef.current,
            { width: 0 },
            {
              width: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: contentRef.current,
                start: "top top",
                end: "bottom-=100 top",
                scrub: true,
                markers: false,
              },
            }
          );
        }, 50);
      });
  }, []);

  return (
    <>
      {/* <div className="min-h-screen w-full flex justify-center overflow-hidden">
          <div className="w-full max-w-[2440px] bg-[#27374D] relative"> */}
      <div
        id="splashscreen"
        className="w-full h-screen bg-[#526D82] overflow-hidden relative">
        {/* Ball */}
        <div
          ref={ballRef}
          className="w-10 h-10 rounded-full bg-[#27374D] shadow-lg absolute left-1/2 -top-10"
          style={{ transform: "translateX(-50%)" }}
        />
      </div>
      {/* </div>
      </div> */}
      {showContent && (
        <>
          <div className="min-h-screen w-full flex justify-center overflow-hidden">
            <div className="w-full max-w-[2440px] bg-[#27374D] relative">
              <div
                style={{
                  background: "#1a1a1a",
                  zIndex: 53,
                  position: "fixed",
                  top: 0,
                  right: 0,
                }}>
                <StaggeredMenu
                  position="right"
                  items={menuItems}
                  socialItems={socialItems}
                  displaySocials={true}
                  displayItemNumbering={true}
                  menuButtonColor="#ffffffff"
                  openMenuButtonColor="#000000ff"
                  changeMenuColorOnOpen={true}
                  colors={["#F08787", "#FEE2AD"]}
                  logoUrl="/Logo.png"
                  accentColor="#ff6b6b"
                  onMenuOpen={() => console.log("Menu opened")}
                  onMenuClose={() => console.log("Menu closed")}
                  isFixed={true}
                />
            
              </div>

              <div
                ref={contentRef}
                className="absolute inset-0 h-full bg-[#27374D] flex gap-3 items-center justify-center"
                style={{ opacity: 0 }}>
                <div className="grid-overlay pointer-events-none absolute inset-0 z-10">
                  <div className="grid-base absolute inset-0" />
                  <div className="grid-fill absolute inset-0" />
                  <div className="photo-circle-fade absolute inset-0 pointer-events-none z-30" />
                </div>
                <div className="absolute -right-50 bottom-0 h-[700px] lg:right-0 lg:h-full z-40">
                  <Image
                    src="/picture.png"
                    alt="Logo"
                    width={700}
                    height={700}
                    className="object-cover w-full h-full rounded-md z-30"
                  />
                </div>
                <div className="hidden lg:block w-1/4 flex flex-col justify-center z-53 lg:absolute ">
                  <AvailabilityBadge />
                  <div>
                    <Magnet padding={50} disabled={false} magnetStrength={5}>
                      <PressButton label="Contact Me" />
                    </Magnet>
                  </div>
                </div>
                <div className="absolute left-0 flex flex-col p-[5em] gap-6 w-2/4 h-full z-40">
                  <div className="w-full h-full">
                    <h1
                      id="firstname"
                      className="absolute left-10 top-25 text-[54px] text-white font-bold italic mb-4 z-53 lg:text-[104px] lg:left-20">
                      HENDRA
                    </h1>
                    <br />
                    <h1
                      id="lastname"
                      className="absolute left-5 top-40 text-[54px] text-white font-bold italic mb-4 z-53 lg:text-[104px] lg:left-35 lg:top-50">
                      SUTRISNO
                    </h1>
                    <h1
                      id="title"
                      className="absolute left-20 bottom-18 text-[36px]  text-white font-bold italic mb-4 z-53 lg:text-[62px]">
                      FULLSTACK DEVELOPER
                    </h1>
                  </div>
                  <div className="relative w-[800px] h-[5px] bg-gray-200 rounded-full overflow-hidden z-53 px-4">
                    <div
                      ref={lineFillRef}
                      className="absolute left-0 bottom-0 h-full bg-[#526D82] rounded-full"
                      style={{ width: 0 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="min-h-screen w-full flex justify-center bg-[#526D82] overflow-hidden">
            <div className="w-full max-w-[2440px] bg-[#27374D] relative">
              <Stacker />
            </div>
          </div>
          <div className="w-full h-[100vh] bg-white flex items-center justify-center z-50">
            <h1 className="text-black text-4xl font-bold">Section 4</h1>
          </div>
        </>
      )}
    </>
  );
}

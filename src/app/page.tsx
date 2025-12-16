"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomBounce } from "gsap/CustomBounce";
import CustomEase from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import StaggeredMenu from "@/components/StaggeredMenu";

export default function Home() {
  const ballRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);

  const [showContent, setShowContent] = useState(false);

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
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
        markers: true,
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
        scale: 90,
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
          gsap.fromTo(
            "#firstname",
            { x: -100, opacity: 1 },
            { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
          );
          tl.fromTo(
            "#lastname",
            { x: -100, opacity: 1 },
            { x: 50, opacity: 1, duration: 1, ease: "power3.out"}
          ).fromTo("#firstname",
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
          })
          .fromTo("#lastname",
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
          });
             

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
      <div className="w-full h-screen bg-[#526D82] overflow-hidden relative">
        {/* Ball */}
        <div
          ref={ballRef}
          className="w-10 h-10 rounded-full bg-[#27374D] shadow-lg absolute left-1/2 -top-10"
          style={{ transform: "translateX(-50%)" }}
        />
      </div>
      {showContent && (
        <>
        <div style={{ height: '100vh', background: '#1a1a1a',zIndex: 54, position: 'fixed', top: 0, right: 0,  }}>
          
          <StaggeredMenu
              position="right"
              items={menuItems}
              socialItems={socialItems}
              displaySocials={true}
              displayItemNumbering={true}
              menuButtonColor="#ffffffff"
              openMenuButtonColor="#000000ff"
              changeMenuColorOnOpen={true}
              colors={['#F08787','#FEE2AD']}
              logoUrl="/Logo.png"
              accentColor="#ff6b6b"
              onMenuOpen={() => console.log('Menu opened')}
              onMenuClose={() => console.log('Menu closed')} isFixed={true}          />
        </div>
          <div
            ref={contentRef}
            className="absolute inset-0 w-full h-full bg-[#27374D] flex gap-3 items-center justify-center"
            style={{ opacity: 0 }}
          >
            <div className="grid-overlay pointer-events-none absolute inset-0 z-10">
              <div className="grid-base absolute inset-0" />
              <div className="grid-fill absolute inset-0" />
              <div className="photo-circle-fade absolute inset-0 pointer-events-none z-30" />
            </div>
            <div className="flex flex-col p-[5em] gap-6 w-2/4 h-full z-40">
              <div className="w-full h-full p-4">
                <h1 id="firstname" className="absolute bottom-50 text-8xl text-white font-bold italic mb-4 z-53">HENDRA</h1><br />
                <h1 id="lastname" className="absolute bottom-25 text-8xl text-white font-bold italic mb-4 z-53">SUTRISNO</h1>
              </div>
              <div className="relative w-full h-[5px] bg-gray-200 rounded-full overflow-hidden z-53">
                <div
                  ref={lineFillRef}
                  className="absolute left-0 top-0 h-full bg-[#526D82] rounded-full"
                  style={{ width: 0 }}
                />
              </div>
            </div>
            <div className="w-2/4 h-full z-40">
                <Image
                  src="/picture.png"
                  alt="Logo"
                  width={700}
                  height={700}
                  className="object-cover w-full h-full rounded-md z-30"
                />
              </div>
          </div>
       
          <div className="w-full h-[100vh] bg-white flex items-center justify-center z-50">
            <h1 className="text-black text-4xl font-bold">Section 2</h1>
          </div>
          <div className="w-full h-[100vh] bg-[#FEE2AD] flex items-center justify-center z-50">
            <h1 className="text-black text-4xl font-bold">Section 3</h1>
          </div>
          <div className="w-full h-[100vh] bg-white flex items-center justify-center z-50">
            <h1 className="text-black text-4xl font-bold">Section 4</h1>
          </div>
          </>
        )}
      
    </>
  );
}

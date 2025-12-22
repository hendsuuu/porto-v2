"use client";

import { JSX, useLayoutEffect, useRef } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPhp,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiLaravel,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGithub,
  SiJenkins,
  SiFlask,
  SiPostman,
  SiFigma,
} from "react-icons/si";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type TechItem = {
  name: string;
  icon: JSX.Element;
};

type TechGroup = {
  title: string;
  items: TechItem[];
};

const techStacks: TechGroup[] = [
  {
    title: "Languages",
    items: [
      { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> },
      { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
      { name: "Python", icon: <SiPython color="#3776AB" /> },
      { name: "PHP", icon: <SiPhp color="#777BB4" /> },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React", icon: <SiReact color="#61DAFB" /> },
      { name: "Next.js", icon: <SiNextdotjs color="#ffffff" /> },
      { name: "Tailwind", icon: <SiTailwindcss color="#38BDF8" /> },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Laravel", icon: <SiLaravel color="#FF2D20" /> },
      { name: "Node.js", icon: <SiNodedotjs color="#339933" /> },
      { name: "Flask", icon: <SiFlask color="#000000" /> },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "MySQL", icon: <SiMysql color="#52abf0ff" /> },
      { name: "Postgres", icon: <SiPostgresql color="#4169E1" /> },
      { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Docker", icon: <SiDocker color="#2496ED" /> },
      { name: "GitHub", icon: <SiGithub color="#ffffff" /> },
      { name: "Jenkins", icon: <SiJenkins color="#D24939" /> },
      {name: "Postman", icon: <SiPostman color="#FF6C37" /> },
      {name:"Figma", icon: <SiFigma color="#ffffffff" /> },
    ],
  },
];
export default function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".tech-row");

      gsap.fromTo(
        rows,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            scrub: true,
            toggleActions: "play none none reverse",
            // markers: true, // <-- nyalakan buat debug kalau perlu
          },
        }
      );

      // Pastikan ScrollTrigger hitung ulang layout (kadang perlu di Next)
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-6xl mx-auto px-4 py-10 lg:py-2 text-white">
      <div className="border border-white/20 rounded-xl overflow-hidden">
        {techStacks.map((group, idx) => (
          <div
            key={group.title}
            className={`tech-row grid grid-cols-1 md:grid-cols-4 gap-4 p-3 lg:p-6
              ${idx !== techStacks.length - 1 ? "border-b border-white/20" : ""}
            `}>
            {/* Title column */}
            <div className="font-medium text-xs sm:text-sm md:text-lg text-white/70">
              {group.title}
            </div>

            {/* Icons column */}
            <div
              className="
                  z-53
                  md:col-span-3
                  flex md:grid
                  flex-nowrap md:flex-none
                  gap-2 md:gap-4
                  overflow-x-auto md:overflow-visible
                  pb-1
                  md:grid-cols-4 lg:grid-cols-6
                ">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="
                    group shrink-0 cursor-pointer select-none
                    relative z-54
                    flex flex-col items-center justify-center
                    gap-0.5
                    px-2 py-1.5 md:p-4
                    rounded-md
                    border border-white/10
                    bg-white/5 backdrop-blur
                    transition-all duration-200
                    hover:bg-white/12 hover:border-white/30 hover:-translate-y-0.5
                    hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                    active:scale-[0.98]
                  ">
                  {/* ICON */}
                  <div className="text-base sm:text-lg md:text-3xl">
                    {item.icon}
                  </div>
                  <span className="text-[8px] sm:text-[11px] md:text-sm text-white/60 group-hover:text-white">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

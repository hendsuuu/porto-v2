import SkillSection from "../pages/SkillSection";
import BongoCat from "@/components/BongoCat";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GitHubContributions from "../../components/GitHubContributions";
import GitHubLanguageRadar from "@/components/GitHubLanguageRadar";
import ScrollFloat from "@/components/ScrollFloat";

export default function Stacker() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll<HTMLElement>(".section");
    if (!cards.length) return;

    const animation = gsap.timeline();
    const cardHeight = cards[0].offsetHeight;

    cards.forEach((card, index) => {
      if (index > 0) {
        gsap.set(card, { y: index * cardHeight });
        animation.to(card, { y: 0, duration: index * 0.5, ease: "none" }, 0);
      }
    });

    ScrollTrigger.create({
      trigger: "#stacker",
      start: "top top",
      pin: true,
      end: `+=${cards.length * cardHeight}`,
      scrub: true,
      animation,
      markers: false,
      invalidateOnRefresh: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div id="stacker" className=" relative w-full min-h-screen">
      <section
        id="about"
        className="section about absolute inset-0 min-h-screen flex bg-[#526D82]">
        <div className="absolute h-full">
          <div className="hidden lg:block relative left-20 w-[5px] h-full bg-gray-200 overflow-hidden z-53">
            <div
              className="absolute left-0 top-0 h-full bg-[#526D82] rounded-full"
              style={{ height: 0 }}
            />
          </div>
        </div>
        <div className="header w-full flex flex-col">
          <h2 className="text-[30px] pt-20 lg:pt-10 lg:text-[60px] font-bold text-white mb-4 text-center lg:text-left ml-0 lg:ml-32">
            ABOUT ME
          </h2>
          <div className="relative w-full h-[5px] bg-gray-200 rounded-full overflow-hidden z-53 px-4">
            <div
              className="absolute left-0 top-0 h-full bg-[#526D82] rounded-full"
              style={{ width: 0 }}
            />
          </div>
          <div className="w-full flex flex-col lg:flex-row lg:p-4">
            <div className="w-full h-[150px] lg:h-full lg:w-1/2 flex justify-center -ml-10 mt-18 lg:mt-0 lg:ml-32 items-center">
              {/* <BongoCat /> */}
            </div>

            <div className="w-full lg:w-1/2 p-4">
              <p className="p-4 mb-4 lg:p-0 lg:text-2xl text-justify text-white">
                Hello! I’m Hendra Sutrisno, a Web Developer with strong experience in building scalable,
                maintainable, and user-focused web applications. I specialize in
                full-stack web development using Laravel for backend systems and
                React / Next.js for modern, responsive frontend interfaces.
              </p>
              <p className="p-4 mb-4 lg:p-0 lg:text-2xl text-justify text-white">
                My work is driven by real-world problem solving and continuous
                improvement. I’ve been actively involved in developing,
                maintaining, and optimizing production-level
                applications—covering feature development, system maintenance,
                database optimization, and deployment workflows to ensure
                reliability and performance. In addition to web development, I
                have a strong interest in data analytics. I enjoy working with
                data to uncover insights, build meaningful dashboards, and
                support decision-making. This perspective allows me to design
                web applications that are not only functional, but also
                data-aware, enabling better monitoring, reporting, and business
                intelligence.
                
              </p>
              <p className="p-4 lg:p-0 lg:text-2xl text-justify text-white">
                I’m always eager to learn new technologies, refine best
                practices, and collaborate on impactful digital products.
                <br />
                <strong>
                  Im Open to new opportunities and collaborations—feel free to
                  reach out! 🚀{" "}
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="skill"
        className="section skill relative lg:absolute w-full lg:inset-0 lg:min-h-screen flex bg-[#526D82] z-54">
        <div className="absolute h-full">
          <div className="hidden lg:block relative left-20 w-[5px] h-full bg-gray-200 overflow-hidden z-53">
            <div
              className="absolute left-0 top-0 h-full bg-[#526D82] rounded-full"
              style={{ height: 0 }}
            />
          </div>
        </div>
        <div className="header w-full flex flex-col">
          <h2 className="text-[30px] pt-20 lg:pt-10 lg:text-[60px] font-bold text-white mb-4 text-center lg:text-left ml-0 lg:ml-32">
            TECH STACK
          </h2>
          <div className="relative w-full h-[5px] bg-gray-200 rounded-full overflow-hidden z-53 px-4">
            <div
              className="absolute left-0 top-0 h-full bg-[#526D82] rounded-full"
              style={{ width: 0 }}
            />
          </div>
          <div className="w-full flex flex-col lg:flex-row lg:p-4">
            <div className="w-full lg:w-1/2 flex justify-center lg:ml-24 items-center">
              <SkillSection />
            </div>
            <div className="w-full lg:flex lg:w-1/2 flex-col justify-center lg:px-5 lg:ml-10 items-center">
              {/* <WakaTimeStats/> */}
              {/* <GitHubCalendar username="hendsuuu" /> */}
              <GitHubContributions />
              <GitHubLanguageRadar />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

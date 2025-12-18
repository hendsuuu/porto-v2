import AboutSection from "../pages/AboutSection";
import SkillSection from "../pages/SkillSection";
import BongoCat from "@/components/BongoCat";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Stacker() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const cards = document.querySelectorAll<HTMLElement>('.section');
        if (!cards.length) return;

        const animation = gsap.timeline();
        const cardHeight = cards[0].offsetHeight;

        cards.forEach((card, index) => {
            if (index > 0) {
            gsap.set(card, { y: index * cardHeight });
            animation.to(
                card,
                { y: 0, duration: index * 0.5, ease: "none" },
                0
            );
            }
        });

        ScrollTrigger.create({
            trigger: "#stacker",
            start: "top top",
            pin: true,
            end: `+=${(cards.length * cardHeight)}`,
            scrub: true,
            animation,
            markers: false,
            invalidateOnRefresh: true,
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

  return (  
    <div id="stacker" className=" relative w-full min-h-screen">
            <section id="about" className="section about absolute w-[100vw] min-h-screen flex bg-[#526D82]" >
                <div className="absolute h-full">
                    <div className="hidden lg:block relative left-20 w-[5px] h-full bg-gray-200 overflow-hidden z-53">
                        <div
                            className="absolute left-0 top-0 h-full bg-[#526D82] rounded-full"
                            style={{ height: 0 }}
                        />
                    </div>
                </div>
                <div className="header w-full flex flex-col pt-10 px">
                    <h2 className="text-[30px] lg:text-[60px] font-bold text-white mb-4 text-center lg:text-left ml-0 lg:ml-32">
                        ABOUT ME
                    </h2>
                    <div className="relative w-full h-[5px] bg-gray-200 rounded-full overflow-hidden z-53 px-4">
                        <div
                            className="absolute left-0 top-0 h-full bg-[#526D82] rounded-full"
                            style={{ width: 0 }}
                        />
                    </div>
                    <div className="w-full flex flex-col lg:flex-row lg:p-4">
                        <div className="w-full h-[190px] lg:h-full lg:w-1/2 flex justify-center -ml-10 mt-12 lg:ml-32 items-center">
                            {/* <BongoCat /> */}
                        </div>

                        <div className="w-full lg:w-1/2 p-4">
                            <p className="p-4 lg:text-2xl text-justify text-white">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid unde dolores amet soluta nihil corporis voluptate cum tempore quas ullam, blanditiis fugit culpa officia, delectus rem cumque. Adipisci, repudiandae explicabo.
                            </p>
                            <p className="p-4 lg:text-2xl text-justify text-white">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae consequuntur molestias aut, vel dolor facere odit repellat quos voluptates incidunt mollitia amet adipisci, sequi tenetur eius exercitationem fuga eveniet culpa.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="skill" className="section skill absolute w-[100vw] min-h-screen flex bg-[#526D82] z-54" >
                <div className="absolute h-full">
                    <div className="hidden lg:block relative left-20 w-[5px] h-full bg-gray-200 overflow-hidden z-53">
                        <div
                            className="absolute left-0 top-0 h-full bg-[#526D82] rounded-full"
                            style={{ height: 0 }}
                        />
                    </div>
                </div>
                <div className="header w-full flex flex-col pt-10 px">
                    <h2 className="text-[30px] lg:text-[60px] font-bold text-white mb-4 text-center lg:text-left ml-0 lg:ml-32">
                        TECH STACK
                    </h2>
                    <div className="relative w-full h-[5px] bg-gray-200 rounded-full overflow-hidden z-53 px-4">
                        <div
                            className="absolute left-0 top-0 h-full bg-[#526D82] rounded-full"
                            style={{ width: 0 }}
                        />
                    </div>
                    <div className="w-full flex flex-col lg:flex-row lg:p-4">
                        <div className="w-1/2 flex justify-center ml-32 items-center">
                            
                        </div>

                        <div className="w-full lg:w-1/2 p-4">
                            <p className="p-4 lg:text-2xl text-justify text-white">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid unde dolores amet soluta nihil corporis voluptate cum tempore quas ullam, blanditiis fugit culpa officia, delectus rem cumque. Adipisci, repudiandae explicabo.
                            </p>
                            <p className="p-4 lg:text-2xl text-justify text-white">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae consequuntur molestias aut, vel dolor facere odit repellat quos voluptates incidunt mollitia amet adipisci, sequi tenetur eius exercitationem fuga eveniet culpa.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="skill" className="section skill absolute w-[100vw] min-h-screen flex bg-[#526D82] z-55" >
                <div className="absolute h-full">
                    <div className="relative left-20 w-[5px] h-full bg-gray-200 overflow-hidden z-53">
                        <div
                            className="absolute left-0 top-0 h-full bg-[#526D82] rounded-full"
                            style={{ height: 0 }}
                        />
                    </div>
                </div>
                <div className="header w-full flex flex-col pt-10 px">
                    <h2 className="text-[60px] font-bold text-white mb-4 ml-32">
                        PROJECTS
                    </h2>
                    <div className="relative w-full h-[5px] bg-gray-200 rounded-full overflow-hidden z-53 px-4">
                        <div
                            className="absolute left-0 top-0 h-full bg-[#526D82] rounded-full"
                            style={{ width: 0 }}
                        />
                    </div>
                    <div className="w-full flex p-4">
                        <div className="w-1/2 flex justify-center ml-32 items-center">
                            
                        </div>

                        <div className="w-1/2 p-4">
                            <p className="text-2xl text-justify text-white">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid unde dolores amet soluta nihil corporis voluptate cum tempore quas ullam, blanditiis fugit culpa officia, delectus rem cumque. Adipisci, repudiandae explicabo.
                            </p>
                            <p className="text-2xl text-justify text-white">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae consequuntur molestias aut, vel dolor facere odit repellat quos voluptates incidunt mollitia amet adipisci, sequi tenetur eius exercitationem fuga eveniet culpa.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
          </div>
  );
}
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SkillSection() {
  return (
    <section
      
      className="w-full min-h-screen flex bg-[#27374D]" >
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
                TECH STACK
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
  );
}

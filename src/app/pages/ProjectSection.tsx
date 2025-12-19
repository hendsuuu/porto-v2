export default function ProjectSection() {
    return (
        <section
        className="section absolute inset-0 min-h-screen flex bg-[#526D82] z-55">
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
            PROJECTS
          </h2>
          <div className="relative w-full h-[5px] bg-gray-200 rounded-full overflow-hidden z-53 px-4">
            <div
              className="absolute left-0 top-0 h-full bg-[#526D82] rounded-full"
              style={{ width: 0 }}
            />
          </div>
          <div className="w-full flex flex-col lg:flex-row lg:p-4">
            <div className="w-1/2 flex justify-center ml-32 items-center"></div>

            <div className="w-full lg:w-1/2 p-4">
              <p className="p-4 lg:text-2xl text-justify text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                unde dolores amet soluta nihil corporis voluptate cum tempore
                quas ullam, blanditiis fugit culpa officia, delectus rem cumque.
                Adipisci, repudiandae explicabo.
              </p>
              <p className="p-4 lg:text-2xl text-justify text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae consequuntur molestias aut, vel dolor facere odit
                repellat quos voluptates incidunt mollitia amet adipisci, sequi
                tenetur eius exercitationem fuga eveniet culpa.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
}
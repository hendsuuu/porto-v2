import Link from "next/link";

type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
};

const projects: Project[] = [
  {
    slug: "qip-dashboard",
    title: "QIP Dashboard",
    description: "Internal quality improvement dashboard for monitoring production metrics.",
    tech: ["Laravel", "MySQL", "Chart.js"],
  },
  {
    slug: "Competition-Landscape-Filament",
    title: "Competition Landscape Filament",
    description: "Visual analytics for GitHub contributions and language usage.",
    tech: ["Laravel", "Filament", "PHP"],
  },
  {
    slug: "ml-tomato-classification",
    title: "Tomato Classification",
    description: "Image classification model to detect tomato ripeness and quality.",
    tech: ["TensorFlow", "CNN", "Streamlit"],
  },
  {
    slug: "Telegram-Bot Java",
    title: "Telegram Bot Java",
    description: "A Java-based Telegram bot for automating tasks and interactions.",
    tech: ["Java", "Telegram API"],
  },
  {
    slug: "Product Category Classification",
    title: "Product Category Classification",
    description: "Machine learning model to classify products into categories based on shopping receipt.",
    tech: ["Python", "Flask", "TensorFlow"],
  },
  {
    slug: "Air Classification",
    title: "Air Classification",
    description: "A machine learning model to classify air quality levels using sensor data.",
    tech: ["TensorFlow", "Python", "Streamlit"],
  },
];
export default function ProjectSection() {
  return (
    <section
      id="projects"
      className="projects relative lg:absolute w-full lg:inset-0 lg:min-h-screen flex bg-[#526D82] z-54">
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
        <div className="grid gap-8 pl-12 lg:pl-32 pt-10 pr-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="bg-white/10 backdrop-blur rounded-xl p-6 flex flex-col justify-between hover:scale-[1.02] transition"
          >
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {project.title}
              </h3>

              <p className="text-sm text-white/80 mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-white/20 text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="mt-auto inline-flex justify-center items-center rounded-lg bg-white text-[#526D82] px-4 py-2 text-sm font-semibold hover:bg-white/90 transition"
            >
              View Detail →
            </Link>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

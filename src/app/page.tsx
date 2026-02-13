import Hero from "@/components/section/Hero";
import About from "@/components/section/About";
import Projects from "@/components/section/Projects";
import FAQ from "@/components/section/FAQ";
import Contact from "@/components/section/Contact";
import Footer from "@/components/section/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[color:var(--bg-secondary)]" />
      <About />
      <Projects />
      <FAQ />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}

import BackToTop from "./components/BackToTop";
import CertificationsSection from "./components/CertificationsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProcessSection from "./components/ProcessSection";
import ProjectsSection from "./components/ProjectsSection";
import ServicesSection from "./components/ServicesSection";
import SkillsSection from "./components/SkillsSection";
import TeamSection from "./components/TeamSection";

export default function App() {
  return (
    <>
      <a
        href="#services"
        className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <TeamSection />
        <SkillsSection />
        <CertificationsSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

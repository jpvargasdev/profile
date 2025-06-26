
import { useEffect, useState } from "react";
import { MinimalNav } from "../components/MinimalNav";
import { HeroSection } from "../components/HeroSection";
import { NowSection } from "../components/NowSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { LabSection } from "../components/LabSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { TechRadarSection } from "../components/TechRadarSection";
import { ImpossibleSection } from "../components/ImpossibleSection";
import { ContactSection } from "../components/ContactSection";
import { DetailOverlay } from "../components/DetailOverlay";
import { Project, Experience } from "../types";

type OverlayContent = Project | Experience;
type OverlayType = 'project' | 'experience';

const Index = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [overlayContent, setOverlayContent] = useState<OverlayContent | null>(null);
  const [overlayType, setOverlayType] = useState<OverlayType | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "now", "projects", "lab", "experience", "tech-radar", "impossible", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openOverlay = (content: OverlayContent, type: OverlayType) => {
    setOverlayContent(content);
    setOverlayType(type);
  };

  const closeOverlay = () => {
    setOverlayContent(null);
    setOverlayType(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Top Navigation for all screen sizes */}
      <MinimalNav activeSection={activeSection} onNavigate={scrollToSection} />
      
      <main>
        <HeroSection />
        
        <div className="max-w-6xl mx-auto px-6 space-y-32">
          <NowSection />
          <ProjectsSection onItemClick={(project) => openOverlay(project, 'project')} />
          <LabSection />
          <ExperienceSection onItemClick={(experience) => openOverlay(experience, 'experience')} />
          <TechRadarSection />
          <ImpossibleSection />
          <ContactSection />
        </div>
      </main>

      <DetailOverlay 
        content={overlayContent}
        type={overlayType}
        isOpen={!!overlayContent}
        onClose={closeOverlay}
      />
    </div>
  );
};

export default Index;

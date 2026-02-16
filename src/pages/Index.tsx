
import { useEffect, useState } from "react";
import { MinimalNav } from "../components/MinimalNav";
import { HeroSection } from "../components/HeroSection";
import { NowSection } from "../components/NowSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { LabSection } from "../components/LabSection";
import { ExperienceSection } from "../components/ExperienceSection";
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
      const sections = ["about", "now", "projects", "lab", "experience", "impossible", "contact"];
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
        <div className="max-w-6xl mx-auto px-6">
          <HeroSection />
          <div className="border-t border-gray-200/50 dark:border-gray-800/50"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 divide-y divide-gray-200/50 dark:divide-gray-800/50">
          <div className="py-6">
            <ExperienceSection onItemClick={(experience) => openOverlay(experience, 'experience')} />
          </div>
          <div className="py-6">
            <NowSection />
          </div>
          <div className="py-6">
            <ProjectsSection onItemClick={(project) => openOverlay(project, 'project')} />
          </div>
          <div className="py-6">
            <LabSection />
          </div>
          <div className="py-6">
            <ImpossibleSection />
          </div>
          <div className="py-6">
            <ContactSection />
          </div>
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

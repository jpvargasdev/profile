
import { useEffect, useState } from "react";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { ProjectsSection } from "../components/ProjectsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { HobbiesSection } from "../components/HobbiesSection";
import { ImpossibleSection } from "../components/ImpossibleSection";
import { ContactSection } from "../components/ContactSection";
import { DetailOverlay } from "../components/DetailOverlay";
import { Project, Experience, Hobby } from "../types";

type OverlayContent = Project | Experience | Hobby;
type OverlayType = 'project' | 'experience' | 'hobby';

const Index = () => {
  const [activeSection, setActiveSection] = useState("projects");
  const [overlayContent, setOverlayContent] = useState<OverlayContent | null>(null);
  const [overlayType, setOverlayType] = useState<OverlayType | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["projects", "experience", "hobbies", "impossible", "contact"];
      const scrollPosition = window.scrollY + 100;

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        {/* Fixed Left Sidebar */}
        <ProfileSidebar 
          activeSection={activeSection} 
          onNavigate={scrollToSection} 
        />
        
        {/* Scrollable Center Content - Now Full Width */}
        <div className="flex-1 ml-80 min-h-screen">
          <main className="max-w-6xl mx-auto py-12 px-8">
            <ProjectsSection onItemClick={(project) => openOverlay(project, 'project')} />
            <ExperienceSection onItemClick={(experience) => openOverlay(experience, 'experience')} />
            <HobbiesSection onItemClick={(hobby) => openOverlay(hobby, 'hobby')} />
            <ImpossibleSection />
            <ContactSection />
          </main>
        </div>
      </div>

      {/* Detail Overlay */}
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

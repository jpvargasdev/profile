
import { useEffect, useState } from "react";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { ProjectsSection } from "../components/ProjectsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { HobbiesSection } from "../components/HobbiesSection";
import { ImpossibleSection } from "../components/ImpossibleSection";
import { ContactSection } from "../components/ContactSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("projects");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        {/* Fixed Left Sidebar */}
        <ProfileSidebar 
          activeSection={activeSection} 
          onNavigate={scrollToSection} 
        />
        
        {/* Scrollable Center Content */}
        <div className="flex-1 ml-80 min-h-screen">
          <main className="max-w-4xl mx-auto py-12 px-8">
            <ProjectsSection />
            <ExperienceSection />
            <HobbiesSection />
            <ImpossibleSection />
            <ContactSection />
          </main>
        </div>
        
        {/* Optional Right Panel - Reserved for future use */}
        <div className="w-80 hidden xl:block bg-white/50 backdrop-blur-sm border-l border-slate-200">
          <div className="p-8">
            <div className="text-slate-400 text-sm font-medium">Detail View</div>
            <div className="mt-4 text-slate-500 text-sm">
              This panel will show contextual details when you select projects or experiences.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

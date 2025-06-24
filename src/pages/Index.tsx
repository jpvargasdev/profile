
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
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
      <div className="flex relative">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 left-4 z-50 lg:hidden bg-white/80 backdrop-blur-xl border border-slate-200 rounded-lg p-2 shadow-sm hover:bg-white transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar - Desktop Fixed, Mobile Overlay */}
        <div className={`
          fixed top-0 left-0 h-screen w-80 bg-white/80 backdrop-blur-xl border-r border-slate-200 z-40 transition-transform duration-300
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}>
          <ProfileSidebar 
            activeSection={activeSection} 
            onNavigate={scrollToSection} 
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 lg:ml-80 min-h-screen">
          <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 pt-16 lg:pt-12">
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

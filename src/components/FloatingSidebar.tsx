
import { Github, Linkedin, Mail } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface FloatingSidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const FloatingSidebar = ({ activeSection, onNavigate }: FloatingSidebarProps) => {
  const navigationItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "impossible", label: "Goals" },
    { id: "contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/jpvargasdev", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/jp-vargasm/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:vargasm.jp@gmail.com", label: "Email" },
  ];

  return (
    <aside className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center space-y-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/20 dark:border-gray-700/20 transition-all duration-300 hover:shadow-xl">
      {/* Profile Section */}
      <div className="text-center space-y-4">
        <Avatar className="w-16 h-16 mx-auto ring-2 ring-gray-200 dark:ring-gray-700 transition-all duration-300 hover:ring-4 hover:ring-blue-200 dark:hover:ring-blue-800">
          <AvatarImage 
            src="/placeholder.svg" 
            alt="Profile"
            className="object-cover"
          />
          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold text-lg">
            JD
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm">Juan Vargas</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">Software Engineer</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:scale-105 ${
              activeSection === item.id
                ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => window.location.href = '/blog'}
          className="px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:scale-105 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Blog
        </button>
      </nav>

      {/* Social Links */}
      <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            aria-label={social.label}
          >
            <social.icon size={18} />
          </a>
        ))}
      </div>
    </aside>
  );
};

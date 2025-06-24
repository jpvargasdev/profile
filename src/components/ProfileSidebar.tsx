
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

interface ProfileSidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const ProfileSidebar = ({ activeSection, onNavigate }: ProfileSidebarProps) => {
  const navigationItems = [
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "hobbies", label: "Hobbies" },
    { id: "impossible", label: "Impossible List" },
    { id: "contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
  ];

  return (
    <div className="h-full p-4 sm:p-6 lg:p-8 flex flex-col overflow-y-auto">
      {/* Profile Section */}
      <div className="text-center mb-6 lg:mb-8">
        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto mb-4 lg:mb-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1">
          <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-600">
            JD
          </div>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">John Doe</h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed px-2">
          Full-stack developer passionate about creating beautiful, functional web experiences. 
          Specialized in React, TypeScript, and modern web technologies.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mb-6">
        <ul className="space-y-1 sm:space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Social Links */}
      <div className="pt-4 sm:pt-6 border-t border-slate-200">
        <div className="flex justify-center space-x-3 sm:space-x-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-200 text-slate-600 hover:text-slate-900 touch-manipulation"
              aria-label={social.label}
            >
              <social.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

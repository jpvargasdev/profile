
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
    <div className="fixed left-0 top-0 h-screen w-80 bg-white/80 backdrop-blur-xl border-r border-slate-200 p-8 flex flex-col">
      {/* Profile Section */}
      <div className="text-center mb-8">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1">
          <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center text-4xl font-bold text-slate-600">
            JD
          </div>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">John Doe</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Full-stack developer passionate about creating beautiful, functional web experiences. 
          Specialized in React, TypeScript, and modern web technologies.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
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
      <div className="pt-6 border-t border-slate-200">
        <div className="flex justify-center space-x-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-200 text-slate-600 hover:text-slate-900"
              aria-label={social.label}
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

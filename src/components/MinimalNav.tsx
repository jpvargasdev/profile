
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { DeepModeToggle } from "./DeepModeToggle";
import { Link, useLocation } from "react-router-dom";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";

interface MinimalNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const MinimalNav = ({ activeSection, onNavigate }: MinimalNavProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const navigationItems = [
    { id: "contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/jpvargasdev", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/jp-vargasm/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:vargasm.jp@gmail.com", label: "Email" },
  ];

  const handleMobileNavClick = (action: () => void) => {
    action();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-700/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {!isHomePage && (
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white btn-press"
            >
              Home
            </Link>
          )}
          {isHomePage && navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 btn-press ${
                activeSection === item.id
                  ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
          {!isHomePage && navigationItems.map((item) => (
            <Link
              key={item.id}
              to={`/#${item.id}`}
              className="px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white btn-press"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/blog"
            className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 btn-press ${
              location.pathname.startsWith('/blog')
                ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Blog
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Right Side Items */}
        <div className="flex items-center space-x-2">
          {/* Social Links - hidden on mobile to save space */}
          <div className="hidden md:flex items-center space-x-1">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg btn-press"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
          <DeepModeToggle />
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-700/20">
          <div className="max-w-6xl mx-auto px-6 py-4 space-y-2">
            {!isHomePage && (
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Home
              </Link>
            )}
            {isHomePage && navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMobileNavClick(() => onNavigate(item.id))}
                className={`block w-full text-left px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  activeSection === item.id
                    ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
            {!isHomePage && navigationItems.map((item) => (
              <Link
                key={item.id}
                to={`/#${item.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${
                location.pathname.startsWith('/blog')
                  ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Blog
            </Link>
            
            {/* Mobile Social Links */}
            <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

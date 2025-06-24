
import { ThemeToggle } from "./ThemeToggle";
import { Link, useLocation } from "react-router-dom";

interface MinimalNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const MinimalNav = ({ activeSection, onNavigate }: MinimalNavProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const navigationItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "impossible", label: "Goals" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-700/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {isHomePage ? (
            navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  activeSection === item.id
                    ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))
          ) : (
            <>
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Home
              </Link>
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/#${item.id}`}
                  className="px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </>
          )}
          <Link
            to="/blog"
            className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 ${
              location.pathname === '/blog'
                ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Blog
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

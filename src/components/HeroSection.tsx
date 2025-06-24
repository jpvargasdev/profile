
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

export const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
  ];

  return (
    <section 
      id="about" 
      className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-6">
          {/* Profile Photo */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-600 dark:text-gray-300 overflow-hidden">
                  {/* Replace with actual photo when available */}
                  <img 
                    src="/placeholder.svg" 
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      const imgElement = e.currentTarget;
                      const fallbackElement = imgElement.nextElementSibling as HTMLElement;
                      imgElement.style.display = 'none';
                      if (fallbackElement) {
                        fallbackElement.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-600 dark:text-gray-300" style={{display: 'none'}}>
                    JD
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`,
                opacity: Math.max(0, 1 - scrollY / 500),
              }}
            >
              John Doe
            </h1>
            <p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto leading-relaxed"
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
                opacity: Math.max(0, 1 - scrollY / 600),
              }}
            >
              Full-stack developer passionate about creating beautiful, functional web experiences with modern technologies.
            </p>
          </div>
        </div>
        
        <div 
          className="flex justify-center space-x-6 pt-8"
          style={{
            transform: `translateY(${scrollY * 0.02}px)`,
            opacity: Math.max(0, 1 - scrollY / 700),
          }}
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-full"
              aria-label={social.label}
            >
              <social.icon size={24} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

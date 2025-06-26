
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
      {/* Enhanced Parallax Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-800"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />
      
      {/* Secondary parallax layer for depth */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-50/20 to-transparent dark:via-purple-900/10"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 pt-20">
        <div className="space-y-6">
          {/* Enhanced Profile Photo */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              {/* Gradient ring with hover effect */}
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 p-1 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-blue-500/25">
                {/* Inner shadow ring */}
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 p-1 shadow-inner">
                  <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-600 dark:text-gray-300 overflow-hidden relative">
                    <img 
                      src="/profile.png" 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-full transition-all duration-500 group-hover:scale-105"
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
                      JV
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating animation ring */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-300/50 dark:border-blue-600/50 animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight transition-all duration-700"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`,
                opacity: Math.max(0, 1 - scrollY / 500),
              }}
            >
              Juan Vargas
            </h1>
            <p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto leading-relaxed transition-all duration-700"
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
                opacity: Math.max(0, 1 - scrollY / 600),
              }}
            >
              <strong>I build smart things that learn and move.</strong> <br />
              Senior AI Engineer, Indie Hacker, and Maker blending deep learning, full-stack development, and hardware design. I turn complex ideas into elegant software and intelligent devices — from neural networks to microcontrollers, from prototypes to products.
            </p>
          </div>
        </div>
        
        {/* Social links - visible on mobile since they're hidden in nav */}
        <div 
          className="flex justify-center space-x-6 pt-8 md:hidden"
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
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-full hover:shadow-lg"
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

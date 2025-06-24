
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export const HeroSection = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight">
            John Doe
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Full-stack developer passionate about creating beautiful, functional web experiences with modern technologies.
          </p>
        </div>
        
        <div className="flex justify-center space-x-6 pt-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110"
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

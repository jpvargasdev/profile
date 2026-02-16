
export const ContactSection = () => {
  return (
    <section id="contact" className="">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Get in touch</h2>
        
        <div className="space-y-4">
          <p className="text-base text-gray-700 dark:text-gray-300">
            If you have a project in mind or just want to connect, email me at:
          </p>
          
          <p className="text-base">
            <a 
              href="mailto:vargasm.jp@gmail.com" 
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              vargasm.jp@gmail.com
            </a>
          </p>
          
          <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400 pt-2">
            <a 
              href="https://linkedin.com/in/juanfervargas" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              LinkedIn
            </a>
            <span>·</span>
            <a 
              href="https://github.com/juanfervargas" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

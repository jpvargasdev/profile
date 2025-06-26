
import { Terminal, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export const DeepModeToggle = () => {
  const [isDeepMode, setIsDeepMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('deepMode');
    if (savedMode === 'true') {
      setIsDeepMode(true);
      document.documentElement.classList.add('deep-mode');
    }
  }, []);

  const toggleDeepMode = () => {
    const newMode = !isDeepMode;
    setIsDeepMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('deep-mode');
      localStorage.setItem('deepMode', 'true');
    } else {
      document.documentElement.classList.remove('deep-mode');
      localStorage.setItem('deepMode', 'false');
    }
  };

  return (
    <button
      onClick={toggleDeepMode}
      className={`relative p-2 rounded-full transition-all duration-500 group ${
        isDeepMode 
          ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/20' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
      }`}
      aria-label="Toggle Deep Mode"
      title={isDeepMode ? "Exit Deep Mode" : "Enter Deep Mode"}
    >
      <div className="relative w-5 h-5">
        <Terminal 
          size={20} 
          className={`absolute inset-0 transition-all duration-500 ${
            isDeepMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-0'
          }`}
        />
        <Sparkles 
          size={20} 
          className={`absolute inset-0 transition-all duration-500 ${
            isDeepMode ? 'opacity-0 -rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
      </div>
      
      {/* Glowing effect in deep mode */}
      {isDeepMode && (
        <div className="absolute inset-0 rounded-full border border-green-400/50 animate-pulse" />
      )}
    </button>
  );
};

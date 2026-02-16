export const HeroSection = () => {

  return (
    <section 
      id="about" 
      className="relative px-6 py-12 md:py-16 overflow-hidden bg-white dark:bg-gray-900"
    >
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto pt-12 md:pt-14 pb-2">
        {/* Picture + Description Side by Side */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-4">
          {/* Animated Profile Photo */}
          <div className="flex-shrink-0">
            <div className="relative">
              {/* Main profile container */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden">
                <img 
                  src={`${import.meta.env.BASE_URL}profile.jpg`}
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const imgElement = e.currentTarget;
                    const container = imgElement.parentElement;
                    if (container) {
                      container.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-4xl font-bold text-gray-600 dark:text-gray-300">JV</div>';
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Description with Name and Title */}
          <div className="flex-1 text-center md:text-left space-y-1">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              Juan Vargas
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mt-1">
              Mechatronics Engineer
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400 font-light leading-relaxed">
              Focused on AI-driven products and autonomous systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

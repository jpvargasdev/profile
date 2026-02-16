
export const NowSection = () => {
  const nowItems = [
    {
      label: "Location",
      value: "Stockholm, Sweden"
    },
    {
      label: "Building",
      value: "Guilliman AI, Field recording setup, SJ Led Screen"
    },
    {
      label: "Learning",
      value: "Software Architecture, System Design"
    },
    {
      label: "Reading",
      value: "Building Microservices - Designing Fine-Grained Systems"
    }
  ];

  return (
    <section id="now" className="">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            What I'm up to now
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Last updated: February 2026 • Inspired by{" "}
            <a 
              href="https://nownownow.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-blue-500 transition-colors"
            >
              nownownow.com
            </a>
          </p>
        </div>

        <div className="space-y-2">
          {nowItems.map((item) => (
            <div key={item.label} className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide min-w-[80px]">
                {item.label}
              </span>
              <span className="text-base text-gray-900 dark:text-white">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

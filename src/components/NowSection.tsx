
import { MapPin, Wrench, Brain, BookOpen } from "lucide-react";

export const NowSection = () => {
  const nowItems = [
    {
      icon: MapPin,
      label: "Living in",
      value: "Stockholm, Sweden",
      color: "text-red-500"
    },
    {
      icon: Wrench,
      label: "Building",
      value: "Guilliman AI, Autonomous drones",
      color: "text-purple-500"
    },
    {
      icon: Brain,
      label: "Learning",
      value: "Reinforcement Learning, Machine learning algorithms, Embedded Systems",
      color: "text-blue-500"
    },
    {
      icon: BookOpen,
      label: "Reading",
      value: "Designing Machine Learning Systems",
      color: "text-green-500"
    }
  ];

  return (
    <section id="now" className="py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What I'm up to now
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            A glimpse into my current focus and interests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nowItems.map((item, index) => (
            <div
              key={item.label}
              className="group p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start space-x-4">
                <div className={`${item.color} transition-transform duration-300 group-hover:scale-110`}>
                  <item.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {item.label}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Last updated: June 2025 • Inspired by{" "}
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
      </div>
    </section>
  );
};

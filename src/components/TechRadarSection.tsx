
import { useState } from "react";

export const TechRadarSection = () => {
  const [activeQuadrant, setActiveQuadrant] = useState<string | null>(null);

  const techRadar = {
    adopt: [
      "TypeScript", "Python", "Go", "Docker", "GCP", "AWS", "Kubernetes", "Terraform", "Github Actions", "PyTorch", "PostgreSQL"
    ],
    trial: [
      "R", "WebAssembly", "TensorFlow", "PyTorch", "C"
    ],
    assess: [
      "Svelte", "Deno", "Edge Computing", "Quantum ML", "WebRTC"
    ],
    hold: [
      "jQuery", "PHP", "MySQL", "Webpack"
    ]
  };

  const quadrants = [
    {
      key: "adopt" as keyof typeof techRadar,
      title: "Adopt",
      description: "Daily use, battle-tested",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800"
    },
    {
      key: "trial" as keyof typeof techRadar,
      title: "Trial",
      description: "Learning and experimenting",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      key: "assess" as keyof typeof techRadar,
      title: "Assess",
      description: "Curious and watching",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-800"
    },
    {
      key: "hold" as keyof typeof techRadar,
      title: "Hold",
      description: "Phasing out or avoiding",
      color: "from-gray-400 to-slate-500",
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
      borderColor: "border-gray-200 dark:border-gray-800"
    }
  ];

  return (
    <section id="tech-radar" className="py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tech Radar
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            My technology landscape mapped by adoption stage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quadrants.map((quadrant) => (
            <div
              key={quadrant.key}
              className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${quadrant.bgColor} ${quadrant.borderColor} ${
                activeQuadrant === quadrant.key ? 'scale-105 shadow-lg' : 'hover:scale-102 hover:shadow-md'
              }`}
              onMouseEnter={() => setActiveQuadrant(quadrant.key)}
              onMouseLeave={() => setActiveQuadrant(null)}
            >
              <div className="mb-4">
                <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${quadrant.color} text-white font-medium mb-2`}>
                  {quadrant.title}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {quadrant.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {techRadar[quadrant.key].map((tech, index) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 text-sm rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:scale-105 hover:shadow-sm ${
                      activeQuadrant === quadrant.key ? 'animate-pulse' : ''
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Hover over quadrants to see technologies in focus
          </p>
        </div>
      </div>
    </section>
  );
};


export const LabSection = () => {
  const labProjects = [
    {
      title: "Neural Network Visualizer",
      description: "Real-time visualization of neural network training processes using interactive graphics",
      status: "Prototype"
    },
    {
      title: "Drone Swarm Intelligence",
      description: "Collective behavior algorithms for coordinating multiple autonomous drones in formation",
      status: "Experiment"
    },
    {
      title: "RL Racing Simulator",
      description: "Teaching AI agents to race competitively using reinforcement learning techniques",
      status: "Active"
    },
    {
      title: "Computer Vision Pipeline",
      description: "Custom object detection system optimized for FPV drone navigation",
      status: "Testing"
    },
    {
      title: "Micro-Service Mesh",
      description: "Kubernetes orchestration system for deploying and scaling ML models",
      status: "Draft"
    },
    {
      title: "Hardware Prototypes",
      description: "Custom PCB designs for embedded AI applications on edge devices",
      status: "Sketching"
    }
  ];

  return (
    <section id="lab" className="pt-12 border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            The Lab
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
            Ongoing research and experimental systems.
          </p>
        </div>

        <div className="space-y-8">
          {labProjects.map((project) => (
            <div key={project.title} className="space-y-2">
              <div className="flex items-baseline">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  {project.title} — {project.status}
                </h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-base">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

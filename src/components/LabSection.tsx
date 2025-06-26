
import { Zap, Cpu, Gamepad2, Camera, Code2, Beaker } from "lucide-react";

export const LabSection = () => {
  const labProjects = [
    {
      icon: Zap,
      title: "Neural Network Visualizer",
      description: "Real-time visualization of neural network training processes",
      status: "Prototype",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Cpu,
      title: "Drone Swarm Intelligence",
      description: "Collective behavior algorithms for multiple autonomous drones",
      status: "Experiment",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: Gamepad2,
      title: "RL Racing Simulator",
      description: "Teaching AI to race using reinforcement learning",
      status: "Active",
      color: "from-green-400 to-blue-500"
    },
    {
      icon: Camera,
      title: "Computer Vision Pipeline",
      description: "Custom object detection for FPV drone navigation",
      status: "Testing",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Code2,
      title: "Micro-Service Mesh",
      description: "Kubernetes orchestration for ML model deployment",
      status: "Draft",
      color: "from-indigo-400 to-cyan-500"
    },
    {
      icon: Beaker,
      title: "Hardware Prototypes",
      description: "Custom PCB designs for embedded AI applications",
      status: "Sketching",
      color: "from-red-400 to-pink-500"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Testing": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Prototype": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "Experiment": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <section id="lab" className="py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            The Lab
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Experimental projects, wild ideas, and unfinished prototypes. 
            Low polish, high curiosity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labProjects.map((project, index) => (
            <div
              key={project.title}
              className="group relative p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${project.color} text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <project.icon size={24} />
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            <Beaker size={16} />
            <span className="text-sm">More experiments cooking...</span>
          </div>
        </div>
      </div>
    </section>
  );
};

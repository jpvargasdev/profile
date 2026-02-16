
import { useState, useEffect } from "react";
import { Project } from "../types";
import { loadProjects } from "../utils/dataLoader";

interface ProjectsSectionProps {
  onItemClick: (project: Project) => void;
}

// Short outcome-focused descriptions (12-20 words)
const projectDescriptions: Record<string, string> = {
  "Klimatväktaren — Climate Monitoring Device": "IoT monitoring system deployed across Swedish municipalities to track climate patterns.",
  "Routte — Last-Mile Delivery Optimization Platform": "Full-stack logistics platform optimizing delivery routes and real-time tracking for businesses.",
  "Custom FPV Drones — Designed, Built, and Flown": "Custom-designed FPV drones built with FreeCAD and optimized for freestyle and cinematic flight.",
  "Guilliman — Indie App for Automated Financial Health": "Personal finance app using machine learning to automate expense tracking and budget insights.",
  "NN Engine — Custom Neural Network Engine from Scratch": "Neural network engine built from scratch with backpropagation and matrix operations in TypeScript.",
  "Kaggle Projects — Applied Machine Learning & Experiments": "Collection of data science experiments exploring ML techniques and practical model development."
};

export const ProjectsSection = ({ onItemClick }: ProjectsSectionProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await loadProjects();
      setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="">
        <div className="space-y-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>
          
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-2">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="">
      <div className="space-y-8">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>

        <div className="space-y-8">
          {projects.map((project, index) => {
            const description = projectDescriptions[project.title] || project.description;
            const hasGithub = project.githubUrl && (typeof project.githubUrl === 'string' || Object.keys(project.githubUrl).length > 0);
            
            return (
              <div
                key={index}
                className="space-y-2 cursor-pointer group"
                onClick={() => onItemClick(project)}
              >
                <h3 className="text-base font-medium text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-base text-gray-700 dark:text-gray-300 font-normal">
                  {description}
                </p>
                
                <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                  {project.liveUrl && (
                    <span className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                      Live
                    </span>
                  )}
                  {project.liveUrl && hasGithub && <span>·</span>}
                  {hasGithub && (
                    <span className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                      Code
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

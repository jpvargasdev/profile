
import { useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "../types";
import { loadProjects } from "../utils/dataLoader";

interface ProjectsSectionProps {
  onItemClick: (project: Project) => void;
}

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
      <section id="projects" className="py-20">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A collection of my recent work and side projects that showcase my skills and interests.
            </p>
          </div>
          
          <div className="grid gap-12 md:gap-16">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20">
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of my recent work and side projects that showcase my skills and interests.
          </p>
        </div>

        <div className="grid gap-12 md:gap-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => onItemClick(project)}
            >
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-6 flex items-center justify-center transition-all duration-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-700">
                <div className="text-gray-400 dark:text-gray-500 font-medium text-lg">{project.title} Preview</div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-6 pt-2">
                  {project.liveUrl && (
                    <div className="flex items-center space-x-2 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                      <ExternalLink size={18} />
                      <span className="font-medium">Live Demo</span>
                    </div>
                  )}
                  {project.githubUrl && (
                    <div className="flex items-center space-x-2 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                      <Github size={18} />
                      <span className="font-medium">View Code</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

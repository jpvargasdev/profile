
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
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group cursor-pointer transition-all duration-300 hover:-translate-y-2"
              onClick={() => onItemClick(project)}
            >
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-1 mb-4 transition-all duration-300 group-hover:bg-gray-100 dark:group-hover:bg-gray-800">
                <div className="aspect-video bg-white dark:bg-gray-900 rounded-md overflow-hidden transition-all duration-300">
                  {project.image ? (
                    <img 
                      src={`${import.meta.env.BASE_URL}${project.image}`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold transition-all duration-300 group-hover:from-blue-500 group-hover:to-purple-600">
                      {project.title.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-500">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex gap-4 text-sm">
                  {project.liveUrl && (
                    <div className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <ExternalLink size={14} />
                      <span>Live</span>
                    </div>
                  )}
                  {project.githubUrl && (
                    <div className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <Github size={14} />
                      <span>Code</span>
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

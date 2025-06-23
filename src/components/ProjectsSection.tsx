
import { useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "../types";
import { loadProjects } from "../utils/dataLoader";
import { Skeleton } from "./ui/skeleton";

export const ProjectsSection = () => {
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
      <section id="projects" className="mb-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Projects</h2>
          <p className="text-slate-600 text-lg">
            A collection of my recent work and side projects that showcase my skills and interests.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <Skeleton className="aspect-video rounded-lg mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-14" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="mb-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Projects</h2>
        <p className="text-slate-600 text-lg">
          A collection of my recent work and side projects that showcase my skills and interests.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200"
          >
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-slate-400 font-medium">{project.title} Preview</div>
            </div>
            
            <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex space-x-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  <Github size={16} />
                  <span>Code</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

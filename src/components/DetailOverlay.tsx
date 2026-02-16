
import { X, ExternalLink, Github } from "lucide-react";
import { Project, Experience, Hobby } from "../types";

interface DetailOverlayProps {
  content: Project | Experience | Hobby | null;
  type: 'project' | 'experience' | 'hobby' | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DetailOverlay = ({ content, type, isOpen, onClose }: DetailOverlayProps) => {
  if (!isOpen || !content || !type) return null;

  const renderProjectDetails = (project: Project) => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h1>
        <p className="text-base text-gray-500 dark:text-gray-400 mb-4">{project.year}</p>
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{project.description}</p>
      </div>

      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            Live
          </a>
        )}
        {project.liveUrl && project.githubUrl && <span>·</span>}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            Code
          </a>
        )}
      </div>
    </div>
  );

  const renderExperienceDetails = (experience: Experience) => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{experience.role}</h1>
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">{experience.company}</h2>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {experience.start} – {experience.end}
          {experience.location && ` · ${experience.location}`}
        </p>
        
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{experience.description}</p>
      </div>

      {experience.technologies && experience.technologies.length > 0 && (
        <div>
          <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderHobbyDetails = (hobby: Hobby) => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{hobby.title}</h1>
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{hobby.description}</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (type) {
      case 'project':
        return renderProjectDetails(content as Project);
      case 'experience':
        return renderExperienceDetails(content as Experience);
      case 'hobby':
        return renderHobbyDetails(content as Hobby);
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 dark:bg-black/40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Overlay Content */}
      <div className="relative bg-white dark:bg-gray-900 rounded-lg w-full max-w-2xl max-h-[85vh] overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
        {/* Close button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto max-h-[85vh]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

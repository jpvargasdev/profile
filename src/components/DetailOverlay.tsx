
import { X, ExternalLink, Github, Calendar, MapPin } from "lucide-react";
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
    <div className="space-y-4 sm:space-y-6">
      <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
        <div className="text-slate-400 font-medium text-sm sm:text-base">{project.title} Preview</div>
      </div>
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{project.title}</h1>
        <p className="text-slate-500 text-base sm:text-lg mb-4">{project.year}</p>
        <p className="text-slate-600 leading-relaxed text-base sm:text-lg">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 sm:px-3 py-1 bg-slate-100 text-slate-700 text-xs sm:text-sm rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base touch-manipulation"
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
            className="flex items-center justify-center space-x-2 bg-slate-600 text-white px-4 py-3 sm:py-2 rounded-lg hover:bg-slate-700 transition-colors font-medium text-sm sm:text-base touch-manipulation"
          >
            <Github size={16} />
            <span>View Code</span>
          </a>
        )}
      </div>
    </div>
  );

  const renderExperienceDetails = (experience: Experience) => (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{experience.role}</h1>
        <h2 className="text-lg sm:text-xl text-blue-600 font-medium mb-4">{experience.company}</h2>
        
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-slate-500 mb-4 text-sm sm:text-base">
          <div className="flex items-center space-x-1">
            <Calendar size={14} className="sm:w-4 sm:h-4" />
            <span>{experience.start} - {experience.end}</span>
          </div>
          {experience.location && (
            <div className="flex items-center space-x-1">
              <MapPin size={14} className="sm:w-4 sm:h-4" />
              <span>{experience.location}</span>
            </div>
          )}
        </div>
        
        <p className="text-slate-600 leading-relaxed text-base sm:text-lg">{experience.description}</p>
      </div>

      {experience.technologies && (
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-700 text-xs sm:text-sm rounded-full"
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
    <div className="space-y-4 sm:space-y-6">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
        <span className="text-white text-2xl sm:text-3xl">{hobby.icon}</span>
      </div>
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{hobby.title}</h1>
        <p className="text-slate-600 leading-relaxed text-base sm:text-lg">{hobby.description}</p>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Overlay Content */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full h-full sm:max-w-4xl sm:max-h-[90vh] sm:h-auto overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="text-sm text-slate-500 capitalize font-medium">{type} Details</div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors touch-manipulation"
            aria-label="Close"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto h-full sm:max-h-[calc(90vh-80px)]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

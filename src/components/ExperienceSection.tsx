
import { useState, useEffect } from "react";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import { Experience } from "../types";
import { loadExperience } from "../utils/dataLoader";
import { Skeleton } from "./ui/skeleton";

interface ExperienceSectionProps {
  onItemClick: (experience: Experience) => void;
}

export const ExperienceSection = ({ onItemClick }: ExperienceSectionProps) => {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      const data = await loadExperience();
      setExperience(data);
      setLoading(false);
    };
    fetchExperience();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="mb-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Work Experience</h2>
          <p className="text-slate-600 text-lg">
            My professional journey and the roles that have shaped my career.
          </p>
        </div>
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="w-0.5 h-24 mt-2" />
              </div>
              <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-5 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="mb-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Work Experience</h2>
        <p className="text-slate-600 text-lg">
          My professional journey and the roles that have shaped my career.
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30"></div>
        
        <div className="space-y-8">
          {experience.map((job, index) => (
            <div
              key={index}
              className="relative flex items-start space-x-6 group cursor-pointer"
              onClick={() => onItemClick(job)}
            >
              {/* Timeline dot */}
              <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-white border-4 border-blue-500 rounded-full shadow-lg group-hover:border-blue-600 transition-all duration-300">
                <div className="w-3 h-3 bg-blue-500 rounded-full group-hover:bg-blue-600 transition-colors"></div>
              </div>
              
              {/* Content card */}
              <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {job.role}
                    </h3>
                    <div className="text-blue-600 font-medium mb-2 text-lg">{job.company}</div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span className="font-medium">{job.start} - {job.end}</span>
                      </div>
                      {job.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{job.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="text-slate-400 group-hover:text-blue-500 transition-colors" size={20} />
                </div>
                
                <p className="text-slate-600 mb-4 leading-relaxed line-clamp-2">
                  {job.description}
                </p>
                
                {job.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {job.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-slate-50 text-slate-600 text-sm rounded-full">
                        +{job.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

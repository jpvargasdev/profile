
import { useState, useEffect } from "react";
import { Calendar, MapPin } from "lucide-react";
import { Experience } from "../types";
import { loadExperience } from "../utils/dataLoader";

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
      <section id="experience" className="py-20">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Work Experience</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              My professional journey and the roles that have shaped my career.
            </p>
          </div>
          
          <div className="space-y-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20">
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Work Experience</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My professional journey and the roles that have shaped my career.
          </p>
        </div>

        <div className="relative space-y-12">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
          
          {experience.map((job, index) => (
            <div
              key={index}
              className="relative group cursor-pointer md:pl-12"
              onClick={() => onItemClick(job)}
            >
              <div className="absolute left-0 top-2 w-2 h-2 bg-gray-900 dark:bg-white rounded-full transform -translate-x-1/2 hidden md:block group-hover:scale-150 transition-transform"></div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {job.role}
                  </h3>
                  <div className="text-xl text-gray-700 dark:text-gray-200 font-medium">{job.company}</div>
                  <div className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>{job.start} - {job.end}</span>
                    </div>
                    {job.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{job.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                  {job.description}
                </p>
                
                {job.technologies && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {job.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
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

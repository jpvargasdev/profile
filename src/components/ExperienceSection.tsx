
import { useState, useEffect } from "react";
import { Experience } from "../types";
import { loadExperience } from "../utils/dataLoader";

interface ExperienceSectionProps {
  onItemClick: (experience: Experience) => void;
}

// Helper function to format dates
const formatYear = (dateStr: string): string => {
  if (dateStr.toLowerCase() === 'present') return 'Present';
  const year = dateStr.match(/\d{4}/)?.[0];
  return year || dateStr;
};

// Helper function to group experiences by location
const groupByLocation = (experiences: Experience[]): Record<string, Experience[]> => {
  const grouped: Record<string, Experience[]> = {
    'Sweden': [],
    'Colombia': []
  };
  
  experiences.forEach(exp => {
    if (exp.location.includes('Sweden')) {
      grouped['Sweden'].push(exp);
    } else if (exp.location.includes('Colombia')) {
      grouped['Colombia'].push(exp);
    }
  });
  
  return grouped;
};

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
      <section id="experience" className="">
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Experience</h2>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const groupedExperience = groupByLocation(experience);

  return (
    <section id="experience" className="">
      <div className="space-y-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Experience</h2>
        
        {Object.entries(groupedExperience).map(([location, jobs]) => (
          jobs.length > 0 && (
            <div key={location} className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {location}
              </h3>
              <div className="space-y-1">
                {jobs.map((job, index) => {
                  const startYear = formatYear(job.start);
                  const endYear = formatYear(job.end);
                  const yearRange = `${startYear}–${endYear}`;
                  
                  return (
                    <div
                      key={index}
                      className="flex items-baseline justify-between gap-4 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      onClick={() => onItemClick(job)}
                    >
                      <span className="text-base text-gray-900 dark:text-white">
                        <span className="font-medium">{job.company}</span>
                        {" — "}
                        <span className="font-normal">{job.role}</span>
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {yearRange}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        ))}
      </div>
    </section>
  );
};

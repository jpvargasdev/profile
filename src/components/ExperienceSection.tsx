
import { useState, useEffect } from "react";
import { Calendar, MapPin } from "lucide-react";
import { Experience } from "../types";
import { loadExperience } from "../utils/dataLoader";
import { Skeleton } from "./ui/skeleton";

export const ExperienceSection = () => {
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
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-5 w-1/3 mb-2" />
              <Skeleton className="h-4 w-1/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <div className="flex gap-2">
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
    <section id="experience" className="mb-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Work Experience</h2>
        <p className="text-slate-600 text-lg">
          My professional journey and the roles that have shaped my career.
        </p>
      </div>

      <div className="space-y-8">
        {experience.map((job, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900 mb-1">
                  {job.role}
                </h3>
                <div className="text-blue-600 font-medium mb-2">{job.company}</div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{job.start} - {job.end}</span>
                  </div>
                  {job.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>{job.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              {job.description}
            </p>
            
            {job.technologies && (
              <div className="flex flex-wrap gap-2">
                {job.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

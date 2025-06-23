
import { Calendar, MapPin } from "lucide-react";
import { experienceData } from "../data/experience";

export const ExperienceSection = () => {
  return (
    <section id="experience" className="mb-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Work Experience</h2>
        <p className="text-slate-600 text-lg">
          My professional journey and the roles that have shaped my career.
        </p>
      </div>

      <div className="space-y-8">
        {experienceData.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900 mb-1">
                  {job.position}
                </h3>
                <div className="text-blue-600 font-medium mb-2">{job.company}</div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{job.startDate} - {job.endDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={14} />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              {job.description}
            </p>
            
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
          </div>
        ))}
      </div>
    </section>
  );
};

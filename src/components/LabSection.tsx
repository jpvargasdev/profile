import { useState, useEffect } from 'react';

interface LabProject {
  title: string;
  description: string;
  status: string;
}

export const LabSection = () => {
  const [labProjects, setLabProjects] = useState<LabProject[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/lab.json`)
      .then(response => response.json())
      .then(data => setLabProjects(data))
      .catch(error => console.error('Error loading lab projects:', error));
  }, []);

  return (
    <section id="lab" className="">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            The Lab
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
            Ongoing research and experimental systems.
          </p>
        </div>

        <div className="space-y-8">
          {labProjects.map((project) => (
            <div key={project.title} className="space-y-2">
              <div className="flex items-baseline">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  {project.title} — {project.status}
                </h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-base">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


import { hobbiesData } from "../data/hobbies";

export const HobbiesSection = () => {
  return (
    <section id="hobbies" className="mb-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Hobbies & Interests</h2>
        <p className="text-slate-600 text-lg">
          What I love doing when I'm not coding. Life is about balance and continuous learning.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hobbiesData.map((hobby) => (
          <div
            key={hobby.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white text-xl">{hobby.icon}</span>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {hobby.title}
            </h3>
            
            <p className="text-slate-600 leading-relaxed">
              {hobby.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

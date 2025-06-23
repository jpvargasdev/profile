import { useState, useEffect } from "react";
import { Hobby } from "../types";
import { loadHobbies } from "../utils/dataLoader";
import { Skeleton } from "./ui/skeleton";

interface HobbiesSectionProps {
  onItemClick: (hobby: Hobby) => void;
}

export const HobbiesSection = ({ onItemClick }: HobbiesSectionProps) => {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHobbies = async () => {
      const data = await loadHobbies();
      setHobbies(data);
      setLoading(false);
    };
    fetchHobbies();
  }, []);

  if (loading) {
    return (
      <section id="hobbies" className="mb-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Hobbies & Interests</h2>
          <p className="text-slate-600 text-lg">
            What I love doing when I'm not coding. Life is about balance and continuous learning.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <Skeleton className="w-12 h-12 rounded-lg mb-4" />
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="hobbies" className="mb-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Hobbies & Interests</h2>
        <p className="text-slate-600 text-lg">
          What I love doing when I'm not coding. Life is about balance and continuous learning.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hobbies.map((hobby, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={() => onItemClick(hobby)}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white text-xl">{hobby.icon}</span>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-900 mb-2 hover:text-blue-600 transition-colors">
              {hobby.title}
            </h3>
            
            <p className="text-slate-600 leading-relaxed line-clamp-3">
              {hobby.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

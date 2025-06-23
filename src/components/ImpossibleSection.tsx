
import { Target } from "lucide-react";

export const ImpossibleSection = () => {
  const impossibleList = `
# My Impossible List

An ever-evolving list of goals that push me beyond my comfort zone. Inspired by Joel Runyon's concept, this is my commitment to continuous growth and adventure.

## Life Goals
- [ ] Visit all 7 continents
- [x] Learn to code
- [ ] Run a marathon
- [ ] Write a book
- [ ] Start a successful business
- [ ] Learn 3 languages fluently

## Adventure Goals
- [ ] Skydive
- [ ] Scuba dive in the Great Barrier Reef
- [ ] Climb a mountain over 4,000m
- [ ] Go on a solo backpacking trip
- [x] Try surfing

## Learning Goals
- [x] Master React and TypeScript
- [ ] Learn machine learning
- [ ] Get AWS certified
- [ ] Contribute to open source
- [ ] Speak at a tech conference

## Creative Goals
- [ ] Design and build my dream home
- [ ] Create a mobile app with 10k+ users
- [ ] Start a podcast
- [ ] Learn to play guitar
- [x] Build this portfolio website

*Last updated: June 2025*
  `;

  return (
    <section id="impossible" className="mb-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center space-x-3">
          <Target className="text-blue-600" />
          <span>Impossible List</span>
        </h2>
        <p className="text-slate-600 text-lg">
          My personal challenge to continuously grow and push boundaries. These goals keep me motivated and excited about the future.
        </p>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
        <div className="prose prose-slate max-w-none">
          {impossibleList.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
              return <h1 key={index} className="text-2xl font-bold text-slate-900 mb-4">{line.slice(2)}</h1>;
            }
            if (line.startsWith('## ')) {
              return <h2 key={index} className="text-xl font-semibold text-slate-900 mt-8 mb-4">{line.slice(3)}</h2>;
            }
            if (line.startsWith('- [x]')) {
              return (
                <div key={index} className="flex items-center space-x-3 mb-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-slate-600 line-through">{line.slice(6)}</span>
                </div>
              );
            }
            if (line.startsWith('- [ ]')) {
              return (
                <div key={index} className="flex items-center space-x-3 mb-2">
                  <div className="w-5 h-5 border-2 border-slate-300 rounded-full"></div>
                  <span className="text-slate-700">{line.slice(6)}</span>
                </div>
              );
            }
            if (line.startsWith('*')) {
              return <p key={index} className="text-slate-500 italic mt-6">{line.slice(1)}</p>;
            }
            if (line.trim()) {
              return <p key={index} className="text-slate-600 mb-4">{line}</p>;
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
};

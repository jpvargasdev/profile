
import { useState, useEffect } from "react";
import { Target, CheckCircle2, Clock, Brain } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { loadMarkdown } from "../utils/dataLoader";
import { Skeleton } from "./ui/skeleton";

export const ImpossibleSection = () => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const markdown = await loadMarkdown("/src/content/impossible.md");
      setContent(markdown);
      setLoading(false);
    };
    fetchContent();
  }, []);

  if (loading) {
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
          <Skeleton className="h-8 w-1/2 mb-6" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-6 w-1/3 mb-4" />
          <div className="space-y-2 mb-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-3/4" />
            ))}
          </div>
          <Skeleton className="h-6 w-1/3 mb-4" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-2/3" />
            ))}
          </div>
        </div>
      </section>
    );
  }

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
        <div className="prose prose-slate prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4 flex items-center space-x-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                  <span>{children}</span>
                </h2>
              ),
              p: ({ children }) => <p className="text-slate-600 mb-4 leading-relaxed">{children}</p>,
              ul: ({ children }) => <ul className="space-y-3 mb-8">{children}</ul>,
              li: ({ children }) => {
                const content = children?.toString() || '';
                
                if (content.includes('[ ]')) {
                  return (
                    <li className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <Brain className="text-slate-400 flex-shrink-0" size={20} />
                      <span className="text-slate-700 font-medium">{content.replace('[ ]', '').trim()}</span>
                    </li>
                  );
                }
                
                if (content.includes('[~]')) {
                  return (
                    <li className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors">
                      <Clock className="text-yellow-600 flex-shrink-0" size={20} />
                      <span className="text-slate-700 font-medium">{content.replace('[~]', '').trim()}</span>
                    </li>
                  );
                }
                
                if (content.includes('[x]')) {
                  return (
                    <li className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                      <CheckCircle2 className="text-green-600 flex-shrink-0" size={20} />
                      <span className="text-slate-600 line-through font-medium">{content.replace('[x]', '').trim()}</span>
                    </li>
                  );
                }
                
                return <li className="text-slate-600 leading-relaxed">{children}</li>;
              },
              em: ({ children }) => <em className="text-slate-500 italic text-sm">{children}</em>,
              hr: () => <hr className="my-8 border-slate-200" />
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  );
};

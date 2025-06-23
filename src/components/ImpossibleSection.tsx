
import { useState, useEffect } from "react";
import { Target } from "lucide-react";
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
        <div className="prose prose-slate max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-2xl font-bold text-slate-900 mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">{children}</h2>,
              p: ({ children }) => <p className="text-slate-600 mb-4">{children}</p>,
              ul: ({ children }) => <ul className="space-y-2 mb-6">{children}</ul>,
              li: ({ children }) => {
                const content = children?.toString() || '';
                if (content.includes('[ ]')) {
                  return (
                    <li className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-slate-300 rounded-full flex-shrink-0"></div>
                      <span className="text-slate-700">{content.replace('[ ]', '').trim()}</span>
                    </li>
                  );
                }
                if (content.includes('[x]')) {
                  return (
                    <li className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-slate-600 line-through">{content.replace('[x]', '').trim()}</span>
                    </li>
                  );
                }
                return <li className="text-slate-600">{children}</li>;
              },
              em: ({ children }) => <em className="text-slate-500 italic">{children}</em>
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  );
};

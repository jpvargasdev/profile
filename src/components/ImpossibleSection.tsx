
import { useState, useEffect } from "react";
import { Target } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { loadMarkdown } from "../utils/dataLoader";

export const ImpossibleSection = () => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const markdown = await loadMarkdown("/content/impossible.md");
      setContent(markdown);
      setLoading(false);
    };
    fetchContent();
  }, []);

  if (loading) {
    return (
      <section id="impossible" className="py-20">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white flex items-center justify-center space-x-4">
              <Target size={40} />
              <span>Goals</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              My personal challenge to continuously grow and push boundaries.
            </p>
          </div>
          
          <div className="space-y-8 animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="impossible" className="py-20">
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white flex items-center justify-center space-x-4">
            <Target size={40} />
            <span>Goals</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My personal challenge to continuously grow and push boundaries.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                    {children}
                  </h2>
                ),
                p: ({ children }) => (
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {children}
                  </p>
                ),
                ul: ({ children }) => <ul className="space-y-4 mb-8">{children}</ul>,
                li: ({ children }) => {
                  const content = children?.toString() || '';
                  
                  if (content.includes('[ ]')) {
                    return (
                      <li className="flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded"></div>
                        <span className="text-gray-700 dark:text-gray-300">{content.replace('[ ]', '').trim()}</span>
                      </li>
                    );
                  }
                  
                  if (content.includes('[~]')) {
                    return (
                      <li className="flex items-center space-x-4 p-4 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors">
                        <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">{content.replace('[~]', '').trim()}</span>
                      </li>
                    );
                  }
                  
                  if (content.includes('[x]')) {
                    return (
                      <li className="flex items-center space-x-4 p-4 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-gray-500 dark:text-gray-400 line-through">{content.replace('[x]', '').trim()}</span>
                      </li>
                    );
                  }
                  
                  return <li className="text-gray-600 dark:text-gray-300 leading-relaxed">{children}</li>;
                },
                hr: () => <hr className="my-12 border-gray-200 dark:border-gray-700" />
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  );
};

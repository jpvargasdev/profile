
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { loadMarkdown } from "../utils/dataLoader";

export const ImpossibleSection = () => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const markdown = await loadMarkdown(`${import.meta.env.BASE_URL}content/impossible.md`);
      setContent(markdown);
      setLoading(false);
    };
    fetchContent();
  }, []);

  if (loading) {
    return (
      <section id="impossible" className="">
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Impossible List</h2>
          
          <div className="space-y-8 animate-pulse">
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
    <section id="impossible" className="">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Goals</h2>

        <div className="max-w-4xl">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: () => null,
                h2: ({ children }) => (
                  <h3 className="text-base font-medium text-gray-900 dark:text-white mt-8 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => {
                  const content = children?.toString() || '';
                  if (content.includes('_') || content.includes('Inspired by')) {
                    return null;
                  }
                  return (
                    <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
                      {children}
                    </p>
                  );
                },
                ul: ({ children }) => <ul className="space-y-1.5 mb-6">{children}</ul>,
                li: ({ children }) => {
                  const content = children?.toString() || '';
                  
                  // Remove checkbox markers and just show text
                  const cleanContent = content
                    .replace('[ ]', '')
                    .replace('[~]', '')
                    .replace('[x]', '')
                    .trim();
                  
                  // Apply subtle strikethrough for completed items only
                  const isCompleted = content.includes('[x]');
                  
                  return (
                    <li className="flex items-start">
                      <span className="mr-2 text-gray-400 dark:text-gray-500">•</span>
                      <span className={`text-base ${isCompleted ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                        {cleanContent}
                      </span>
                    </li>
                  );
                },
                hr: () => null
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

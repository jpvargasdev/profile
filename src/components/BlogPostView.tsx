
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { BlogPost } from "../utils/blogLoader";

interface BlogPostViewProps {
  post: BlogPost;
}

export const BlogPostView = ({ post }: BlogPostViewProps) => {
  return (
    <main className="pt-20 max-w-3xl mx-auto py-12 px-6">
      <Link 
        to="/blog" 
        className="inline-flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-12"
      >
        <ArrowLeft size={16} />
        <span>Back to Blog</span>
      </Link>
      
      <article className="space-y-12">
        {/* Header */}
        <header className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {post.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} · {Math.ceil(post.content.split(' ').length / 200)} min read
          </p>
        </header>
        
        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              h2: ({ node, ...props }) => (
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-12 mb-4" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-base font-medium text-gray-900 dark:text-white mt-8 mb-3" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6" {...props} />
              ),
              hr: ({ node, ...props }) => (
                <div className="my-12" {...props} />
              ),
              iframe: ({ node, ...props }) => {
                const isKaggle = props.src?.includes('kaggle.com');
                return (
                  <div className="my-16">
                    {isKaggle && (
                      <div className="mb-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Notebook</h2>
                        <a 
                          href={props.src?.replace('/embed', '') || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          View on Kaggle ↗
                        </a>
                      </div>
                    )}
                    <iframe
                      {...props}
                      className="w-full"
                      loading="lazy"
                      style={{
                        height: props.height || '1400px',
                        border: 'none',
                        ...props.style
                      }}
                    />
                  </div>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
};

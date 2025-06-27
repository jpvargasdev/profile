
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { BlogPost } from "../utils/blogLoader";

interface BlogPostViewProps {
  post: BlogPost;
}

export const BlogPostView = ({ post }: BlogPostViewProps) => {
  return (
    <main className="pt-20 max-w-4xl mx-auto py-12 px-6">
      <Link 
        to="/blog" 
        className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 mb-8 group hover:scale-105"
      >
        <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
        <span>Back to Blog</span>
      </Link>
      
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <time>{new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</time>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
            </div>
          </div>
        </header>
        
        <div className="text-gray-700 dark:text-gray-300">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              iframe: ({ node, ...props }) => (
                <div className="my-8 flex justify-center">
                  <iframe
                    {...props}
                    className="rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-4xl"
                    loading="lazy"
                    style={{
                      height: props.height || '600px',
                      ...props.style
                    }}
                  />
                </div>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
};

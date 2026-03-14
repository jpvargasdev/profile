import { X, Calendar, Clock, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Link } from "react-router-dom";
import { BlogPost } from "../utils/blogLoader";
import { resolveImageSrc } from "../utils/resolveImageSrc";

interface BlogPostModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BlogPostModal = ({ post, isOpen, onClose }: BlogPostModalProps) => {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </DialogTitle>
          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 mb-6">
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
        </DialogHeader>
        
        <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
          <div className="text-gray-700 dark:text-gray-300">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                img: ({ node, src, alt, ...props }) => (
                  <img
                    src={resolveImageSrc(src)}
                    alt={alt || ''}
                    className="max-w-xl max-h-[300px] w-full h-auto object-contain rounded-lg my-4 mx-auto"
                    loading="lazy"
                    {...props}
                  />
                ),
                a: ({ node, href, children, ...props }) => {
                  const isExternal = href?.startsWith('http://') || href?.startsWith('https://');
                  return (
                    <a
                      href={href}
                      className="text-blue-600 dark:text-blue-400 underline decoration-blue-600/30 dark:decoration-blue-400/30 underline-offset-2 hover:decoration-blue-600 dark:hover:decoration-blue-400 transition-colors"
                      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      {...props}
                    >
                      {children}
                      {isExternal && <span className="inline-block ml-1 text-xs">↗</span>}
                    </a>
                  );
                },
                iframe: ({ node, ...props }) => (
                  <div className="my-4 flex justify-center">
                    <iframe
                      {...props}
                      className="rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-2xl"
                      loading="lazy"
                      style={{
                        height: props.height || '400px',
                        ...props.style
                      }}
                    />
                  </div>
                ),
              }}
            >
              {post.content.slice(0, 500) + '...'}
            </ReactMarkdown>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={onClose}
          >
            <span>Read Full Post</span>
            <ExternalLink size={16} />
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

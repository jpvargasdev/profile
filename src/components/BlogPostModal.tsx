
import { X, Calendar, Clock, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Link } from "react-router-dom";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
}

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

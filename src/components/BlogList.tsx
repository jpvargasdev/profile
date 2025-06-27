
import { Calendar, Clock } from "lucide-react";
import { BlogPost } from "../utils/blogLoader";
import { BlogPostModal } from "./BlogPostModal";
import { useState } from "react";

interface BlogListProps {
  posts: BlogPost[];
}

export const BlogList = ({ posts }: BlogListProps) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Thoughts, tutorials, and insights from my journey in technology.
        </p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            onClick={() => handlePostClick(post)}
          >
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 h-full transition-all duration-500 group-hover:bg-gray-100 dark:group-hover:bg-gray-800 border border-transparent group-hover:border-gray-200 dark:group-hover:border-gray-700">
              {/* Blog post icon/image placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-6 flex items-center justify-center text-white text-4xl font-bold transition-all duration-500 group-hover:scale-105">
                {post.title.charAt(0)}
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar size={14} />
                  <time>{new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</time>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={14} />
                  <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {post.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 flex-grow">
                {post.excerpt}
              </p>
              
              <div className="text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-all duration-300 transform group-hover:translate-x-1">
                Read more →
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Blog Post Modal */}
      <BlogPostModal 
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPost(null);
        }}
      />
    </>
  );
};

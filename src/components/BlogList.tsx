
import { BlogPost } from "../utils/blogLoader";
import { Link } from "react-router-dom";

interface BlogListProps {
  posts: BlogPost[];
}

export const BlogList = ({ posts }: BlogListProps) => {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Blog</h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          Engineering notes and experiments.
        </p>
      </div>

      {/* Single Column List */}
      <div className="space-y-16">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
          >
            <article className="cursor-pointer group">
              <div className="space-y-1">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white group-hover:underline transition-all">
                  {post.title}
                </h2>
                
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} · {Math.ceil(post.content.split(' ').length / 200)} min read
                </p>
              </div>
              
              <p className="text-base text-gray-700 dark:text-gray-300 line-clamp-2 mt-4">
                {post.excerpt}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
};

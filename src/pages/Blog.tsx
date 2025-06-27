
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MinimalNav } from "../components/MinimalNav";
import { BlogList } from "../components/BlogList";
import { BlogPostView } from "../components/BlogPostView";
import { BlogLoading } from "../components/BlogLoading";
import { loadBlogPosts, BlogPost } from "../utils/blogLoader";

const Blog = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const loadedPosts = await loadBlogPosts();
      setPosts(loadedPosts);
      
      if (slug) {
        const post = loadedPosts.find(p => p.slug === slug);
        setCurrentPost(post || null);
      }
      
      setLoading(false);
    };
    
    loadPosts();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <MinimalNav activeSection="blog" onNavigate={() => {}} />
        <BlogLoading />
      </div>
    );
  }

  // Single post view
  if (slug && currentPost) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <MinimalNav activeSection="blog" onNavigate={() => {}} />
        <BlogPostView post={currentPost} />
      </div>
    );
  }

  // Blog list view
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <MinimalNav activeSection="blog" onNavigate={() => {}} />
      <main className="pt-20 max-w-6xl mx-auto py-12 px-6">
        <BlogList posts={posts} />
      </main>
    </div>
  );
};

export default Blog;

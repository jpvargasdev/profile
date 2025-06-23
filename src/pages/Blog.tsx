
import { useState, useEffect } from "react";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ProfileSidebar } from "../components/ProfileSidebar";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  preview: string;
  content: string;
  tags?: string[];
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock blog posts - in real implementation, load from /src/content/blog/
    const mockPosts: BlogPost[] = [
      {
        slug: "building-neural-networks",
        title: "Building Neural Networks from Scratch",
        date: "2024-01-15",
        preview: "A deep dive into implementing neural networks using vanilla JavaScript...",
        content: "# Building Neural Networks from Scratch\n\nIn this post, I'll walk through building a neural network from the ground up...",
        tags: ["AI", "JavaScript", "Machine Learning"]
      },
      {
        slug: "react-performance-tips",
        title: "React Performance Optimization Tips",
        date: "2024-01-10", 
        preview: "Essential techniques for optimizing React applications...",
        content: "# React Performance Optimization Tips\n\nPerformance is crucial for modern web applications...",
        tags: ["React", "Performance", "Web Development"]
      }
    ];
    
    setPosts(mockPosts);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex">
          <ProfileSidebar activeSection="blog" onNavigate={() => {}} />
          <div className="flex-1 ml-80 min-h-screen">
            <main className="max-w-4xl mx-auto py-12 px-8">
              <div className="animate-pulse space-y-8">
                <div className="h-8 bg-slate-200 rounded w-1/3"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border">
                      <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/4 mb-3"></div>
                      <div className="h-4 bg-slate-200 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        <ProfileSidebar activeSection="blog" onNavigate={() => {}} />
        <div className="flex-1 ml-80 min-h-screen">
          <main className="max-w-4xl mx-auto py-12 px-8">
            <div className="mb-12">
              <Link 
                to="/" 
                className="inline-flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors mb-6"
              >
                <ArrowLeft size={16} />
                <span>Back to Portfolio</span>
              </Link>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Blog & Notes</h1>
              <p className="text-slate-600 text-lg">
                Thoughts, tutorials, and insights from my journey in technology and beyond.
              </p>
            </div>

            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center space-x-2 text-sm text-slate-500 mb-3">
                    <Calendar size={14} />
                    <time>{new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</time>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 hover:text-blue-600 transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {post.preview}
                  </p>
                  
                  {post.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Blog;

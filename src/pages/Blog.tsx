import { useState, useEffect } from "react";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { MinimalNav } from "../components/MinimalNav";
import { BlogPostModal } from "../components/BlogPostModal";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
}

const Blog = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        // List of blog post files
        const postSlugs = ['neural-network-engine', 'react-performance'];
        
        const loadedPosts = await Promise.all(
          postSlugs.map(async (slug) => {
            try {
              const response = await fetch(`${import.meta.env.BASE_URL}content/blog/${slug}.md`);
              if (!response.ok) {
                throw new Error(`Failed to fetch ${slug}.md: ${response.status}`);
              }
              const markdown = await response.text();
              
              // Parse frontmatter with more flexible regex
              const frontmatterMatch = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
              if (!frontmatterMatch) {
                console.error(`Invalid frontmatter format in ${slug}.md`);
                return null;
              }
              
              const frontmatter = frontmatterMatch[1];
              const content = frontmatterMatch[2];
              
              // Parse frontmatter fields with better error handling
              const titleMatch = frontmatter.match(/title:\s*["']([^"']+)["']/);
              const dateMatch = frontmatter.match(/date:\s*["']([^"']+)["']/);
              const excerptMatch = frontmatter.match(/excerpt:\s*["']([^"']+)["']/);
              const slugMatch = frontmatter.match(/slug:\s*["']([^"']+)["']/);
              
              if (!titleMatch || !dateMatch || !excerptMatch) {
                console.error(`Missing required frontmatter fields in ${slug}.md`);
                return null;
              }
              
              return {
                slug: slugMatch ? slugMatch[1] : slug,
                title: titleMatch[1],
                date: dateMatch[1],
                excerpt: excerptMatch[1],
                content: content.trim()
              };
            } catch (error) {
              console.error(`Failed to load blog post: ${slug}`, error);
              return null;
            }
          })
        );
        
        const validPosts = loadedPosts.filter(Boolean) as BlogPost[];
        setPosts(validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        
        if (slug) {
          const post = validPosts.find(p => p.slug === slug);
          setCurrentPost(post || null);
        }
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      }
      setLoading(false);
    };
    
    loadBlogPosts();
  }, [slug]);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <MinimalNav activeSection="blog" onNavigate={() => {}} />
        <main className="pt-20 max-w-6xl mx-auto py-12 px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Single post view
  if (slug && currentPost) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <MinimalNav activeSection="blog" onNavigate={() => {}} />
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
                {currentPost.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <time>{new Date(currentPost.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</time>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{Math.ceil(currentPost.content.split(' ').length / 200)} min read</span>
                </div>
              </div>
            </header>
            
            <div className="text-gray-700 dark:text-gray-300">
              <ReactMarkdown>
                {currentPost.content}
              </ReactMarkdown>
            </div>
          </article>
        </main>
      </div>
    );
  }

  // Blog list view with responsive grid
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <MinimalNav activeSection="blog" onNavigate={() => {}} />
      <main className="pt-20 max-w-6xl mx-auto py-12 px-6">
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
      </main>

      {/* Blog Post Modal */}
      <BlogPostModal 
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPost(null);
        }}
      />
    </div>
  );
};

export default Blog;

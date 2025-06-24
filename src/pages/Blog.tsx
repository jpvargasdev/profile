
import { useState, useEffect } from "react";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { MinimalNav } from "../components/MinimalNav";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        // List of blog post files - in a real app, this could come from a CMS or API
        const postSlugs = ['neural-network-engine', 'react-performance'];
        
        const loadedPosts = await Promise.all(
          postSlugs.map(async (slug) => {
            try {
              const response = await fetch(`/content/blog/${slug}.md`);
              const markdown = await response.text();
              
              // Parse frontmatter
              const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
              if (!frontmatterMatch) throw new Error('Invalid frontmatter');
              
              const frontmatter = frontmatterMatch[1];
              const content = frontmatterMatch[2];
              
              // Parse frontmatter fields
              const title = frontmatter.match(/title: "(.*)"/)?.[1] || '';
              const date = frontmatter.match(/date: "(.*)"/)?.[1] || '';
              const excerpt = frontmatter.match(/excerpt: "(.*)"/)?.[1] || '';
              
              return {
                slug,
                title,
                date,
                excerpt,
                content
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <MinimalNav activeSection="blog" onNavigate={() => {}} />
        <main className="pt-20 max-w-4xl mx-auto py-12 px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            <div className="space-y-4">
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
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
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

  // Blog list view
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <MinimalNav activeSection="blog" onNavigate={() => {}} />
      <main className="pt-20 max-w-4xl mx-auto py-12 px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Thoughts, tutorials, and insights from my journey in technology.
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 transition-all duration-300 group-hover:bg-gray-100 dark:group-hover:bg-gray-800">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
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
                  
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-4 text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                    Read more →
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blog;

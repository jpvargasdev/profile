
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
}

export const loadBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    // List of blog post files
    const postSlugs = ['neural-network-engine', 'sae-crash-tool', 'house-prices', 'cnn-vs-frameworks'];
    
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
    return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    return [];
  }
};

export type { BlogPost };

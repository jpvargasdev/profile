/**
 * Resolves image source paths for blog markdown content.
 *
 * Handles relative paths (e.g. "./images/photo.png" or "images/photo.png")
 * by prepending the Vite base URL and the blog content directory.
 * Absolute URLs (http/https) and already-resolved paths are returned as-is.
 */
export const resolveImageSrc = (src?: string): string => {
  if (!src) return '';

  // Already an absolute URL -- leave it alone
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  const base = import.meta.env.BASE_URL; // "/" in dev, "/profile/" in prod

  // Already starts with the base path -- already resolved
  if (src.startsWith(base)) {
    return src;
  }

  // Strip leading "./" if present
  const cleaned = src.replace(/^\.\//, '');

  // If the path starts with "images/" it's relative to the blog content dir
  if (cleaned.startsWith('images/')) {
    return `${base}content/blog/${cleaned}`;
  }

  // Otherwise treat as relative to public root
  return `${base}${cleaned}`;
};

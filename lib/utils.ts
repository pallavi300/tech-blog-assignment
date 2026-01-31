import type { BlogPost } from "./types";

/**
 * Format date string to "Jan 15, 2024" format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/**
 * Search across title, description, AND content_text (document requirement).
 * Matches if query appears in any of these fields.
 */
export function filterBySearch(blogs: BlogPost[], query: string): BlogPost[] {
  if (!query.trim()) return blogs;
  const lowerQuery = query.toLowerCase().trim();
  return blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(lowerQuery) ||
      blog.description.toLowerCase().includes(lowerQuery) ||
      blog.content_text.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Filter blogs by category
 */
export function filterByCategory(
  blogs: BlogPost[],
  category: string | null
): BlogPost[] {
  if (!category || category === "all") return blogs;
  return blogs.filter(
    (blog) => blog.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get unique categories from fetched articles (document: category filter
 * shows all unique categories from the data).
 */
export function getUniqueCategories(blogs: BlogPost[]): string[] {
  const categories = blogs
    .map((blog) => blog.category)
    .filter((c): c is string => Boolean(c));
  return [...new Set(categories)].sort();
}

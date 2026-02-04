import type { BlogPost } from "./types";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

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

export function filterByCategory(
  blogs: BlogPost[],
  category: string | null
): BlogPost[] {
  if (!category || category === "all") return blogs;
  return blogs.filter(
    (blog) => blog.category.toLowerCase() === category.toLowerCase()
  );
}

export function getUniqueCategories(blogs: BlogPost[]): string[] {
  const categories = blogs
    .map((blog) => blog.category)
    .filter((c): c is string => Boolean(c));
  return [...new Set(categories)].sort();
}

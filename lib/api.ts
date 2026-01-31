import type { ApiResponse, BlogPost } from "./types";

const API_URL =
  "https://api.slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=10";

/**
 * Client-side fetch (from browser). Use in useEffect.
 * Avoids 522 timeout when API blocks server/cloud IPs.
 */
export async function fetchBlogPostsClient(): Promise<BlogPost[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();

    if (!data.success || !data.blogs) {
      throw new Error(data.message || "Failed to fetch blog posts");
    }

    return data.blogs;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch blog posts: ${error.message}`);
    }
    throw new Error("Failed to fetch blog posts");
  }
}

/**
 * Server-side fetch (from Vercel/Next.js server). Uses ISR cache.
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();

    if (!data.success || !data.blogs) {
      throw new Error(data.message || "Failed to fetch blog posts");
    }

    return data.blogs;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch blog posts: ${error.message}`);
    }
    throw new Error("Failed to fetch blog posts");
  }
}

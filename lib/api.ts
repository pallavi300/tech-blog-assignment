import type { ApiResponse, BlogPost } from "./types";

// Document API: https://api.slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=10
const API_URL =
  "https://api.slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=10";
const BLOG_LIMIT = 10;

/**
 * Client-side fetch (from browser). Uses /api/blog-posts route to avoid CORS.
 * Our API route fetches from Sling Academy server-side (no CORS issue there).
 */
export async function fetchBlogPostsClient(): Promise<BlogPost[]> {
  try {
    const response = await fetch("/api/blog-posts");
    if (process.env.NODE_ENV === "development") {
      console.log("[api] GET /api/blog-posts →", response.status, response.statusText);
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const msg =
        (errData as { error?: string }).error ||
        `${response.status} ${response.statusText}`;
      throw new Error(msg);
    }

    const data = (await response.json()) as BlogPost[];

    if (!Array.isArray(data)) {
      throw new Error("Invalid response format");
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.message) {
      throw error; // keep server message as-is (no double "Failed to fetch...")
    }
    throw new Error("Failed to fetch blog posts");
  }
}

/**
 * Server-side fetch (from Next.js server). Uses ApiResponse type; returns
 * at most 10 posts per document requirement.
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

    if (!data.success || !Array.isArray(data.blogs)) {
      throw new Error(data.message || "Failed to fetch blog posts");
    }

    return data.blogs.slice(0, BLOG_LIMIT);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch blog posts: ${error.message}`);
    }
    throw new Error("Failed to fetch blog posts");
  }
}

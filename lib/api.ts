import type { BlogPost } from "./types";
import { type DummyJsonResponse, mapDummyPostToBlogPost } from "./dummyjson";

// API route /api/blog-posts fetches from https://dummyjson.com/posts?limit=10
const API_URL = "https://dummyjson.com/posts?limit=10";
const BLOG_LIMIT = 10;

/**
 * Client-side fetch (from browser). Uses /api/blog-posts route to avoid CORS.
 * Our API route fetches from DummyJSON server-side (no CORS issue there).
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
 * Server-side fetch (from Next.js server). Fetches from DummyJSON and maps
 * to BlogPost[]; returns at most 10 posts. Prefer using /api/blog-posts from client.
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as DummyJsonResponse;
    if (!Array.isArray(data?.posts)) {
      throw new Error("Invalid response format");
    }

    return data.posts.slice(0, BLOG_LIMIT).map(mapDummyPostToBlogPost);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch blog posts: ${error.message}`);
    }
    throw new Error("Failed to fetch blog posts");
  }
}

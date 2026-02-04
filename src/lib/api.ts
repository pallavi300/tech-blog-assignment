import type { BlogPost } from "./types";
import { type DummyJsonResponse, mapDummyPostToBlogPost } from "./dummyjson";

const API_URL = "https://dummyjson.com/posts?limit=10";
const BLOG_LIMIT = 10;

/**
 * Fetch blog posts from DummyJSON API (client-side). CORS is allowed by DummyJSON.
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const msg =
        (errData as { message?: string }).message ||
        `${response.status} ${response.statusText}`;
      throw new Error(msg);
    }

    const data = (await response.json()) as DummyJsonResponse;
    if (!Array.isArray(data?.posts)) {
      throw new Error("Invalid response format");
    }

    return data.posts.slice(0, BLOG_LIMIT).map(mapDummyPostToBlogPost);
  } catch (error) {
    if (error instanceof Error && error.message) {
      throw error;
    }
    throw new Error("Failed to fetch blog posts");
  }
}

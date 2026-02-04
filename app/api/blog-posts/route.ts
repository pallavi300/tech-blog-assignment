import { NextResponse } from "next/server";
import type { BlogPost } from "@/lib/types";
import {
  type DummyJsonResponse,
  mapDummyPostToBlogPost,
} from "@/lib/dummyjson";

// https://dummyjson.com/posts
const API_URL = "https://dummyjson.com/posts?limit=10";
const TIMEOUT_MS = 8000;
const BLOG_LIMIT = 10;

async function fetchWithTimeout(
  url: string,
  signal: AbortSignal
): Promise<Response> {
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  return res;
}

export async function GET() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetchWithTimeout(API_URL, controller.signal);
    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch blog posts." },
        { status: response.status }
      );
    }

    let data: DummyJsonResponse;
    try {
      data = (await response.json()) as DummyJsonResponse;
    } catch {
      return NextResponse.json(
        { error: "Invalid response from source." },
        { status: 502 }
      );
    }

    if (!Array.isArray(data.posts)) {
      return NextResponse.json(
        { error: "Invalid response format." },
        { status: 502 }
      );
    }

    const posts: BlogPost[] = data.posts
      .slice(0, BLOG_LIMIT)
      .map(mapDummyPostToBlogPost);

    return NextResponse.json(posts);
  } catch (err) {
    clearTimeout(timeoutId);
    const isTimeout = err instanceof Error && err.name === "AbortError";
    return NextResponse.json(
      {
        error: isTimeout
          ? "Request timed out. Please try again."
          : "Failed to fetch blog posts. Please try again later.",
      },
      { status: 502 }
    );
  }
}

import { NextResponse } from "next/server";
import type { ApiResponse } from "@/lib/types";

// Document: https://api.slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=10
const API_URL =
  "https://api.slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=10";
const PROXY_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(API_URL)}`;
const TIMEOUT_MS = 6000; // 6s each — fail fast so Network tab shows response (502) within ~12s
const BLOG_LIMIT = 10;

function parseAndValidate(data: ApiResponse): NextResponse {
  if (!data.success || !Array.isArray(data.blogs)) {
    return NextResponse.json(
      { error: data.message || "Invalid response" },
      { status: 502 }
    );
  }
  return NextResponse.json(data.blogs.slice(0, BLOG_LIMIT));
}

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
  const tryFetch = async (url: string): Promise<Response | null> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetchWithTimeout(url, controller.signal);
      clearTimeout(timeoutId);
      return res;
    } catch {
      clearTimeout(timeoutId);
      return null;
    }
  };

  // 1. Try direct fetch first
  let response = await tryFetch(API_URL);

  // 2. If direct failed or non-ok, try proxy (fixes 502 when Sling Academy is down/slow)
  if (!response || !response.ok) {
    response = await tryFetch(PROXY_URL);
  }

  if (!response) {
    return NextResponse.json(
      {
        error:
          "The article source is temporarily unavailable. Check your internet and tap Retry.",
      },
      { status: 502 }
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch blog posts." },
      { status: response.status }
    );
  }

  let data: ApiResponse;
  try {
    data = (await response.json()) as ApiResponse;
  } catch {
    return NextResponse.json(
      { error: "Invalid response from source." },
      { status: 502 }
    );
  }

  return parseAndValidate(data);
}

import type { BlogPost } from "./types";

export interface DummyPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions?: { likes: number; dislikes: number };
  views?: number;
}

export interface DummyJsonResponse {
  posts: DummyPost[];
  total: number;
  skip: number;
  limit: number;
}

export function mapDummyPostToBlogPost(post: DummyPost): BlogPost {
  const category = post.tags?.[0] ?? "Uncategorized";
  const now = new Date().toISOString();
  return {
    id: post.id,
    user_id: post.userId,
    title: post.title,
    description: post.body.slice(0, 160) + (post.body.length > 160 ? "…" : ""),
    content_text: post.body,
    content_html: `<p>${post.body.replace(/\n/g, "</p><p>")}</p>`,
    photo_url: `https://picsum.photos/seed/${post.id}/400/300`,
    category,
    created_at: now,
    updated_at: now,
  };
}

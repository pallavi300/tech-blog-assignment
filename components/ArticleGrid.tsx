"use client";

import ArticleCard from "./ArticleCard";
import type { BlogPost } from "@/lib/types";

interface ArticleGridProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export default function ArticleGrid({ posts, onSelectPost }: ArticleGridProps) {
  return (
    <section
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="Blog articles"
    >
      {posts.map((post) => (
        <ArticleCard key={post.id} post={post} onSelect={onSelectPost} />
      ))}
    </section>
  );
}

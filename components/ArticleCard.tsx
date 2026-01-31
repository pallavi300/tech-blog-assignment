"use client";

import { useState } from "react";
import Image from "next/image";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface ArticleCardProps {
  post: BlogPost;
  onSelect: (post: BlogPost) => void;
}

export default function ArticleCard({ post, onSelect }: ArticleCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleClick = () => onSelect(post);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(post);
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
      aria-label={`Read article: ${post.title}`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
        {!imageLoaded && (
          <div
            className="absolute inset-0 animate-pulse bg-zinc-200"
            aria-hidden
          />
        )}
        <Image
          src={post.photo_url}
          alt={`Cover image for: ${post.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-300 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="mb-2 inline-block w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
          {post.category}
        </span>
        <h2 className="mb-2 line-clamp-2 text-lg font-semibold text-zinc-900">
          {post.title}
        </h2>
        <p className="mb-4 line-clamp-2 flex-1 text-sm text-zinc-600">
          {post.description}
        </p>
        <time
          dateTime={post.created_at}
          className="text-sm text-zinc-500"
        >
          {formatDate(post.created_at)}
        </time>
      </div>
    </article>
  );
}

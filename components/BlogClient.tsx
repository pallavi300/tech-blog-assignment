"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/lib/types";
import {
  filterBySearch,
  filterByCategory,
  getUniqueCategories,
} from "@/lib/utils";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import ArticleGrid from "./ArticleGrid";
import ArticleModal from "./ArticleModal";

interface BlogClientProps {
  posts: BlogPost[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = useMemo(() => {
    const bySearch = filterBySearch(posts, searchQuery);
    return filterByCategory(bySearch, activeCategory);
  }, [posts, searchQuery, activeCategory]);

  const categories = useMemo(() => getUniqueCategories(posts), [posts]);

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <p className="text-sm text-zinc-600">
          {filteredPosts.length === 0
            ? "No results found."
            : `Showing ${filteredPosts.length} of ${posts.length} articles`}
        </p>

        {filteredPosts.length > 0 ? (
          <ArticleGrid posts={filteredPosts} onSelectPost={setSelectedPost} />
        ) : (
          <div
            className="rounded-lg border border-zinc-200 bg-zinc-50 p-12 text-center"
            role="status"
          >
            <p className="text-zinc-600">No articles match your search or filter.</p>
            <p className="mt-2 text-sm text-zinc-500">
              Try adjusting your search or selecting a different category.
            </p>
          </div>
        )}
      </div>

      <ArticleModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </>
  );
}

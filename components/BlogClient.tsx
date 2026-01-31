"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchBlogPostsClient } from "@/lib/api";
import type { BlogPost } from "@/lib/types";
import {
  filterBySearch,
  filterByCategory,
  getUniqueCategories,
} from "@/lib/utils";
import { ArticleSchema } from "@/components/StructuredData";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import ArticleGrid from "./ArticleGrid";
import ArticleModal from "./ArticleModal";
import BlogContentSkeleton from "./BlogContentSkeleton";

export default function BlogClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBlogPostsClient();
      setPosts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    const bySearch = filterBySearch(posts, searchQuery);
    return filterByCategory(bySearch, activeCategory);
  }, [posts, searchQuery, activeCategory]);

  const categories = useMemo(() => getUniqueCategories(posts), [posts]);

  if (loading) {
    return <BlogContentSkeleton />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-8 text-center"
          role="alert"
        >
          <h2 className="text-lg font-semibold text-red-900">
            Unable to load articles
          </h2>
          <p className="mt-2 text-red-700">{error}</p>
          <p className="mt-4 text-sm text-red-600">
            The article source may be down or slow. Tap Retry to try again.
          </p>
          <button
            type="button"
            onClick={fetchPosts}
            className="mt-6 inline-block rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-center text-zinc-600">No blog posts available.</p>
      </div>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <ArticleSchema key={post.id} post={post} />
      ))}
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

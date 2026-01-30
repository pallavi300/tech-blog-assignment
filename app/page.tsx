import { fetchBlogPosts } from "@/lib/api";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import BlogClient from "@/components/BlogClient";
import { ArticleSchema } from "@/components/StructuredData";

export default async function Home() {
  let posts;
  let error: string | null = null;

  try {
    posts = await fetchBlogPosts();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load blog posts";
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Header />
      <main id="main-content">
        <Hero />
        {error ? (
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
                Please check your connection and try again later.
              </p>
              <a
                href="/"
                className="mt-6 inline-block rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
              >
                Retry
              </a>
            </div>
          </div>
        ) : posts && posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <ArticleSchema key={post.id} post={post} />
            ))}
            <BlogClient posts={posts} />
          </>
        ) : (
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="text-center text-zinc-600">No blog posts available.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

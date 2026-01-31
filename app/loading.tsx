import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import BlogContentSkeleton from "@/components/BlogContentSkeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Header />
      <main id="main-content">
        <Hero />
        <BlogContentSkeleton />
      </main>
      <Footer />
    </div>
  );
}

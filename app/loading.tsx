import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Header />
      <main id="main-content">
        <Hero />
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4">
            <div
              className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900"
              aria-hidden
            />
            <p className="text-zinc-600">Loading articles...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

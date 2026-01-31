import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import BlogClient from "@/components/BlogClient";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Header />
      <main id="main-content">
        <Hero />
        <BlogClient />
      </main>
      <Footer />
    </div>
  );
}

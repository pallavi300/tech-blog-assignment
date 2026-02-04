import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import BlogClient from "@/components/BlogClient";
import { WebSiteSchema } from "@/components/StructuredData";

const SITE_URL = import.meta.env.VITE_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "https://tech-blog.vercel.app");

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 antialiased">
      <Helmet>
        <title>Tech Blog | Tech Insights & Stories</title>
        <meta name="description" content="Discover the latest articles on technology, development, and innovation. A fast, SEO-optimized tech blog." />
        <meta property="og:title" content="Tech Blog | Tech Insights & Stories" />
        <meta property="og:description" content="Discover the latest articles on technology, development, and innovation." />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:site_name" content="Tech Blog" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tech Blog | Tech Insights & Stories" />
        <meta name="twitter:description" content="Discover the latest articles on technology, development, and innovation." />
      </Helmet>
      <WebSiteSchema />
      <Header />
      <main id="main-content">
        <Hero />
        <BlogClient />
      </main>
      <Footer />
    </div>
  );
}

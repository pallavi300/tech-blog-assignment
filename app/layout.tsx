import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WebSiteSchema } from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tech-blog.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tech Blog | Tech Insights & Stories",
  description:
    "Discover the latest articles on technology, development, and innovation. A fast, SEO-optimized tech blog.",
  openGraph: {
    title: "Tech Blog | Tech Insights & Stories",
    description:
      "Discover the latest articles on technology, development, and innovation.",
    url: SITE_URL,
    siteName: "Tech Blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Blog | Tech Insights & Stories",
    description:
      "Discover the latest articles on technology, development, and innovation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebSiteSchema />
        {children}
      </body>
    </html>
  );
}

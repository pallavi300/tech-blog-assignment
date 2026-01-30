# Tech Blog

A fast, SEO-optimized tech blog built with Next.js, TypeScript, and Tailwind CSS. Displays 10 articles from the Sling Academy API with search, category filtering, and article modals.

## Live Demo

- **Live URL**: [Deploy on Vercel to get your URL]
- **GitHub Repository**: [Add your repository URL]

## Technologies Used

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Vercel** (deployment)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

### Environment Variables (Optional)

- `NEXT_PUBLIC_SITE_URL` - Set to your deployment URL (e.g., `https://your-app.vercel.app`) for correct canonical URLs, sitemap, and Open Graph metadata.

## Features

- **Home Page**: Header, Hero section, Article grid (10 posts), Footer
- **Search**: Search across title, description, and content with debouncing
- **Category Filter**: Filter by unique categories from articles; shows active selection
- **Article Modal**: Full article view; close via X button, ESC key, or click outside
- **Responsive Design**: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- **Accessibility**: Skip link, keyboard navigation, focus management, ARIA attributes
- **Loading & Error States**: Skeleton/loading UI and graceful API error handling

## Lighthouse Audit Screenshots

**Target scores**: Performance 90+, SEO 95+, Accessibility 85+, Best Practices 90+

### Performance (Target: 90+)

![Lighthouse Performance](screenshots/lighthouse-performance.png)

### Accessibility (Target: 85+)

![Lighthouse Accessibility](screenshots/lighthouse-accessibility.png)

### Best Practices (Target: 90+)

![Lighthouse Best Practices](screenshots/lighthouse-best-practices.png)

### SEO (Target: 95+)

![Lighthouse SEO](screenshots/lighthouse-seo.png)

---

To generate these screenshots: Run `npm run build && npm run start`, then use Chrome DevTools Lighthouse tab or `npx lighthouse http://localhost:3000 --view` to capture each category and save to the `screenshots/` directory.

## SEO Strategy

### Meta Tags

- **Page Title** (≤60 chars): "Tech Blog | Tech Insights & Stories" for clear branding
- **Meta Description** (≤160 chars): Descriptive summary for search snippets
- **Open Graph**: `og:title`, `og:description`, `og:image` for social sharing
- **Twitter Card**: `summary_large_image` with title, description, and image

### Semantic HTML

- `header`, `main`, `article`, `section`, `footer`, `nav`, `time` used throughout
- Single `<h1>` per page (Hero section)
- Proper heading hierarchy (h1 → h2 → h3)

### Image Optimization

- Next.js `Image` component for all images with responsive `sizes`
- Descriptive `alt` text (e.g., "Cover image for: {title}")
- Lazy loading enabled for below-fold images
- Remote images from `api.slingacademy.com` configured in `next.config.ts`

### Performance Optimizations

- Server-side data fetching with ISR (`revalidate: 3600`)
- Debounced search (300ms) to reduce re-renders
- Static generation for metadata, robots.txt, sitemap

## Search and Filter Implementation

- **Search**: Client-side filtering across `title`, `description`, and `content_text` (case-insensitive). Debounced by 300ms.
- **Category Filter**: Unique categories derived from fetched articles. "All" plus per-category pills.
- **Combined**: Search and category filters apply together. Results count displayed; "No results" message when empty.

## Structured Data (JSON-LD)

- **WebSite schema** on homepage for site-level search visibility
- **Article schema** for each blog post (headline, description, image, dates, author)

## Technical SEO

- `robots.txt`: Allow all crawlers, reference sitemap
- `sitemap.xml`: Homepage URL with lastModified and changeFrequency
- Proper URL structure (clean routes)

## Challenges Faced

- **API Integration**: Handled network errors and invalid responses with try/catch and user-friendly error UI
- **Modal Focus Trap**: Implemented keyboard focus trapping and return-focus-on-close for accessibility
- **Search Debouncing**: Balanced responsiveness with performance using 300ms debounce

## License

MIT

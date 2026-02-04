# Tech Blog

A fast, SEO-optimized tech blog built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. Displays 10 articles from the [DummyJSON Posts API](https://dummyjson.com/posts) with search, category filtering, and article modals.

## Live Demo

- **Live URL**: [Deploy on Vercel/Netlify to get your URL]
- **GitHub Repository**: [https://github.com/pallavi300/tech-blog-assignment](https://github.com/pallavi300/tech-blog-assignment)

## Technologies Used

- **React 18**
- **Vite** (build tool)
- **TypeScript**
- **Tailwind CSS 4**
- **react-helmet-async** (meta tags for SEO)
- **Vercel / Netlify** (deployment)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

Preview serves the built app from `dist/` (e.g. at http://localhost:4173).

### Environment Variables (Optional)

- `VITE_SITE_URL` - Set to your deployment URL (e.g. `https://your-app.vercel.app`) for canonical URLs and JSON-LD.

### Data Source

- Fetches 10 posts from [DummyJSON Posts API](https://dummyjson.com/posts) (`?limit=10`) **from the browser**. Response is mapped to the app’s `BlogPost` shape (category from first tag, placeholder images from Picsum). No pagination per requirements.

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

To generate these screenshots: Run `npm run build && npm run preview`, then use Chrome DevTools Lighthouse tab or `npx lighthouse http://localhost:4173 --view` to capture each category and save to the `screenshots/` directory.

## SEO Strategy

### Meta Tags

- **Page Title** (≤60 chars): "Tech Blog | Tech Insights & Stories" for clear branding
- **Meta Description** (≤160 chars): Descriptive summary for search snippets
- **Open Graph**: `og:title`, `og:description`, `og:url` for social sharing
- **Twitter Card**: `summary_large_image` with title and description
- **react-helmet-async** used to set title and meta tags in the document head

### Semantic HTML

- `header`, `main`, `article`, `section`, `footer`, `nav`, `time` used throughout
- Single `<h1>` per page (Hero section)
- Proper heading hierarchy (h1 → h2 → h3)

### Image Optimization

- Native `<img>` with `loading="lazy"` for below-fold images
- Descriptive `alt` text (e.g. "Cover image for: {title}")
- Placeholder images from Picsum (no extra config needed for client-side)

### Performance Optimizations

- Client-side fetch from [DummyJSON Posts API](https://dummyjson.com/posts?limit=10) (CORS allowed by DummyJSON)
- Response mapped to `BlogPost` in the client; error handling with Retry button
- Debounced search (300ms) to reduce re-renders
- Image lazy loading and skeleton placeholders

## Search and Filter Implementation

- **Search**: Client-side filtering across `title`, `description`, and `content_text` (as required). Case-insensitive match in any of the three fields. Debounced by 300ms.
- **Category Filter**: Unique categories derived from fetched articles (no hardcoded list). "All" plus per-category pills with active state styling.
- **Combined**: Search and category filters apply together. Results count ("Showing X of Y articles") displayed; "No results" message when empty.

## Structured Data (JSON-LD)

- **WebSite schema** on homepage for site-level search visibility
- **Article schema** for each blog post (headline, description, image, dates, author)

## Challenges Faced

- **API Integration**: Handled network errors and invalid responses with try/catch and user-friendly error UI with Retry button
- **API integration**: Using [DummyJSON Posts API](https://dummyjson.com/posts) for blog data. Client fetches directly (CORS allowed); response mapped to app’s `BlogPost` shape in the browser.
- **Modal Focus Trap**: Implemented keyboard focus trapping and return-focus-on-close for accessibility
- **Search Debouncing**: Balanced responsiveness and performance using 300ms debounce with cleanup on unmount

## License

MIT

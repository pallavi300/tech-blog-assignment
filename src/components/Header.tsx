export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:block focus:h-auto focus:w-auto focus:overflow-visible focus:rounded focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-white focus:no-underline focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="/"
          className="text-xl font-bold tracking-tight text-zinc-900 hover:text-zinc-700"
        >
          Tech Blog
        </a>
        <ul className="flex gap-6">
          <li>
            <a
              href="/"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
            >
              Home
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

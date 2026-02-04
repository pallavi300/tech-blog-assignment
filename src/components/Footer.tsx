export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} Tech Blog. All rights reserved.
          </p>
          <nav>
            <ul className="flex gap-6">
              <li>
                <a
                  href="/"
                  className="text-sm text-zinc-600 hover:text-zinc-900"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 hover:text-zinc-900"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

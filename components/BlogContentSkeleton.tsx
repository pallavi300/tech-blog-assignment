export default function BlogContentSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="h-12 w-64 animate-pulse rounded-lg bg-zinc-200" />
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-9 w-20 animate-pulse rounded-full bg-zinc-200"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white"
          >
            <div className="aspect-video w-full animate-pulse bg-zinc-200" />
            <div className="flex flex-1 flex-col gap-2 p-4">
              <div className="h-5 w-16 animate-pulse rounded-full bg-zinc-200" />
              <div className="h-5 w-full animate-pulse rounded bg-zinc-200" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-200" />
              <div className="mt-2 h-4 w-24 animate-pulse rounded bg-zinc-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const NoteCardSkeleton = () => {
  return (
    <article
      aria-hidden="true"
      className="rounded-lg border border-white/20 bg-black/30 p-4"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-3 w-40 animate-pulse rounded-lg bg-white/15" />
          <div className="h-5 w-56 max-w-full animate-pulse rounded-lg bg-white/20" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-9 w-14 animate-pulse rounded-lg bg-white/10" />
          <div className="h-9 w-9 animate-pulse rounded-lg bg-white/10" />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-3 w-full animate-pulse rounded-lg bg-white/15" />
        <div className="h-3 w-11/12 animate-pulse rounded-lg bg-white/15" />
        <div className="h-3 w-3/5 animate-pulse rounded-lg bg-white/15" />
      </div>

      <div className="mt-4 h-3 w-32 animate-pulse rounded-lg bg-white/10" />
    </article>
  );
};

export const NoteCardsSkeleton = () => {
  return (
    <div className="grid gap-3 md:grid-cols-2" role="status">
      {Array.from({ length: 4 }, (_, index) => (
        <NoteCardSkeleton key={index} />
      ))}
      <span className="sr-only">Loading notes</span>
    </div>
  );
};

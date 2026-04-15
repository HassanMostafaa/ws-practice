"use client";

type PaginationProps = {
  disabled?: boolean;
  onPageChange: (pageNumber: number) => void;
  pageNumber: number;
  totalPages: number;
};

const getVisiblePages = (pageNumber: number, totalPages: number) => {
  const firstPage = Math.max(1, pageNumber - 1);
  const lastPage = Math.min(totalPages, firstPage + 2);

  return Array.from(
    { length: lastPage - firstPage + 1 },
    (_, index) => firstPage + index,
  );
};

export const Pagination = ({
  disabled = false,
  onPageChange,
  pageNumber,
  totalPages,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(pageNumber, totalPages);
  const canGoPrevious = pageNumber > 1;
  const canGoNext = pageNumber < totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-end gap-2"
    >
      <button
        className="rounded-lg border border-white/20 px-3 py-2 text-sm text-white/70 hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled || !canGoPrevious}
        onClick={() => onPageChange(pageNumber - 1)}
        type="button"
      >
        Previous
      </button>

      {visiblePages.map((page) => {
        const isActive = page === pageNumber;

        return (
          <button
            aria-current={isActive ? "page" : undefined}
            className={`min-w-10 rounded-lg border px-3 py-2 text-sm ${
              isActive
                ? "border-white bg-white text-black"
                : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
            } disabled:cursor-not-allowed disabled:opacity-50`}
            disabled={disabled || isActive}
            key={page}
            onClick={() => onPageChange(page)}
            type="button"
          >
            {page}
          </button>
        );
      })}

      <button
        className="rounded-lg border border-white/20 px-3 py-2 text-sm text-white/70 hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled || !canGoNext}
        onClick={() => onPageChange(pageNumber + 1)}
        type="button"
      >
        Next
      </button>
    </nav>
  );
};

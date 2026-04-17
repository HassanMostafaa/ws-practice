"use client";

import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export const ServerHint = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPinned, setIsPinned] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  const isOpen = isHovered || isPinned;

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsPinned(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative inline-flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={() => setIsPinned((prev) => !prev)}
        aria-label="Show server hint"
        aria-expanded={isOpen}
        className="inline-flex items-center justify-center rounded-full text-white/70 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
      >
        <AiOutlineExclamationCircle className="size-5" />
      </button>

      <div
        className={[
          "absolute top-full z-50 mt-3 rounded-2xl border border-white/15 bg-background p-3 shadow-xl transition-all duration-200",
          "w-64 max-w-[calc(100vw-1rem)]",

          // ✅ mobile: anchor left, grow right
          "-left-6",

          // ✅ desktop: center
          "md:left-1/2 md:-translate-x-1/2",

          // arrow
          "before:absolute before:top-0 before:size-3 before:-translate-y-1/2 before:rotate-45 before:border-l before:border-t before:border-white/15 before:bg-background",

          // ✅ arrow position follows anchor
          "before:left-7 md:before:left-1/2 md:before:-translate-x-1/2",

          isOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0",
        ].join(" ")}
        role="tooltip"
      >
        <p className="text-sm leading-6 text-white/80">
          Experimental feature. This is currently just a string stored in the
          database and changed manually.
        </p>
      </div>
    </div>
  );
};

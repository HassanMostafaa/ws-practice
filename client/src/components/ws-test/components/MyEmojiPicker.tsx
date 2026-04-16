"use client";

import { EmojiPicker } from "frimousse";
import { useEffect, useRef, useState } from "react";
import { FaRegSmileBeam } from "react-icons/fa";

export function MyEmojiPicker({
  draftMessage,
  onDraftMessageChange,
}: {
  draftMessage: string;
  onDraftMessageChange: (message: string) => void;
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerWrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!showEmojiPicker) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowEmojiPicker(false);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (!pickerWrapperRef.current?.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [showEmojiPicker]);

  return (
    <span
      ref={pickerWrapperRef}
      className="absolute top-1/2 right-4 hidden -translate-y-1/2 items-center justify-center md:flex"
    >
      <button
        type="button"
        aria-expanded={showEmojiPicker}
        aria-label={showEmojiPicker ? "Close emoji picker" : "Open emoji picker"}
        className="flex size-8 items-center justify-center rounded-md border border-white/10 bg-white/10 text-white/70 transition-colors hover:border-white/20 hover:bg-white/20 hover:text-white active:bg-white/30 aria-expanded:border-white/25 aria-expanded:bg-white/20 aria-expanded:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
        onClick={() => setShowEmojiPicker((prev) => !prev)}
      >
        <FaRegSmileBeam size={20} />
      </button>
      {showEmojiPicker && (
        <EmojiPicker.Root
          itemType="button"
          onEmojiSelect={({ emoji }) => {
            onDraftMessageChange(draftMessage + emoji);
          }}
          className="isolate absolute bottom-8 border border-white/10 shadow-lg rounded-xl! right-0 z-10 flex h-92 w-fit flex-col bg-white dark:bg-neutral-900"
        >
          <EmojiPicker.Search className="z-10 mx-2 mt-2 appearance-none rounded-md bg-neutral-100 px-2.5 py-2 text-sm dark:bg-neutral-800" />
          <EmojiPicker.Viewport className="relative flex-1 outline-hidden">
            <EmojiPicker.Loading className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm dark:text-neutral-500">
              Loading…
            </EmojiPicker.Loading>
            <EmojiPicker.Empty className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm dark:text-neutral-500">
              No emoji found.
            </EmojiPicker.Empty>
            <EmojiPicker.List
              className="select-none pb-1.5"
              components={{
                CategoryHeader: ({ category, ...props }) => (
                  <div
                    className="bg-white px-3 pt-3 pb-1.5 font-medium text-neutral-600 text-xs dark:bg-neutral-900 dark:text-neutral-400"
                    {...props}
                  >
                    {category.label}
                  </div>
                ),
                Row: ({ children, ...props }) => (
                  <div className="scroll-my-1.5 px-1.5" {...props}>
                    {children}
                  </div>
                ),
                Emoji: ({ emoji, ...props }) => (
                  <button
                    className="flex size-8 items-center justify-center rounded-md text-lg data-active:bg-neutral-100 dark:data-active:bg-neutral-800"
                    {...props}
                    type="button"
                  >
                    {emoji.emoji}
                  </button>
                ),
              }}
            />
          </EmojiPicker.Viewport>
        </EmojiPicker.Root>
      )}
    </span>
  );
}

"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useNotesStore } from "../store";
import type { INote, NoteFormValues } from "../utils/types";
import { NoteButton } from "./NoteButton";
import { NoteField } from "./NoteField";

type NoteDialogProps = {
  note: INote | null;
  onSubmit: (values: NoteFormValues) => void;
};

export const NoteDialog = ({ note, onSubmit }: NoteDialogProps) => {
  const closeDialog = useNotesStore((state) => state.closeDialog);
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [username, setUsername] = useState(note?.username ?? "");

  const isEditing = Boolean(note);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextTitle = title.trim();
    const nextContent = content.trim();
    const nextUsername = username.trim();

    if (!nextTitle || !nextContent || nextUsername.length <= 3) return;

    onSubmit({
      content: nextContent,
      title: nextTitle,
      username: nextUsername,
    });
  };

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
      role="dialog"
    >
      <form
        className="w-full max-w-lg overflow-hidden rounded-lg border border-white/25 bg-[#0a0a0a] shadow-2xl"
        onSubmit={handleSubmit}
      >
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 px-4 py-3">
          <div>
            <p className="text-xs text-white/60">
              {isEditing ? "Edit note" : "New note"}
            </p>
            <h2 className="text-base font-semibold text-white">
              {isEditing ? "Update note" : "Post a note"}
            </h2>
          </div>

          <NoteButton onClick={closeDialog}>Close</NoteButton>
        </header>

        <div className="space-y-4 p-4">
          <NoteField
            label="Title"
            onChange={setTitle}
            placeholder="Note title"
            value={title}
          />
          <NoteField
            helperText="Must be longer than 3 characters."
            label="Username"
            onChange={setUsername}
            placeholder="Author username"
            value={username}
          />
          <NoteField
            label="Content"
            multiline
            onChange={setContent}
            placeholder="Write the note"
            value={content}
          />
        </div>

        <footer className="flex flex-wrap justify-end gap-2 border-t border-white/20 p-4">
          <NoteButton onClick={closeDialog}>Cancel</NoteButton>
          <NoteButton
            disabled={
              !title.trim() || !content.trim() || username.trim().length <= 3
            }
            type="submit"
            variant="primary"
          >
            {isEditing ? "Save changes" : "Post note"}
          </NoteButton>
        </footer>
      </form>
    </div>
  );
};

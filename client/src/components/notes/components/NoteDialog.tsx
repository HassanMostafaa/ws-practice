"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useNotesStore } from "../store";
import type {
  INote,
  NoteFormError,
  NoteFormValues,
  NoteSubmitResult,
} from "../utils/types";
import { NoteButton } from "./NoteButton";
import { NoteField } from "./NoteField";
import { MdErrorOutline } from "react-icons/md";
import { GrClose } from "react-icons/gr";

type NoteDialogProps = {
  note: INote | null;
  onSubmit: (values: NoteFormValues) => Promise<NoteSubmitResult>;
};

export const NoteDialog = ({ note, onSubmit }: NoteDialogProps) => {
  const closeDialog = useNotesStore((state) => state.closeDialog);

  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [username, setUsername] = useState(note?.username ?? "");
  const [formErrors, setFormErrors] = useState<NoteFormError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = Boolean(note);

  const clearFieldError = (inputName: NoteFormError["input"]) => {
    setFormErrors((prev) =>
      prev.filter((err) => err.input !== inputName && err.input !== "form"),
    );
  };

  const handleFieldChange = (
    inputName: "title" | "content" | "username",
    value: string,
  ) => {
    clearFieldError(inputName);

    if (inputName === "title") {
      setTitle(value);
      return;
    }

    if (inputName === "content") {
      setContent(value);
      return;
    }

    setUsername(value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const nextTitle = title.trim();
    const nextContent = content.trim();
    const nextUsername = username.trim();

    const nextErrors: NoteFormError[] = [];

    if (!nextTitle) {
      nextErrors.push({
        input: "title",
        message: "Title is required",
      });
    }

    if (!nextContent) {
      nextErrors.push({
        input: "content",
        message: "Content is required",
      });
    }

    if (!nextUsername || nextUsername.length <= 3) {
      nextErrors.push({
        input: "username",
        message: "Username is required and must be longer than 3 characters",
      });
    }

    if (nextErrors.length > 0) {
      setFormErrors(nextErrors);
      return;
    }

    setFormErrors([]);

    setIsSubmitting(true);

    try {
      const result = await onSubmit({
        content: nextContent,
        title: nextTitle,
        username: nextUsername,
      });

      setIsSubmitting(false);

      if (result.status === "error") {
        setFormErrors(result.errors);
        return;
      }

      closeDialog();
    } catch {
      setIsSubmitting(false);
      setFormErrors([
        {
          input: "form",
          message: "Failed to save note.",
        },
      ]);
    }
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

          <NoteButton disabled={isSubmitting} onClick={closeDialog}>
            <GrClose />
          </NoteButton>
        </header>

        <div className="space-y-4 p-4">
          <NoteField
            name="title"
            label="Title"
            onChange={(value) => handleFieldChange("title", value)}
            placeholder="Note title"
            value={title}
            required
            errorText={formErrors.find((err) => err.input === "title")?.message}
          />

          <NoteField
            helperText="Must be longer than 3 characters."
            label="Username"
            onChange={(value) => handleFieldChange("username", value)}
            placeholder="Author username"
            value={username}
            name="username"
            required
            errorText={
              formErrors.find((err) => err.input === "username")?.message
            }
          />

          <NoteField
            label="Content"
            multiline
            name="content"
            errorText={
              formErrors.find((err) => err.input === "content")?.message
            }
            onChange={(value) => handleFieldChange("content", value)}
            placeholder="Write the note"
            value={content}
          />
        </div>

        {formErrors.length > 0 && (
          <div className="space-y-2 border-t border-white/20 p-4">
            {formErrors.map((error, index) => (
              <p
                key={`create-new-note-form-err-${index}`}
                className="flex items-start gap-1 rounded-lg border border-red-400 bg-red-400/10 p-2 text-sm text-red-500"
              >
                <MdErrorOutline size={16} className="min-w-4 translate-y-0.5" />
                {error.message}
              </p>
            ))}
          </div>
        )}

        <footer className="flex flex-wrap justify-end gap-2 border-t border-white/20 p-4">
          <NoteButton disabled={isSubmitting} onClick={closeDialog}>
            Cancel
          </NoteButton>

          <NoteButton disabled={isSubmitting} type="submit" variant="primary">
            {isSubmitting
              ? isEditing
                ? "Saving..."
                : "Posting..."
              : isEditing
                ? "Save changes"
                : "Post note"}
          </NoteButton>
        </footer>
      </form>
    </div>
  );
};

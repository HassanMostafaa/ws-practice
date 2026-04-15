import type { INote } from "../utils/types";
import { NoteButton } from "./NoteButton";

type NoteDetailsModalProps = {
  note: INote;
  onClose: () => void;
  onEdit: (noteId: number) => void;
};

const formatNoteDate = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const NoteDetailsModal = ({
  note,
  onClose,
  onEdit,
}: NoteDetailsModalProps) => {
  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
      role="dialog"
    >
      <article className="w-full max-w-2xl overflow-hidden rounded-lg border border-white/25 bg-[#0a0a0a] shadow-2xl">
        <header className="border-b border-white/20 px-4 py-3">
          <p className="text-xs text-white/50">
            {note.username} - Created {formatNoteDate(note.created_at)} -
            Updated {formatNoteDate(note.updated_at)}
          </p>
          <h2 className="mt-1 break-words text-xl font-semibold text-white">
            {note.title}
          </h2>
        </header>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          <p className="whitespace-pre-wrap break-words text-sm leading-6 text-white/75">
            {note.content}
          </p>
        </div>

        <footer className="flex flex-wrap justify-end gap-2 border-t border-white/20 p-4">
          <NoteButton onClick={() => onEdit(note.id)}>Edit</NoteButton>
          <NoteButton onClick={onClose} variant="primary">
            Close
          </NoteButton>
        </footer>
      </article>
    </div>
  );
};

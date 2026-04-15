import type { INote } from "../utils/types";
import { NoteButton } from "./NoteButton";
import { NoteCheckbox } from "./NoteCheckbox";

type NoteCardProps = {
  isSelected: boolean;
  note: INote;
  onEdit: (noteId: number) => void;
  onToggleSelected: (noteId: number) => void;
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

export const NoteCard = ({
  isSelected,
  note,
  onEdit,
  onToggleSelected,
}: NoteCardProps) => {
  return (
    <article
      className={`rounded-lg border bg-black/30 p-4 ${
        isSelected ? "border-cyan-300/60" : "border-white/20"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-white/50">
            {note.username} - Created {formatNoteDate(note.created_at)}
          </p>
          <h2 className="mt-1 break-words text-lg font-semibold text-white">
            {note.title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <NoteButton onClick={() => onEdit(note.id)}>Edit</NoteButton>
          <NoteCheckbox
            checked={isSelected}
            label=""
            onChange={() => onToggleSelected(note.id)}
          />
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-white/70">{note.content}</p>
      <p className="mt-4 text-xs text-white/40">
        Updated {formatNoteDate(note.updated_at)}
      </p>
    </article>
  );
};

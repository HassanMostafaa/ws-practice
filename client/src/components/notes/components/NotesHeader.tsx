import { NoteButton } from "./NoteButton";

type NotesHeaderProps = {
  areAllNotesSelected: boolean;
  hasSelectedNotes: boolean;
  isDeleting: boolean;
  onCreate: () => void;
  onDeleteSelected: () => void;
  onDeselectAll: () => void;
  onSelectAll: () => void;
  selectedNoteCount: number;
};

export const NotesHeader = ({
  areAllNotesSelected,
  hasSelectedNotes,
  isDeleting,
  onCreate,
  onDeleteSelected,
  onDeselectAll,
  onSelectAll,
  selectedNoteCount,
}: NotesHeaderProps) => {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 rounded-lg  border-white/25 bg-black/30 px-4 py-5">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase text-white/60">
          Dummy notes
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white max-sm:text-2xl">
          Notes
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/70">
          Local notes for now. Create, edit, select, and delete notes in the
          client while the server-side note endpoints are still being wired up.
        </p>
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        {hasSelectedNotes ? (
          <>
            <NoteButton
              disabled={isDeleting}
              onClick={onDeleteSelected}
              variant="danger"
            >
              {isDeleting
                ? "Deleting..."
                : `Delete selected (${selectedNoteCount})`}
            </NoteButton>
            <NoteButton
              disabled={areAllNotesSelected || isDeleting}
              onClick={onSelectAll}
            >
              Select all
            </NoteButton>
            <NoteButton disabled={isDeleting} onClick={onDeselectAll}>
              Deselect all
            </NoteButton>
          </>
        ) : null}

        <NoteButton disabled={isDeleting} onClick={onCreate} variant="primary">
          New note
        </NoteButton>
      </div>
    </div>
  );
};

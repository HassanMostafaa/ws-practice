"use client";

import { Pagination } from "@/components/pagination/Pagination";
import { NoteCard } from "./components/NoteCard";
import { NoteCardsSkeleton } from "./components/NoteCardSkeleton";
import { NoteDetailsModal } from "./components/NoteDetailsModal";
import { NoteDialog } from "./components/NoteDialog";
import { NotesPaginationDetails } from "./components/NotesPaginationDetails";
import { NotesHeader } from "./components/NotesHeader";
import { NotesStateMessage } from "./components/NotesStateMessage";
import type { IPaginatedNotes } from "./utils/types";
import { useNotes } from "./utils/useNotes";

type NotesProps = {
  serverData?: IPaginatedNotes;
};

export const Notes = ({ serverData }: NotesProps) => {
  const {
    areAllNotesSelected,
    closeDetailsDialog,
    detailsNote,
    errorMessage,
    handleDeleteSelectedNotes,
    handleDeselectAllNotes,
    handlePageChange,
    handleSaveNote,
    handleSelectAllNotes,
    hasSelectedNotes,
    isDeleting,
    isDialogOpen,
    isLoading,
    notes,
    openCreateDialog,
    openDetailsDialog,
    openEditDialog,
    pageNumber,
    pageSize,
    paginationData,
    selectedNote,
    selectedNoteCount,
    selectedNoteIds,
    toggleSelectedNoteId,
  } = useNotes({ serverData });

  return (
    <section className="space-y-6">
      <NotesHeader
        areAllNotesSelected={areAllNotesSelected}
        hasSelectedNotes={hasSelectedNotes}
        onCreate={openCreateDialog}
        onDeleteSelected={handleDeleteSelectedNotes}
        onDeselectAll={handleDeselectAllNotes}
        onSelectAll={handleSelectAllNotes}
        isDeleting={isDeleting}
        selectedNoteCount={selectedNoteCount}
      />

      {errorMessage ? (
        <NotesStateMessage
          message={errorMessage}
          title="Notes request failed"
          tone="error"
        />
      ) : null}

      {isLoading ? (
        <NoteCardsSkeleton />
      ) : notes.length === 0 ? (
        <NotesStateMessage
          message="There are no notes on this page yet."
          title="No notes yet"
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {notes.map((note) => (
            <NoteCard
              isSelected={selectedNoteIds.includes(note.id)}
              key={note.id}
              note={note}
              onEdit={openEditDialog}
              onOpenDetails={openDetailsDialog}
              onToggleSelected={toggleSelectedNoteId}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center gap-4 items-center md:justify-between  flex-col md:flex-row">
        <NotesPaginationDetails
          pageNumber={pageNumber}
          pageSize={pageSize}
          total={paginationData.total}
        />
        <Pagination
          disabled={isLoading || isDeleting}
          onPageChange={handlePageChange}
          pageNumber={pageNumber}
          totalPages={paginationData.totalPages}
        />
      </div>

      {detailsNote ? (
        <NoteDetailsModal
          note={detailsNote}
          onClose={closeDetailsDialog}
          onEdit={(noteId) => {
            closeDetailsDialog();
            openEditDialog(noteId);
          }}
        />
      ) : null}

      {isDialogOpen ? (
        <NoteDialog
          key={selectedNote?.id ?? "create-note"}
          note={selectedNote}
          onSubmit={handleSaveNote}
        />
      ) : null}
    </section>
  );
};

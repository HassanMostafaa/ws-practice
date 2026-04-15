"use client";

import { useMemo, useState } from "react";
import { deleteNotesByIds } from "@/service/notes/deleteNotesByIds";
import { getAllNotes } from "@/service/notes/getAllNotes.service";
import { useNotesStore } from "../store";
import type { IPaginatedNotes, NoteFormValues } from "../utils/types";

type UseNotesProps = {
  serverData?: IPaginatedNotes;
};

export const useNotes = ({ serverData }: UseNotesProps = {}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationData, setPaginationData] = useState<IPaginatedNotes>(
    () =>
      serverData ?? {
        notes: [],
        pageNumber: 1,
        pageSize: 5,
        total: 0,
        totalPages: 0,
      },
  );
  const clearSelectedNoteIds = useNotesStore(
    (state) => state.clearSelectedNoteIds,
  );
  const closeDialog = useNotesStore((state) => state.closeDialog);
  const closeDetailsDialog = useNotesStore(
    (state) => state.closeDetailsDialog,
  );
  const detailsNoteId = useNotesStore((state) => state.detailsNoteId);
  const editNoteId = useNotesStore((state) => state.editNoteId);
  const isDialogOpen = useNotesStore((state) => state.isDialogOpen);
  const openCreateDialog = useNotesStore((state) => state.openCreateDialog);
  const openDetailsDialog = useNotesStore(
    (state) => state.openDetailsDialog,
  );
  const openEditDialog = useNotesStore((state) => state.openEditDialog);
  const pageNumber = useNotesStore((state) => state.pageNumber);
  const pageSize = useNotesStore((state) => state.pageSize);
  const selectedNoteIds = useNotesStore((state) => state.selectedNoteIds);
  const setPageNumber = useNotesStore((state) => state.setPageNumber);
  const setSelectedNoteIds = useNotesStore((state) => state.setSelectedNoteIds);
  const toggleSelectedNoteId = useNotesStore(
    (state) => state.toggleSelectedNoteId,
  );
  const notes = paginationData.notes;

  const detailsNote = useMemo(() => {
    if (!detailsNoteId) return null;

    return notes.filter((note) => note.id === detailsNoteId)[0] ?? null;
  }, [detailsNoteId, notes]);

  const selectedNote = useMemo(() => {
    if (!editNoteId) return null;

    return notes.filter((note) => note.id === editNoteId)[0] ?? null;
  }, [editNoteId, notes]);

  const selectedNoteCount = selectedNoteIds.length;
  const hasSelectedNotes = selectedNoteCount > 0;
  const areAllNotesSelected =
    notes.length > 0 && selectedNoteCount === notes.length;

  const loadNotes = async (nextPageNumber: number) => {
    setPageNumber(nextPageNumber);
    setIsLoading(true);
    setErrorMessage("");

    const response = await getAllNotes({
      pageNumber: nextPageNumber,
      pageSize,
    });

    setIsLoading(false);

    if (response.status === "error" || !response.data) {
      setErrorMessage(response.message || "Failed to fetch notes.");
      return;
    }

    setPaginationData(response.data);
    setPageNumber(response.data.pageNumber);
    clearSelectedNoteIds();
  };

  const handleDeleteSelectedNotes = async () => {
    if (selectedNoteIds.length === 0) return;

    setIsDeleting(true);
    setErrorMessage("");

    const response = await deleteNotesByIds({ ids: selectedNoteIds });

    setIsDeleting(false);

    if (response.status === "error") {
      setErrorMessage(response.message || "Failed to delete notes.");
      return;
    }

    if (editNoteId && selectedNoteIds.includes(editNoteId)) {
      closeDialog();
    }

    const remainingTotal = Math.max(
      0,
      paginationData.total - selectedNoteIds.length,
    );
    const nextTotalPages = Math.ceil(remainingTotal / pageSize);
    const nextPageNumber = Math.min(pageNumber, Math.max(1, nextTotalPages));

    clearSelectedNoteIds();
    await loadNotes(nextPageNumber);
  };

  const handleSaveNote = (values: NoteFormValues) => {
    const updatedAt = new Date().toISOString();

    if (editNoteId) {
      setPaginationData((currentData) => ({
        ...currentData,
        notes: currentData.notes.map((note) => {
          if (note.id !== editNoteId) return note;

          return {
            ...note,
            content: values.content,
            title: values.title,
            updated_at: updatedAt,
            username: values.username,
          };
        }),
      }));
    } else {
      setPaginationData((currentData) => ({
        ...currentData,
        notes: [
          {
            content: values.content,
            created_at: updatedAt,
            id: Date.now(),
            title: values.title,
            updated_at: updatedAt,
            username: values.username,
          },
          ...currentData.notes,
        ].slice(0, pageSize),
        total: currentData.total + 1,
        totalPages: Math.ceil((currentData.total + 1) / pageSize),
      }));
    }

    closeDialog();
  };

  return {
    areAllNotesSelected,
    closeDetailsDialog,
    detailsNote,
    handleDeleteSelectedNotes,
    handleDeselectAllNotes: clearSelectedNoteIds,
    handlePageChange: loadNotes,
    handleSaveNote,
    handleSelectAllNotes: () =>
      setSelectedNoteIds(notes.map((note) => note.id)),
    hasSelectedNotes,
    errorMessage,
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
    editNoteId,
  };
};

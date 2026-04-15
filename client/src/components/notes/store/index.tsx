"use client";

import { create } from "zustand";

type NoteDialogState = {
  editNoteId: number;
  isDialogOpen: boolean;
  pageNumber: number;
  pageSize: number;
  selectedNoteIds: number[];
  closeDialog: () => void;
  clearSelectedNoteIds: () => void;
  openCreateDialog: () => void;
  openEditDialog: (editNoteId: number) => void;
  setPageNumber: (pageNumber: number) => void;
  setSelectedNoteIds: (selectedNoteIds: number[]) => void;
  toggleSelectedNoteId: (noteId: number) => void;
};

export const useNotesStore = create<NoteDialogState>((set) => ({
  editNoteId: 0,
  isDialogOpen: false,
  pageNumber: 1,
  pageSize: 5,
  selectedNoteIds: [],
  closeDialog: () => set({ editNoteId: 0, isDialogOpen: false }),
  clearSelectedNoteIds: () => set({ selectedNoteIds: [] }),
  openCreateDialog: () => set({ editNoteId: 0, isDialogOpen: true }),
  openEditDialog: (editNoteId) => set({ editNoteId, isDialogOpen: true }),
  setPageNumber: (pageNumber) => set({ pageNumber }),
  setSelectedNoteIds: (selectedNoteIds) => set({ selectedNoteIds }),
  toggleSelectedNoteId: (noteId) =>
    set((state) => {
      if (state.selectedNoteIds.includes(noteId)) {
        return {
          selectedNoteIds: state.selectedNoteIds.filter(
            (selectedNoteId) => selectedNoteId !== noteId,
          ),
        };
      }

      return {
        selectedNoteIds: [...state.selectedNoteIds, noteId],
      };
    }),
}));

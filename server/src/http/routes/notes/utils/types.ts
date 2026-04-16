export type INote = {
  id: number;
  title: string;
  content: string;
  username: string;
  created_at: string;
  updated_at: string;
};

export type INotes = {
  notes: INote[];
  total: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

export type GetAllNotesFromDBParams = {
  pageNumber?: number;
  pageSize?: number;
};

export type BodyNoteInput = {
  title?: string;
  content?: string | null;
  username?: string;
};

export type CreateNoteInput = {
  title: string;
  username: string;
  content?: string | null;
};

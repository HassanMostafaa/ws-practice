export type INote = {
  id: number;
  title: string;
  content: string;
  username: string;
  created_at: string;
  updated_at: string;
};

export type IPaginatedNotes = {
  pageNumber: number;
  pageSize: number;
  notes: INote[];
  total: number;
  totalPages: number;
};

export type INotes = {
  notes: INote[];
  total: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

export type NoteFormValues = {
  content: string;
  title: string;
  username: string;
};

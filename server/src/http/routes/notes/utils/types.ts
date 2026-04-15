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

type DeleteNotesBody = {
  ids: number[];
};

type DeleteNotesResponse = {
  deletedNotes: INote[];
  deletedCount: number;
};

export type GetAllNotesFromDBParams = {
  pageNumber?: number;
  pageSize?: number;
};

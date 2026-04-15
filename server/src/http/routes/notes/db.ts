import { pool } from "@/lib/db";
import { INotes, INote, GetAllNotesFromDBParams } from "./utils/types";

export const getAllNotesFromDB = async ({
  pageNumber = 1,
  pageSize = 10,
}: GetAllNotesFromDBParams): Promise<INotes> => {
  const order = "created_at DESC";
  const safePageSize = Math.max(1, pageSize);
  const safePageNumber = Math.max(1, pageNumber);

  const offset = (safePageNumber - 1) * safePageSize;

  const notesResult = await pool.query<INote>(
    `
      SELECT *
      FROM notes
      ORDER BY ${order}
      LIMIT $1 OFFSET $2
    `,
    [safePageSize, offset],
  );

  const countResult = await pool.query<{ count: string }>(
    `
      SELECT COUNT(*) AS count
      FROM notes
    `,
  );

  const total = Number(countResult.rows[0]?.count ?? 0);
  const totalPages = Math.ceil(total / safePageSize);

  return {
    notes: notesResult.rows,
    total,
    pageNumber: safePageNumber,
    pageSize: safePageSize,
    totalPages,
  };
};

export const deleteNotesByIdsFromDB = async (
  ids: number[],
): Promise<INote[]> => {
  const result = await pool.query<INote>(
    `
      DELETE FROM notes
      WHERE id = ANY($1::int[])
      RETURNING *
    `,
    [ids],
  );

  return result.rows;
};

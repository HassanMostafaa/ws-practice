import { pool } from "@/lib/db";
import {
  INotes,
  INote,
  GetAllNotesFromDBParams,
  BodyNoteInput,
  CreateNoteInput,
} from "./utils/types";

// GET ALL
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

// BULD DELETE
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

// GET ONE BY ID
export const getNoteByIdFromDB = async (id: number): Promise<INote | null> => {
  const result = await pool.query(
    `
      SELECT * 
      FROM notes
      where id=$1
    `,
    [id],
  );

  return result?.rows?.[0];
};

export const updateNoteInDB = async (
  id: number,
  updates: BodyNoteInput,
): Promise<INote | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (updates.title !== undefined) {
    fields.push(`title = $${index++}`);
    values.push(updates?.title);
  }

  if (updates.content && updates.content !== undefined) {
    fields.push(`content = $${index++}`);
    values.push(updates.content);
  }

  if (updates.username !== undefined) {
    fields.push(`username = $${index++}`);
    values.push(updates.username);
  }

  // always update timestamp
  fields.push(`updated_at = NOW()`);

  if (fields.length === 1) {
    // only updated_at exists → no real update
    return null;
  }

  values.push(id);

  const query = `
    UPDATE notes
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING *;
  `;

  const result = await pool.query(query, values);

  if (result.rows.length === 0) return null;

  return result?.rows?.[0];
};

export const createNoteInDB = async (
  body: CreateNoteInput,
): Promise<INote | null> => {
  const { title, content, username } = body;

  const query = `
    INSERT INTO notes (title, content, username)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [title.trim(), content ?? null, username.trim()];

  const result = await pool.query(query, values);

  if (result.rows.length === 0) return null;

  return result.rows[0];
};

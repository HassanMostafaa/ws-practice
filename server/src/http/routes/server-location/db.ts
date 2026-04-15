import { pool } from "@/lib/db";
import { QueryResult } from "pg";

export type ServerLocationRow = {
  location: string;
  id?: number;
};

export const getServerLocationRowFromDB =
  async (): Promise<ServerLocationRow | null> => {
    const res = await pool.query<ServerLocationRow>(
      `
        SELECT * FROM server_location
      `,
    );

    return res.rows[0] ?? null;
  };

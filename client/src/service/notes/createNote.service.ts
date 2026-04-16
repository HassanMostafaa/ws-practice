import type { INote, NoteFormValues } from "@/components/notes/utils/types";
import type { ApiResponse } from "@/utils/types";
import { getEndpointWithProtocol } from "../helpers";

export const createNote = async (
  body: NoteFormValues,
): Promise<ApiResponse<INote>> => {
  try {
    const endpoint = getEndpointWithProtocol();

    const res = await fetch(`${endpoint}/notes`, {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: unknown) {
    console.error("Error:: creating note :", error);

    let message = "";

    if (error instanceof Error) {
      message = error.message;
    }

    return { message, status: "error" };
  }
};

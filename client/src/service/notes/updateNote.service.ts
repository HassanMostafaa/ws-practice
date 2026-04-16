import type { INote, NoteFormValues } from "@/components/notes/utils/types";
import type { ApiResponse } from "@/utils/types";
import { getEndpointWithProtocol } from "../helpers";

type UpdateNoteProps = {
  id: number;
  body: NoteFormValues;
};

export const updateNote = async ({
  id,
  body,
}: UpdateNoteProps): Promise<ApiResponse<INote>> => {
  try {
    const endpoint = getEndpointWithProtocol();

    const res = await fetch(`${endpoint}/note/${id}`, {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: unknown) {
    console.error("Error:: updating note :", error);

    let message = "";

    if (error instanceof Error) {
      message = error.message;
    }

    return { message, status: "error" };
  }
};

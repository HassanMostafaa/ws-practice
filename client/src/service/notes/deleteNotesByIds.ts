import type { INote } from "@/components/notes/utils/types";
import type { ApiResponse } from "@/utils/types";
import { getEndpointWithProtocol } from "../helpers";

type DeleteNotesByIdsProps = {
  ids: number[];
};

export const deleteNotesByIds = async ({
  ids,
}: DeleteNotesByIdsProps): Promise<ApiResponse<INote[]>> => {
  try {
    const endpoint = getEndpointWithProtocol();

    const res = await fetch(`${endpoint}/notes`, {
      body: JSON.stringify({ ids }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: unknown) {
    console.error("Error:: deleting notes :", error);

    let message = "";

    if (error instanceof Error) {
      message = error.message;
    }

    return { message, status: "error" };
  }
};

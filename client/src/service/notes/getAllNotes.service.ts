import { IPaginatedNotes } from "@/components/notes/utils/types";
import { ApiResponse } from "@/utils/types";
import { queryParamsBuilder } from "../helpers";

interface IPaginationProps {
  pageSize?: number;
  pageNumber?: number;
}

export const getAllNotes = async ({
  pageSize = 5,
  pageNumber = 1,
}: IPaginationProps): Promise<ApiResponse<IPaginatedNotes>> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const fullEndpoint = queryParamsBuilder(`http://${baseUrl}/notes`, {
      pageNumber,
      pageSize,
    });
    const res = await fetch(fullEndpoint, { cache: "no-store" });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: unknown) {
    console.error("Error:: fetching notes :", error);

    let message = "";

    if (error instanceof Error) {
      message = error.message;
    }

    return { message, status: "error" };
  }
};

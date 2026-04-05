import { ApiResponse } from "@/utils/types";

export const getServerLocation = async (): Promise<
  ApiResponse<{ location: string }>
> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`http://${baseUrl}/server-location`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: unknown) {
    console.error("Error:: fetching server location :", error);

    let message = "";

    if (error instanceof Error) {
      message = error.message;
    }

    return { message, status: "error" };
  }
};

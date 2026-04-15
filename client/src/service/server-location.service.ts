import { ApiResponse } from "@/utils/types";
import { getEndpointWithProtocol } from "./helpers";

export const getServerLocation = async (): Promise<
  ApiResponse<{ location: string }>
> => {
  try {
    const endPoint = getEndpointWithProtocol();
    const res = await fetch(`${endPoint}/server-location`);

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

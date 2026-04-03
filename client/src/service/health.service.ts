import { ApiResponse } from "@/utils/types";

type THealthCheckProps = { fail?: boolean };
export const getServerHealth = async (
  props: THealthCheckProps,
): Promise<ApiResponse<null>> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(
      `http://${baseUrl}/health?fail=${props.fail || false}`,
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: unknown) {
    console.error("Error:: fetching health check:", error);

    let message = "";

    if (error instanceof Error) {
      message = error.message;
    }

    return { message, status: "error" };
  }
};

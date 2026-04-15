import { ApiResponse } from "@/utils/types";
import { getEndpointWithProtocol } from "./helpers";

type THealthCheckProps = { fail?: boolean };
export const getServerHealth = async (
  props: THealthCheckProps,
): Promise<ApiResponse<null>> => {
  try {
    const endPoint = getEndpointWithProtocol();

    const res = await fetch(`${endPoint}/health?fail=${props.fail || false}`);

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

export type ApiResponse<T = unknown> = {
  message: string;
  data?: T;
  status?: "success" | "error";
};

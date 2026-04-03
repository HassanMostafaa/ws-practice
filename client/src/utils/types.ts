export type ApiResponse<T> = {
  message: string;
  status: "success" | "error";
  data?: T;
  type?: string;
};

import type { WebSocketConnectionStatus } from "./types";

type WebSocketStatusBannerProps = {
  message: string;
  status: WebSocketConnectionStatus;
};

const statusClassName: Record<WebSocketConnectionStatus, string> = {
  closed: "border-zinc-400/40 bg-zinc-400/10 text-zinc-100",
  connected: "border-emerald-400/40 bg-emerald-400/10 text-emerald-100",
  connecting: "border-amber-300/40 bg-amber-300/10 text-amber-100",
  error: "border-rose-400/40 bg-rose-400/10 text-rose-100",
};

export const WebSocketStatusBanner = ({
  message,
  status,
}: WebSocketStatusBannerProps) => {
  return (
    <div
      className={`m-4 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${statusClassName[status]}`}
      role={status === "error" ? "alert" : "status"}
    >
      {status === "connecting" && (
        <span
          className="h-2 w-2 animate-pulse rounded-full bg-amber-200"
          aria-hidden="true"
        />
      )}
      <span>{message}</span>
    </div>
  );
};

import type { WebSocketConnectionStatus } from "./types";

type WebSocketWindowHeaderProps = {
  endpoint: string;
  messageCount: number;
  status: WebSocketConnectionStatus;
};

const statusLabel: Record<WebSocketConnectionStatus, string> = {
  closed: "Closed",
  connected: "Connected",
  connecting: "Connecting",
  error: "Error",
};

const statusClassName: Record<WebSocketConnectionStatus, string> = {
  closed: "bg-zinc-400",
  connected: "bg-emerald-400",
  connecting: "bg-amber-300",
  error: "bg-rose-400",
};

export const WebSocketWindowHeader = ({
  endpoint,
  messageCount,
  status,
}: WebSocketWindowHeaderProps) => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 px-4 py-3">
      <div className="min-w-0">
        <p className="text-xs text-white/60">WebSocket test</p>
        <h2 className="text-base font-semibold text-white">WS window</h2>
        <p className="max-w-full break-all text-xs text-white/50">
          {endpoint || "Resolving endpoint"}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
        <span className="rounded-lg border border-white/20 px-2 py-1">
          {messageCount} messages
        </span>
        <span className="flex items-center gap-2 rounded-lg border border-white/20 px-2 py-1">
          <span
            className={`h-2 w-2 rounded-full ${statusClassName[status]}`}
            aria-hidden="true"
          />
          {statusLabel[status]}
        </span>
      </div>
    </header>
  );
};

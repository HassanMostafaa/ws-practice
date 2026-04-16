import type { FormEvent } from "react";
import type { WebSocketConnectionStatus } from "../types";
import { useWSStore } from "../store";

type WebSocketWindowHeaderProps = {
  displayName: string;
  draftDisplayName: string;
  endpoint: string;
  messageCount: number;
  onDisplayNameSubmit: () => void;
  onDraftDisplayNameChange: (displayName: string) => void;
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
  displayName,
  draftDisplayName,
  endpoint,
  messageCount,
  onDisplayNameSubmit,
  onDraftDisplayNameChange,
  status,
}: WebSocketWindowHeaderProps) => {
  const { setStoredDisplayName } = useWSStore((s) => ({
    storedDisplayName: s?.storedDisplayName,
    setStoredDisplayName: s?.setStoredDisplayName,
  }));

  const handleDisplayNameSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStoredDisplayName(draftDisplayName);
    onDisplayNameSubmit();
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 px-4 py-3">
      <div className="min-w-0">
        <p className="text-xs text-white/60">WebSocket test</p>
        <h2 className="text-base font-semibold text-white">WS window</h2>
        <p className="max-w-full break-all text-xs text-white/50">
          {endpoint || "Resolving endpoint"}
        </p>
      </div>

      <div className="space-y-1 ms-auto">
        <div className="flex flex-wrap items-end gap-1 text-xs text-white/70">
          <span className="flex-1 rounded-lg border border-white/20 px-2 py-1">
            {messageCount} messages
          </span>
          <span className="flex flex-1 items-center gap-2 rounded-lg border border-white/20 px-2 py-1">
            <span
              className={`h-2 w-2 rounded-full ${statusClassName[status]}`}
              aria-hidden="true"
            />
            {statusLabel[status]}
          </span>
        </div>

        <form onSubmit={handleDisplayNameSubmit}>
          <div className="relative">
            <input
              aria-label="Display name"
              className="h-8 w-full rounded-lg border border-white/20 bg-transparent pl-2 pr-14 text-xs text-white placeholder:text-white/40"
              id="ws-user-name"
              name="username"
              onChange={(event) => onDraftDisplayNameChange(event.target.value)}
              placeholder={displayName || "Display name"}
              type="text"
              value={draftDisplayName}
            />
            <button
              className="absolute right-1 top-1/2 h-6 -translate-y-1/2 rounded-md bg-emerald-400 px-2 text-[11px] font-semibold text-zinc-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/35"
              disabled={!draftDisplayName.trim()}
              type="submit"
            >
              Set
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

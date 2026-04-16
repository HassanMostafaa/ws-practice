import type { FormEvent } from "react";
import type { WebSocketConnectionStatus } from "../types";

type WebSocketComposerProps = {
  canSend: boolean;
  connectionStatus: WebSocketConnectionStatus;
  draftMessage: string;
  onDraftMessageChange: (message: string) => void;
  onSendMessage: () => void;
};

const inputPlaceholder: Record<WebSocketConnectionStatus, string> = {
  closed: "WebSocket is closed",
  connected: "Enter your message",
  connecting: "Waiting for connection",
  error: "WebSocket connection error",
};

export const WebSocketComposer = ({
  canSend,
  connectionStatus,
  draftMessage,
  onDraftMessageChange,
  onSendMessage,
}: WebSocketComposerProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSendMessage();
  };

  return (
    <form
      className="flex flex-col gap-2 border-t border-white/20 p-4 sm:flex-row"
      onSubmit={handleSubmit}
    >
      <input
        className="min-h-10 flex-1 rounded-lg border border-white/25 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/40 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={connectionStatus !== "connected"}
        onChange={(event) => onDraftMessageChange(event.target.value)}
        placeholder={inputPlaceholder[connectionStatus]}
        type="text"
        value={draftMessage}
      />
      <button
        className="min-h-10 rounded-lg border border-white/25 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50 enabled:cursor-pointer enabled:active:opacity-70"
        disabled={!canSend}
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

import type { RefObject } from "react";
import { WebSocketMessage } from "./WebSocketMessage";
import type { WebSocketMessageViewModel } from "../types";

type WebSocketMessageListProps = {
  containerRef: RefObject<HTMLDivElement | null>;
  isConnecting: boolean;
  messages: WebSocketMessageViewModel[];
  onScroll: () => void;
};

const WebSocketMessageLoadingState = () => {
  return (
    <div className="space-y-3" role="status" aria-label="Connecting">
      <div className="max-w-[85%] rounded-lg border border-white/15 bg-white/5 p-3">
        <div className="h-3 w-24 animate-pulse rounded-lg bg-white/20" />
        <div className="mt-3 h-3 w-full animate-pulse rounded-lg bg-white/15" />
        <div className="mt-2 h-3 w-3/4 animate-pulse rounded-lg bg-white/15" />
      </div>
      <div className="ml-auto max-w-[70%] rounded-lg border border-white/15 bg-white/5 p-3">
        <div className="h-3 w-20 animate-pulse rounded-lg bg-white/20" />
        <div className="mt-3 h-3 w-2/3 animate-pulse rounded-lg bg-white/15" />
      </div>
    </div>
  );
};

export const WebSocketMessageList = ({
  containerRef,
  isConnecting,
  messages,
  onScroll,
}: WebSocketMessageListProps) => {
  return (
    <div
      ref={containerRef}
      className="max-h-[44vh] min-h-56 space-y-3 overflow-y-auto px-4 pb-4"
      onScroll={onScroll}
    >
      {isConnecting && messages.length === 0 ? (
        <WebSocketMessageLoadingState />
      ) : null}

      {!isConnecting && messages.length === 0 ? (
        <p className="rounded-lg border border-white/15 bg-white/5 p-3 text-sm text-white/60">
          No messages yet.
        </p>
      ) : null}

      {messages.map((message) => (
        <WebSocketMessage key={message.id} message={message} />
      ))}
    </div>
  );
};

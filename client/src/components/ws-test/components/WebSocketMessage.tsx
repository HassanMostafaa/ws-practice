import { FaUserCircle } from "react-icons/fa";
import type { WebSocketMessageTone, WebSocketMessageViewModel } from "../types";

type WebSocketMessageProps = {
  message: WebSocketMessageViewModel;
};

const toneClassName: Record<WebSocketMessageTone, string> = {
  agent: "border-cyan-300/40 bg-cyan-300/10 text-cyan-50",
  connection: "border-emerald-300/40 bg-emerald-300/10 text-emerald-50",
  notification: "border-amber-300/40 bg-amber-300/10 text-amber-50",
  unknown: "border-zinc-300/40 bg-zinc-300/10 text-zinc-50",
  user: " bg-gray-100/70 text-black",
};

export const WebSocketMessage = ({ message }: WebSocketMessageProps) => {
  return (
    <article
      className={`max-w-3/4 space-y-4 rounded-lg border p-2 ${
        message.align === "right" ? "ml-auto" : ""
      } ${toneClassName[message.tone]}`}
    >
      {message.displayName && (
        <p className=" items-center flex gap-1 font-semibold">
          <FaUserCircle size={32} />
          <span className="text-xs">{message.displayName}</span>
        </p>
      )}
      {message.message && (
        <p className={`whitespace-pre-wrap wrap-break-word text-sm`}>
          {message.message}
        </p>
      )}
    </article>
  );
};

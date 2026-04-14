import type { WebSocketMessageTone, WebSocketMessageViewModel } from "./types";

type WebSocketMessageProps = {
  message: WebSocketMessageViewModel;
};

const toneClassName: Record<WebSocketMessageTone, string> = {
  agent: "border-cyan-300/40 bg-cyan-300/10 text-cyan-50",
  connection: "border-emerald-300/40 bg-emerald-300/10 text-emerald-50",
  notification: "border-amber-300/40 bg-amber-300/10 text-amber-50",
  unknown: "border-zinc-300/40 bg-zinc-300/10 text-zinc-50",
  user: "border-white bg-white text-black",
};

export const WebSocketMessage = ({ message }: WebSocketMessageProps) => {
  return (
    <article
      className={`max-w-[85%] rounded-lg border p-3 ${
        message.align === "right" ? "ml-auto" : ""
      } ${toneClassName[message.tone]}`}
    >
      <p className="text-xs font-semibold uppercase">{message.label}</p>
      <p className="mt-1 whitespace-pre-wrap break-words text-sm">
        {message.message || "No message body"}
      </p>
    </article>
  );
};

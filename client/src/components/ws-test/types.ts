export type WebSocketConnectionStatus =
  | "connecting"
  | "connected"
  | "closed"
  | "error";

export type KnownWebSocketMessageType =
  | "connection"
  | "notification"
  | "chat-agent"
  | "chat-user";

export type WebSocketStreamMessage = {
  data?: unknown;
  message?: string;
  status?: "success" | "error";
  type?: KnownWebSocketMessageType | string;
};

export type ChatUserMessage = {
  message: string;
  type: "chat-user";
};

export type WebSocketMessageAlignment = "left" | "right";

export type WebSocketMessageTone =
  | "agent"
  | "connection"
  | "notification"
  | "unknown"
  | "user";

export type WebSocketMessageViewModel = {
  align: WebSocketMessageAlignment;
  id: string;
  label: string;
  message: string;
  tone: WebSocketMessageTone;
};

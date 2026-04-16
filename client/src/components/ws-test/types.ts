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
  displayName?: string;
  message?: string;
  status?: "success" | "error";
  type?: KnownWebSocketMessageType | string;
};

export type ChatUserMessage = {
  displayName: string;
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
  displayName?: string;
  id: string;
  message: string;
  tone: WebSocketMessageTone;
};

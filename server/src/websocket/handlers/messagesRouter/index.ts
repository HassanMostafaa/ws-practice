import type { WebSocket, WebSocketServer } from "ws";
import { chatUserHandler } from "./chat-user/idnex";

type ClientMessage =
  | { type: "chat-user"; message: string }
  | { type: "fetch-post"; id: number }
  | { type: "join-room"; roomId: string };

type HandlerMap = {
  [K in ClientMessage["type"]]?: (
    wss: WebSocketServer,
    socket: WebSocket,
    payload: Extract<ClientMessage, { type: K }>,
  ) => void;
};

const handlers: HandlerMap = {
  "chat-user": chatUserHandler,
};

export const messageRouter = (
  wss: WebSocketServer,
  socket: WebSocket,
  payload: string,
) => {
  const data = JSON.parse(payload) as ClientMessage;
  if (!data.type) return;

  const handler = handlers?.[data?.type];

  if (!handler) {
    console.warn("Unknown type:", data.type);
    return;
  }

  handler(wss, socket, data as any);
};

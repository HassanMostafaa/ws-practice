import type { WebSocket } from "ws";
import { send } from "@/websocket/utils/send";

type ChatUserMessage = {
  type: "chat-user";
  message: string;
};

export const chatUserHandler = (
  socket: WebSocket,
  payload: ChatUserMessage,
) => {
  // echo back to the same client
  send(socket, {
    type: "chat-user",
    message: payload.message,
  });
};

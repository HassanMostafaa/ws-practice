import type { WebSocket } from "ws";
import { send } from "@/websocket/utils/send";

export const agentGreeting = (socket: WebSocket, delay: number) => {
  setTimeout(() => {
    send(socket, {
      type: "chat-agent",
      message: "Hello User, welcome to my WebSocket connection",
    });
  }, delay);
};

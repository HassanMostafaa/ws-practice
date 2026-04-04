import { type WebSocket, WebSocketServer } from "ws";
import type { Server as HttpServer } from "node:http";
import { send } from "./utils/send";
import { notificationMessage } from "./events/agentNotification";
import { agentGreeting } from "./events/agentGreeting";
import { messageRouter } from "./handlers/messagesRouter";

export const initWebSocket = (server: HttpServer) => {
  const wss = new WebSocketServer({ server });
  console.log("WebSocket server initialized");

  wss.on("connection", (socket: WebSocket) => {
    send(socket, {
      type: "connection",
      message: "Welcome client 👋",
    });

    agentGreeting(socket, 3000);

    notificationMessage(socket, 5000);

    socket.on("message", (payload) => {
      const resolvedPayload =
        typeof payload === "string" ? payload : payload.toString();
      messageRouter(socket, resolvedPayload);
    });

    socket.on("close", () => {
      console.log("Client disconnected");
    });
  });
};

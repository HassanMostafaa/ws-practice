import { WebSocket, WebSocketServer } from "ws";
import type { Server as HttpServer } from "node:http";
import { send } from "./utils/send";
import { notificationMessage } from "./events/agentNotification";
import { agentGreeting } from "./events/agentGreeting";
import { messageRouter } from "./handlers/messagesRouter";
import { broadcastConnectionCount, getConnectionCount } from "./utils/helpers";
import { createRoom, rooms } from "./state/rooms";

export const initWebSocket = (server: HttpServer) => {
  const wss = new WebSocketServer({ server });
  console.log("WebSocket server initialized");

  // console.log(rooms);

  wss.on("connection", (socket: WebSocket) => {
    send(socket, {
      type: "connection",
      message: "Welcome client 👋",
    });

    broadcastConnectionCount(wss);

    agentGreeting(socket, 3000);

    notificationMessage(socket, 5000);

    socket.on("message", (payload) => {
      const resolvedPayload =
        typeof payload === "string" ? payload : payload.toString();

      let data;

      try {
        data = JSON.parse(resolvedPayload);
      } catch {
        send(socket, {
          type: "error",
          message: "Invalid JSON payload",
        });
        return;
      }

      if (data?.type === "get-connection-count") {
        send(socket, {
          type: "connection-count",
          connectionCount: getConnectionCount(wss),
        });
        return;
      }

      messageRouter(wss, socket, resolvedPayload);
    });

    socket.on("close", () => {
      console.log("Client disconnected");
      broadcastConnectionCount(wss);
    });
  });
};

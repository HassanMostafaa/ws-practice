import { WebSocket, WebSocketServer } from "ws";
import type { Server as HttpServer } from "node:http";
import { send } from "./utils/send";
import { notificationMessage } from "./events/agentNotification";
import { agentGreeting } from "./events/agentGreeting";
import { messageRouter } from "./handlers/messagesRouter";

export const initWebSocket = (server: HttpServer) => {
  const wss = new WebSocketServer({ server });
  console.log("WebSocket server initialized");

  const getConnectionCount = () => {
    return Array.from(wss.clients).filter(
      (client) => client.readyState === WebSocket.OPEN,
    ).length;
  };

  const sendConnectionCount = (socket: WebSocket) => {
    send(socket, {
      type: "connection-count",
      connectionCount: getConnectionCount(),
    });
  };

  const broadcastConnectionCount = () => {
    wss.clients.forEach((client) => {
      if (client.readyState !== WebSocket.OPEN) return;

      sendConnectionCount(client);
    });
  };

  wss.on("connection", (socket: WebSocket) => {
    send(socket, {
      type: "connection",
      message: "Welcome client 👋",
    });

    broadcastConnectionCount();

    agentGreeting(socket, 3000);

    notificationMessage(socket, 5000);

    socket.on("message", (payload) => {
      const resolvedPayload =
        typeof payload === "string" ? payload : payload.toString();

      const data = JSON.parse(resolvedPayload);

      if (data?.type === "get-connection-count") {
        sendConnectionCount(socket);
        return;
      }

      messageRouter(wss, socket, resolvedPayload);
    });

    socket.on("close", () => {
      console.log("Client disconnected");
      broadcastConnectionCount();
    });
  });
};

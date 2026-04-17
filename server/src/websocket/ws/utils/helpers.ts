import { WebSocketServer } from "ws";
import { send } from "./send";

export const getConnectionCount = (wss: WebSocketServer) => {
  return Array.from(wss.clients).filter(
    (client) => client.readyState === WebSocket.OPEN,
  ).length;
};

export const broadcastConnectionCount = (wss: WebSocketServer) => {
  wss.clients.forEach((client) => {
    if (client.readyState !== WebSocket.OPEN) return;

    send(client, {
      type: "connection-count",
      connectionCount: getConnectionCount(wss),
    });
  });
};

import { type WebSocket, WebSocketServer } from "ws";
import type { Server as HttpServer } from "node:http";

export const initWebSocket = (server: HttpServer) => {
  const wss = new WebSocketServer({ server });
  console.log("WebSocket server initialized");

  wss.on("connection", (socket: WebSocket) => {
    console.log("New WebSocket connection established");

    socket.send(
      JSON.stringify({
        type: "connection",
        message: "Welcome client 👋",
      }),
    );
  });
};

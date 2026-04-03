import { type WebSocket, WebSocketServer } from "ws";
import type { Server as HttpServer } from "node:http";

export const initWebSocket = (server: HttpServer) => {
  const wss = new WebSocketServer({ server });
  console.log("WebSocket server initialized");

  wss.on("connection", (socket: WebSocket) => {
    socket.send(
      JSON.stringify({
        type: "connection",
        message: "Welcome client 👋",
      }),
    );

    setTimeout(() => {
      socket.send(
        JSON.stringify({
          type: "notification",
          message: "This is a notification sent after 5 seconds ⏰",
        }),
      );
    }, 5000);

    setTimeout(() => {
      socket.send(
        JSON.stringify({
          type: "chat-agent",
          message: "This is a chat message from the agent after 2 seconds 💬",
        }),
      );
    }, 2000);

    setTimeout(() => {
      socket.send(
        JSON.stringify({
          type: "NEW TYPE NOT IN FE",
          message: "New type message test",
        }),
      );
    }, 10000);

    socket.on("message", (data) => {
      const parsed = JSON.parse(data.toString());
      // echo back (simple case)
      socket.send(
        JSON.stringify({
          type: "chat-user",
          message: parsed.message,
        }),
      );
    });
  });
};

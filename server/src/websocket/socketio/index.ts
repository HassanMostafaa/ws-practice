import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./utils/types";

export const initSocketIO = (server: HttpServer, allowedOrigins: string[]) => {
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
    },
  });

  console.log("Socket.io server initialized");

  io.on("connection", (socket) => {
    console.log("connection created");

    setTimeout(() => {
      socket.emit("message", {
        content: "A Socket.io message type emit content",
      });
    }, 3000);
    setTimeout(() => {
      socket.emit("message", {
        content: "A Socket.io message type emit content",
      });
    }, 1000);
    setTimeout(() => {
      socket.emit("message", {
        content: "A Socket.io message type emit content",
      });
    }, 2000);
    setTimeout(() => {
      socket.emit("message", {
        content: "A Socket.io message type emit content",
      });
    }, 4000);
  });
};

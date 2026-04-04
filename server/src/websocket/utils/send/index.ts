import type { WebSocket } from "ws";
export const send = (socket: WebSocket, payload: unknown) =>
  socket.send(JSON.stringify(payload));

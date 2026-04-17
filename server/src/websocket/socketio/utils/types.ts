import type { Socket as TSocket } from "socket.io";

export type ServerToClientEvents = {
  message: (msg: { content: string }) => void;
};

export type ClientToServerEvents = {
  // empty for now
};

export type AppSocket = TSocket<ClientToServerEvents, ServerToClientEvents>;

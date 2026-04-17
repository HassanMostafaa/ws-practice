import { io, type Socket } from "socket.io-client";

type ServerToClientEvents = {
  message: (payload: { content: string }) => void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ClientToServerEvents = {};

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:3001", {
      withCredentials: true,
      //   transports: ["websocket"],
    });
  }

  if (!socket.connected) {
    socket.connect();
  }

  return socket;
};

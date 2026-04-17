import type { WebSocket } from "ws";

type IRoomId = string;

export type AppSocket = WebSocket & {
  meta?: {
    username?: string;
    roomId?: IRoomId;
  };
};

export const rooms = new Map<IRoomId, Set<AppSocket>>();

export const getRoom = (id: IRoomId): Set<AppSocket> | undefined =>
  rooms.get(id);

export const createRoom = (id: IRoomId): Set<AppSocket> => {
  if (!rooms.has(id)) {
    rooms.set(id, new Set());
  }

  return rooms.get(id)!;
};

export const joinRoom = (id: IRoomId, socket: AppSocket): void => {
  const room = createRoom(id);
  room.add(socket);
};

export const leaveRoom = (roomId: IRoomId, socket: AppSocket): void => {
  const room = getRoom(roomId);
  if (!room) return;

  room.delete(socket);

  if (room.size === 0) {
    rooms.delete(roomId);
  }
};

export const leaveAllRooms = (socket: AppSocket): void => {
  rooms.forEach((clients, roomId) => {
    clients.delete(socket);

    if (clients.size === 0) {
      rooms.delete(roomId);
    }
  });
};

export const getRoomSize = (roomId: IRoomId): number => {
  return getRoom(roomId)?.size ?? 0;
};

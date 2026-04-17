import type { WebSocket } from "ws";
import { send } from "../utils/send";

export const notificationMessage = (socket: WebSocket, delay: number) => {
  setTimeout(() => {
    send(socket, {
      type: "notification",
      message: "This is a notification sent after 5 seconds ⏰",
    });
  }, delay);
};

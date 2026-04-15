import { WebSocket, type WebSocketServer } from "ws";
import { send } from "@/websocket/utils/send";

type ChatUserMessage = {
  type: "chat-user";
  message: string;
};

const badWords = [
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "bastard",
  "damn",
  "crap",
  "dick",
  "piss",
  "cunt",
];

const badWordsPattern = new RegExp(`\\b(${badWords.join("|")})\\b`, "gi");

const censorBadWords = (message: string) => {
  return message.replace(badWordsPattern, (word) => {
    return `${word.slice(0, 2)}***`;
  });
};

export const chatUserHandler = (
  wss: WebSocketServer,
  socket: WebSocket,
  payload: ChatUserMessage,
) => {
  const resolvedMessage = censorBadWords(payload.message);

  // echo back to all connections
  wss.clients.forEach((client) => {
    if (client.readyState !== WebSocket.OPEN) return;

    send(client, {
      type: "chat-user",
      message: resolvedMessage,
    });
  });
};

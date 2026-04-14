import type { WebSocket } from "ws";
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
  socket: WebSocket,
  payload: ChatUserMessage,
) => {
  // echo back to the same client
  send(socket, {
    type: "chat-user",
    message: censorBadWords(payload.message),
  });
};

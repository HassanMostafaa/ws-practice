"use client";

import { useMemo } from "react";
import type {
  KnownWebSocketMessageType,
  WebSocketMessageAlignment,
  WebSocketMessageTone,
  WebSocketMessageViewModel,
  WebSocketStreamMessage,
} from "../types";
import { useTestWebsocket } from "./useTestWebsocket";
import { useWSStore } from "../store";

const messageConfig = {
  "chat-agent": {
    align: "left",
    tone: "agent",
  },
  "chat-user": {
    align: "right",
    tone: "user",
  },
  connection: {
    align: "left",
    tone: "connection",
  },
  notification: {
    align: "left",
    tone: "notification",
  },
} satisfies Record<
  KnownWebSocketMessageType,
  {
    align: WebSocketMessageAlignment;
    tone: WebSocketMessageTone;
  }
>;

const getKnownMessageConfig = (type?: string) => {
  switch (type) {
    case "chat-agent":
      return messageConfig["chat-agent"];
    case "chat-user":
      return messageConfig["chat-user"];
    case "connection":
      return messageConfig.connection;
    case "notification":
      return messageConfig.notification;
    default:
      return null;
  }
};

export const useWebSocketContentSwitcher = (
  messages: WebSocketStreamMessage[],
) => {
  const { storedDisplayName } = useWSStore((s) => ({
    storedDisplayName: s?.storedDisplayName,
  }));

  return useMemo<WebSocketMessageViewModel[]>(() => {
    return messages.map((message, index) => {
      const config = getKnownMessageConfig(message.type);
      const serverDisplayName = message.displayName?.trim() || undefined;

      if (!config) {
        return {
          align: "left",
          displayName: serverDisplayName,
          id: `unknown-${index}`,
          message: message.message ?? "",
          tone: "unknown",
        };
      }

      return {
        ...config,
        align: storedDisplayName === serverDisplayName ? "right" : "left",
        displayName: serverDisplayName,
        id: `${message.type}-${index}`,
        message: message.message ?? "",
      };
    });
  }, [messages, storedDisplayName]);
};

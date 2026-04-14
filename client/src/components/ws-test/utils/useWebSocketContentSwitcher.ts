"use client";

import { useMemo } from "react";
import type {
  KnownWebSocketMessageType,
  WebSocketMessageAlignment,
  WebSocketMessageTone,
  WebSocketMessageViewModel,
  WebSocketStreamMessage,
} from "../types";

const messageConfig = {
  "chat-agent": {
    align: "left",
    label: "S - Agent",
    tone: "agent",
  },
  "chat-user": {
    align: "right",
    label: "C - User",
    tone: "user",
  },
  connection: {
    align: "left",
    label: "S - Connected",
    tone: "connection",
  },
  notification: {
    align: "left",
    label: "S - Notification",
    tone: "notification",
  },
} satisfies Record<
  KnownWebSocketMessageType,
  {
    align: WebSocketMessageAlignment;
    label: string;
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
  return useMemo<WebSocketMessageViewModel[]>(() => {
    return messages.map((message, index) => {
      const config = getKnownMessageConfig(message.type);

      if (!config) {
        return {
          align: "left",
          id: `unknown-${index}`,
          label: `S - Unknown type: "${message.type ?? "missing"}"`,
          message: message.message ?? "",
          tone: "unknown",
        };
      }

      return {
        ...config,
        id: `${message.type}-${index}`,
        message: message.message ?? "",
      };
    });
  }, [messages]);
};

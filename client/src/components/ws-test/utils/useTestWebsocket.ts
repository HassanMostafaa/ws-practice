"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  ChatUserMessage,
  WebSocketConnectionStatus,
  WebSocketStreamMessage,
} from "../types";

const getWebSocketUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!baseUrl) return "";

  if (baseUrl.startsWith("ws://") || baseUrl.startsWith("wss://")) {
    return baseUrl;
  }

  const isLocalServer =
    baseUrl.startsWith("localhost") ||
    baseUrl.startsWith("127.0.0.1") ||
    baseUrl.startsWith("0.0.0.0");

  return `${isLocalServer ? "ws" : "wss"}://${baseUrl}`;
};

const isAtBottom = (element: HTMLDivElement) => {
  return element.scrollHeight - element.scrollTop - element.clientHeight <= 1;
};

export const useTestWebsocket = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const wasAtBottomRef = useRef(true);

  const [endpoint] = useState(getWebSocketUrl);
  const [connectionStatus, setConnectionStatus] =
    useState<WebSocketConnectionStatus>(() =>
      endpoint ? "connecting" : "error",
    );
  const [draftMessage, setDraftMessage] = useState("");
  const [messages, setMessages] = useState<WebSocketStreamMessage[]>([]);
  const [statusMessage, setStatusMessage] = useState(() =>
    endpoint ? "Connecting to WebSocket..." : "Missing NEXT_PUBLIC_API_URL.",
  );

  const trackMessagesScroll = useCallback(() => {
    if (!messagesContainerRef.current) return;

    wasAtBottomRef.current = isAtBottom(messagesContainerRef.current);
  }, []);

  useEffect(() => {
    const element = messagesContainerRef.current;

    if (!wasAtBottomRef.current || !element) return;

    const frame = requestAnimationFrame(() => {
      element.scrollTop = element.scrollHeight;
    });

    return () => cancelAnimationFrame(frame);
  }, [messages]);

  useEffect(() => {
    let hasConnectionError = false;
    let isActive = true;

    if (!endpoint) return;

    const socket = new WebSocket(endpoint);

    socketRef.current = socket;

    socket.onopen = () => {
      if (!isActive) return;

      setConnectionStatus("connected");
      setStatusMessage("WebSocket connected.");
    };

    socket.onmessage = (event) => {
      if (!isActive) return;

      try {
        const data = JSON.parse(String(event.data)) as WebSocketStreamMessage;
        setMessages((currentMessages) => [...currentMessages, data]);
      } catch {
        setStatusMessage(String(event.data));
      }
    };

    socket.onerror = (error) => {
      if (!isActive) return;

      hasConnectionError = true;
      console.error("WebSocket error:", error);
      setConnectionStatus("error");
      setStatusMessage("WebSocket connection error.");
    };

    socket.onclose = () => {
      if (!isActive || hasConnectionError) return;

      setConnectionStatus("closed");
      setStatusMessage("WebSocket disconnected.");
    };

    return () => {
      isActive = false;

      if (socketRef.current === socket) {
        socketRef.current = null;
      }

      socket.close();
    };
  }, [endpoint]);

  const sendMessage = useCallback(() => {
    const message = draftMessage.trim();

    if (!message) return;

    if (socketRef.current?.readyState !== WebSocket.OPEN) {
      setStatusMessage("WebSocket is not ready yet.");
      return;
    }

    const payload: ChatUserMessage = {
      message,
      type: "chat-user",
    };

    socketRef.current.send(JSON.stringify(payload));
    setDraftMessage("");
  }, [draftMessage]);

  return {
    canSend: connectionStatus === "connected" && draftMessage.trim().length > 0,
    connectionStatus,
    draftMessage,
    endpoint,
    isConnecting: connectionStatus === "connecting",
    messages,
    messagesContainerRef,
    sendMessage,
    setDraftMessage,
    statusMessage,
    trackMessagesScroll,
  };
};

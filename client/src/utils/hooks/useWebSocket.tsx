"use client";

import { useEffect, useRef, useState } from "react";
import { ApiResponse } from "../types";

export const useWebSocket = (url: string) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [stream, setStream] = useState<ApiResponse<null>[] | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setMessage("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setStream((prev) => [...(prev || []), data]);
      } catch {
        setMessage(event.data);
      }
    };

    ws.onerror = (err) => {
      console.error(err);
    };

    return () => ws.close();
  }, [url]);

  const send = (data: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  };

  return { message, send, stream };
};

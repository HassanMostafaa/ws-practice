"use client";

import { useWebSocket } from "@/utils/hooks/useWebSocket";
import { useEffect, useRef, useState } from "react";

export const WebSocketTest = () => {
  const { message, stream, send } = useWebSocket(
    `ws://${process.env.NEXT_PUBLIC_API_URL}`,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const wasAtBottom = useRef(true);
  const [inputValue, setInputValue] = useState("");

  const isAtBottom = (el: HTMLDivElement) => {
    return el.scrollHeight - el.scrollTop - el.clientHeight <= 1;
  };

  const scrollToBottom = (el: HTMLDivElement) => {
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  };

  const handleScroll = () => {
    if (containerRef.current) {
      wasAtBottom.current = isAtBottom(containerRef.current);
    }
  };

  useEffect(() => {
    if (wasAtBottom.current && containerRef.current) {
      scrollToBottom(containerRef.current);
    }
  }, [stream]);

  const renderContent = () => {
    if (!stream) return null;

    return stream.map((data, index) => {
      switch (data.type) {
        case "connection":
          return (
            <div key={index}>
              <strong>S• CONNECTED</strong>
              <p>{data.message}</p>
            </div>
          );

        case "notification":
          return (
            <div key={index}>
              <strong>S• NOTIFICATION</strong>
              <p>{data.message}</p>
            </div>
          );

        case "chat-agent":
          return (
            <div key={index}>
              <strong>S• AGENT</strong>
              <p>{data.message}</p>
            </div>
          );

        case "chat-user":
          return (
            <div key={index}>
              <strong>C• USER</strong>
              <p>{data.message}</p>
            </div>
          );

        default:
          return (
            <div key={index}>
              <strong>S• UNKNOWN TYPE: &quot;{data?.type}&quot;</strong>
              <p>{data?.message}</p>
            </div>
          );
      }
    });
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="space-y-4 p-4 max-h-[60vh] overflow-auto border border-white rounded-2xl max-w-100"
    >
      <div className="border p-2 bg-gray-200 border-gray-500 text-black rounded-lg">
        {message}
      </div>
      {renderContent()}

      <div className="flex flex-col gap-2">
        <input
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              send({ message: inputValue });
              setInputValue("");
            }
          }}
          placeholder="Enter ur message"
          className="border border-white p-2 h-10 rounded-lg"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="p-2 rounded-lg border-white border active:opacity-70 cursor-pointer"
          onClick={() => {
            send({ message: inputValue });
            setInputValue("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

"use client";
import React from "react";
import { WebSocketTest } from "../ws-test/WebSocketTest";

export const WSController = () => {
  const [isWSOpen, setIsWSOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-2 items-start">
      <button
        className="border  active:scale-95 hover:scale-102 transition-all border-white/25 rounded-lg p-3"
        onClick={() => setIsWSOpen(!isWSOpen)}
      >
        {isWSOpen ? "Close WebSocket" : "Open WebSocket"}
      </button>
      {isWSOpen && <WebSocketTest />}
    </div>
  );
};

"use client";
import React from "react";
import { WebSocketTest } from "../ws-test/WebSocketTest";

export const WSController = () => {
  const [isWSOpen, setIsWSOpen] = React.useState(false);
  return (
    <>
      <button
        className="border  border-white rounded-lg p-3"
        onClick={() => setIsWSOpen(!isWSOpen)}
      >
        {isWSOpen ? "Close WebSocket" : "Open WebSocket"}
      </button>
      {isWSOpen && <WebSocketTest />}
    </>
  );
};

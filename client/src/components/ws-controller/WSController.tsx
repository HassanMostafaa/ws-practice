"use client";
import React from "react";
import { WebSocketTest } from "../ws-test/WebSocketTest";
import { RoomsSidebar } from "../ws-test/rooms-sidebar/RoomsSidebar";

export const WSController = () => {
  const [isWSOpen, setIsWSOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-2 h-full  items-start">
      <button
        className="border ms-auto active:scale-95 hover:scale-102 transition-all border-white/25 rounded-lg p-3"
        onClick={() => setIsWSOpen(!isWSOpen)}
      >
        {isWSOpen ? "Close WebSocket" : "Open WebSocket"}
      </button>
      {isWSOpen && (
        <div className="min-h-[36vh] gap-2 w-full flex items-stretch  justify-end">
          <RoomsSidebar />
          <WebSocketTest />
        </div>
      )}
    </div>
  );
};

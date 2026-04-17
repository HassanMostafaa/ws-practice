"use client";
import React from "react";
import { WebSocketTest } from "../ws-test/WebSocketTest";
import { RoomsSidebar } from "../ws-test/rooms-sidebar/RoomsSidebar";
import { IoChatbubblesOutline } from "react-icons/io5";
import { PiChatTeardropSlashDuotone } from "react-icons/pi";

export const WSController = () => {
  const [isWSOpen, setIsWSOpen] = React.useState(false);
  return (
    <div className="flex flex-col fixed bottom-4 ms-4 right-4 gap-2 items-end">
      {isWSOpen && (
        <div className=" min-h-[36vh] relative flex flex-col md:flex-row gap-2">
          <RoomsSidebar />
          <WebSocketTest />
        </div>
      )}
      <button
        className="border ms-auto whitespace-nowrap active:scale-95 hover:scale-102 transition-all border-white/25 bg-black/30 backdrop-blur-xl rounded-lg p-3"
        onClick={() => setIsWSOpen(!isWSOpen)}
      >
        {isWSOpen ? <PiChatTeardropSlashDuotone /> : <IoChatbubblesOutline />}
      </button>
    </div>
  );
};

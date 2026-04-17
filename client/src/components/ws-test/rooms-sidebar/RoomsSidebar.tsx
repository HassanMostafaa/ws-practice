"use client";
import { useState } from "react";
import { dummyRooms, type IRoom } from "./utils/dummy";

import { GiCheckboxTree } from "react-icons/gi";
import { BsArrowsAngleExpand, BsArrowsCollapse } from "react-icons/bs";
import { FaUsersLine } from "react-icons/fa6";
import { TbUserOff } from "react-icons/tb";

export const RoomsSidebar = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <aside
      className={`border  absolute md:relative z-2 bg-black/30 w-full md:w-60 backdrop-blur-sm border-white/15 rounded-lg max-md:-translate-y-16 ${!expanded ? "max-h-14 overflow-hidden top-0 " : "max-h-[36vh] overflow-auto top-0 "}`}
    >
      <header
        onClick={toggleExpand}
        className="hover:bg-white/5 flex sticky top-0 bg-black gap-2 justify-between items-center border-b p-2 border-white/15"
      >
        <div className="flex gap-2 items-start">
          <GiCheckboxTree className="translate-y-1" />
          <p className="flex flex-col gap-0">
            <span>Channels</span>
            <span className="text-xs text-white/70">
              {dummyRooms?.length} available channels
            </span>
          </p>
        </div>

        {expanded ? <BsArrowsCollapse /> : <BsArrowsAngleExpand />}
      </header>

      {dummyRooms?.length > 0 && (
        <nav className="flex flex-col gap-1 justify-start p-1 items-start ">
          {dummyRooms?.map((room: IRoom) => (
            <button
              key={room.id}
              className="bg-white/2 rounded border-white/15 p-2 w-full text-start"
            >
              <div className="flex text-sm items-center gap-2">
                {room.icon}
                {room.name}
              </div>
              <div className="flex text-xs text-white/70 items-center gap-1 ms-6">
                {room?.onlineCount && room?.onlineCount > 0 ? (
                  <>
                    <FaUsersLine /> {room?.onlineCount}
                  </>
                ) : (
                  <>
                    <TbUserOff /> Empty
                  </>
                )}
              </div>
            </button>
          ))}
        </nav>
      )}
    </aside>
  );
};

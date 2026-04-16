"use client";
import { ReactNode } from "react";
import { MdOutlineFeaturedPlayList } from "react-icons/md";

interface IRoom {
  icon: ReactNode;
  name: string;
  id: string | number;
  key: string;
}

const dummyRooms = [
  {
    icon: <MdOutlineFeaturedPlayList />,
    name: "General",
    id: "general",
    key: "general",
  },
  {
    icon: <MdOutlineFeaturedPlayList />,
    name: "General",
    id: "general",
    key: "general",
  },
  {
    icon: <MdOutlineFeaturedPlayList />,
    name: "General",
    id: "general",
    key: "general",
  },
  {
    icon: <MdOutlineFeaturedPlayList />,
    name: "General",
    id: "general",
    key: "general",
  },
  {
    icon: <MdOutlineFeaturedPlayList />,
    name: "General",
    id: "general",
    key: "general",
  },
];

export const RoomsSidebar = () => {
  return (
    <div className="w-14 md:w-60 overflow-hidden min-h-[33vh] self-stretch border rounded-lg  border-white/25">
      <header className="border-b py-2 px-4 text-xs flex items-center gap-2 md:text-sm border-white/25">
        <MdOutlineFeaturedPlayList size={24} />{" "}
        <span className="max-md:hidden">Available channels</span>
      </header>

      {dummyRooms?.length > 0 && <nav></nav>}
    </div>
  );
};

"use client";

import { ReactNode, useMemo, useState } from "react";
import { MdLockOutline, MdOutlineFeaturedPlayList } from "react-icons/md";
import { cn } from "@/utils/cn";
import { FaUsers, FaUsersSlash } from "react-icons/fa";

interface IRoom {
  icon: ReactNode;
  name: string;
  id: string | number;
  key: string;
  onlineCount?: number;
  isPrivate: boolean;
}

const dummyRooms: IRoom[] = [
  {
    icon: <MdOutlineFeaturedPlayList />,
    name: "General",
    id: "general",
    key: "general",
    onlineCount: 12,
    isPrivate: false,
  },
  {
    icon: <MdOutlineFeaturedPlayList />,
    name: "Frontend",
    id: "frontend",
    key: "frontend",
    onlineCount: 0,
    isPrivate: false,
  },
  {
    icon: <MdOutlineFeaturedPlayList />,
    name: "Backend",
    id: "backend",
    key: "backend",
    onlineCount: 4,
    isPrivate: false,
  },
  {
    icon: <MdOutlineFeaturedPlayList />,
    name: "Design",
    id: "design",
    key: "design",
    onlineCount: 3,
    isPrivate: true,
  },
  {
    icon: <MdOutlineFeaturedPlayList />,
    name: "Leadership",
    id: "leadership",
    key: "leadership",
    onlineCount: 2,
    isPrivate: true,
  },
];

type RoomsSidebarProps = {
  rooms?: IRoom[];
  defaultSelectedRoomId?: string | number;
  onSelectRoom?: (room: IRoom) => void;
};

export const RoomsSidebar = ({
  rooms = dummyRooms,
  defaultSelectedRoomId,
  onSelectRoom,
}: RoomsSidebarProps) => {
  const initialRoomId = defaultSelectedRoomId ?? rooms?.[0]?.id ?? null;

  const [selectedRoomId, setSelectedRoomId] = useState<string | number | null>(
    initialRoomId,
  );

  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) ?? null,
    [rooms, selectedRoomId],
  );

  const handleSelectRoom = (room: IRoom) => {
    setSelectedRoomId(room.id);
    onSelectRoom?.(room);
  };

  return (
    <aside className="w-14 md:w-64 overflow-hidden min-h-[33vh] self-stretch rounded-lg border border-white/25 bg-black/20">
      <header className="flex items-center gap-2 border-b border-white/25 px-4 py-3 text-xs md:text-sm">
        <MdOutlineFeaturedPlayList size={20} />
        <span className="max-md:hidden">Available channels</span>
      </header>

      {rooms.length > 0 ? (
        <nav className="p-2 space-y-1">
          {rooms.map((room) => {
            const isActive = room.id === selectedRoomId;

            return (
              <button
                key={room.key}
                type="button"
                onClick={() => handleSelectRoom(room)}
                className={cn(
                  "group flex w-full items-start gap-2 rounded-md border p-1.5 md:p-2 text-left transition",
                  "border-transparent hover:border-white/20 hover:bg-white/5",
                  isActive
                    ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
                    : "text-white/80",
                )}
              >
                <span
                  className={cn(
                    "shrink-0 flex justify-center md:translate-y-1 items-center",
                    isActive ? "text-cyan-300" : "text-white/70",
                  )}
                >
                  {room.icon}
                </span>

                <div className="min-w-0 flex-1 max-md:hidden">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium">{room.name}</p>

                    {room.isPrivate && (
                      <span
                        className="inline-flex shrink-0 items-center gap-1 rounded-md border border-white/15 px-1.5 py-0.5 text-[10px] text-white/60"
                        title="Private room"
                      >
                        <MdLockOutline size={12} />
                        Private
                      </span>
                    )}
                  </div>

                  <p className="flex gap-1 items-center mt-0.5 text-xs text-white/45">
                    {room && room.onlineCount && room.onlineCount > 0 ? (
                      <>
                        <FaUsers />
                        {room.onlineCount ?? 0}
                      </>
                    ) : (
                      <>
                        <FaUsersSlash /> Empty
                      </>
                    )}
                  </p>
                </div>

                <span
                  className={cn(
                    "hidden md:block h-2 w-2 shrink-0 rounded-full",
                    isActive
                      ? "bg-cyan-300"
                      : "bg-white/20 group-hover:bg-white/40",
                  )}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </nav>
      ) : (
        <div className="p-4 text-xs text-white/50 md:text-sm">
          No rooms available.
        </div>
      )}

      <footer className="mt-auto border-t border-white/10 px-3 py-2 max-md:hidden">
        <p className="text-[11px] text-white/45">
          {selectedRoom ? `Selected: ${selectedRoom.name}` : "No room selected"}
        </p>
      </footer>
    </aside>
  );
};

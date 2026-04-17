import { ReactNode } from "react";
import { MdOutlineFeaturedPlayList } from "react-icons/md";

export interface IRoom {
  icon: ReactNode;
  name: string;
  id: string | number;
  key: string;
  onlineCount?: number;
  isPrivate: boolean;
}

export const dummyRooms: IRoom[] = [
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

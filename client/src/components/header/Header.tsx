"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrNotes } from "react-icons/gr";
import { RiHome2Line } from "react-icons/ri";

const links = [
  { href: "/", label: "", Icon: <RiHome2Line /> },
  { href: "/notes", label: "Notes", Icon: <GrNotes /> },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="border-b border-white/15 bg-black/30">
      <nav className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/">E2E Hybrid Practice</Link>

        <div className="flex items-center gap-2">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === link.href
                : pathname.startsWith(link.href);

            return (
              <Link
                className={`rounded-lg flex items-center gap-1 border  p-2 text-sm ${
                  isActive
                    ? "border-white bg-white text-black"
                    : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                }`}
                href={link.href}
                key={link.href}
              >
                {link?.Icon}
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

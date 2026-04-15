"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/notes", label: "Notes" },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="border-b border-white/15 bg-black/30">
      <nav className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/">WS Practice</Link>

        <div className="flex items-center gap-2">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === link.href
                : pathname.startsWith(link.href);

            return (
              <Link
                className={`rounded-lg border px-3 py-2 text-sm ${
                  isActive
                    ? "border-white bg-white text-black"
                    : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                }`}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

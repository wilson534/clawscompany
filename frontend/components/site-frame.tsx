"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const primaryNav = [
  { href: "/", label: "HQ" },
  { href: "/office/founder", label: "Founder" },
  { href: "/office/team", label: "Team" },
  { href: "/office/intel", label: "Intel" },
  { href: "/office/engineering", label: "Engineering" },
  { href: "/office/release", label: "Release" },
];

export function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const chromeless =
    pathname === "/" ||
    pathname === "/star-office" ||
    pathname.startsWith("/floor/") ||
    pathname.startsWith("/office/");

  if (chromeless) {
    return <main className="relative min-h-screen px-0 py-0">{children}</main>;
  }

  return (
    <div className="relative min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[rgba(9,12,18,0.72)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between gap-6 px-6 py-4">
          <div>
            <p className="opc-kicker">One-Person Company</p>
            <h1 className="opc-title text-lg font-semibold text-white">OPC Pixel Office</h1>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            {primaryNav.map((item) => (
              <Link key={item.href} href={item.href} className="opc-nav-chip">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-[1800px] flex-1 px-4 py-6 md:px-6">{children}</main>
    </div>
  );
}

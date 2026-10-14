"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { BagIcon, CloseIcon, Lemon, MenuIcon } from "@/components/icons";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="Lemon Gals home" className="shrink-0 flex items-center gap-1">
      <Lemon className="w-9 h-9" />
      <span className={`font-hand text-3xl leading-none tracking-wide ${light ? "text-cream" : "text-ink"}`}>LEMON GALS</span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 h-18 flex items-center justify-between gap-6">
        <Logo />

        <nav className="hidden lg:flex items-center gap-9 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`pb-1 border-b-2 transition-colors ${isActive(link.href) ? "border-ink" : "border-transparent hover:border-lemon"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/order" className="hidden sm:inline-flex rounded-full bg-lemon hover:bg-lemon-dark font-semibold text-sm px-6 py-2.5 transition-colors">
            Order Now
          </Link>
          <Link href="/checkout" aria-label={`Cart (${count} items)`} className="relative p-2">
            <BagIcon className="w-6 h-6" />
            {count > 0 && (
              <span className="absolute top-0 right-0 grid place-items-center min-w-4.5 h-4.5 px-1 rounded-full bg-lemon ring-1 ring-ink text-[10px] font-bold">
                {count}
              </span>
            )}
          </Link>
          <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} className="lg:hidden p-2">
            {open ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-line bg-cream px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-4 py-3 text-lg font-medium ${isActive(link.href) ? "bg-lemon/40" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

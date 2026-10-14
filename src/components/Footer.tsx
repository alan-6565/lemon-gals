import Link from "next/link";
import { business, navLinks } from "@/lib/data";
import { Logo } from "@/components/Navbar";
import { ClockIcon, PinIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="mt-16 bg-espresso text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-10 grid gap-8 md:grid-cols-[auto_1fr_auto] items-center text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Logo light />
          <p className="text-sm text-cream/70">Good drinks, brighter days ♡</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-cream/80">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-lemon">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-center md:items-end gap-2 text-sm text-cream/80">
          <span className="flex items-center gap-2">
            <PinIcon className="w-5 h-5 text-lemon" /> {business.address}
          </span>
          <span className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-lemon" /> {business.hours}
          </span>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">© {business.name} · {business.city}</div>
    </footer>
  );
}

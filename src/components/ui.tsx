import Image from "next/image";
import Link from "next/link";
import { money, type Item } from "@/lib/data";
import { ArrowRightIcon, HeartSolid } from "@/components/icons";

export function Button({
  href,
  children,
  variant = "solid",
  arrow = true,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "light";
  arrow?: boolean;
  className?: string;
}) {
  const styles = {
    solid: "bg-lemon hover:bg-lemon-dark text-ink",
    outline: "border-2 border-ink text-ink hover:bg-ink hover:text-cream",
    light: "border-2 border-cream text-cream hover:bg-cream hover:text-ink",
  }[variant];
  return (
    <Link href={href} className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold px-7 py-3 transition-colors ${styles} ${className}`}>
      {children} {arrow && <ArrowRightIcon className="w-4 h-4" />}
    </Link>
  );
}

/** Hand-lettered heading with a yellow heart, like "Featured Favorites ♥" */
export function Heading({ children, as = "h2", className = "" }: { children: React.ReactNode; as?: "h1" | "h2"; className?: string }) {
  const Tag = as;
  const size = as === "h1" ? "text-6xl sm:text-7xl" : "text-4xl sm:text-5xl";
  return (
    <Tag className={`inline-flex items-center gap-2 font-hand text-ink leading-none ${size} ${className}`}>
      {children}
      <HeartSolid className={`${as === "h1" ? "w-9 h-9" : "w-7 h-7"} text-lemon -rotate-12`} />
    </Tag>
  );
}

export function ItemCard({ item }: { item: Item }) {
  return (
    <Link href={`/menu/${item.id}`} className="group block">
      <div className="relative aspect-square rounded-xl overflow-hidden shadow-sm">
        <Image src={item.image} alt={item.name} fill sizes="(min-width:1024px) 22vw, 45vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <p className="mt-2 font-semibold text-sm leading-tight group-hover:underline">{item.name}</p>
      <p className="text-sm text-ink-soft">{money(item.price)}</p>
    </Link>
  );
}

const STEPS = ["Your Order", "Pickup Time", "Your Info", "Payment"];

export function Steps({ current }: { current: number }) {
  return (
    <ol className="mx-auto max-w-2xl grid grid-cols-4">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const on = n <= current;
        return (
          <li key={label} className="relative flex flex-col items-center text-center">
            {i > 0 && <span className={`absolute top-4 right-1/2 w-full h-0.5 ${on ? "bg-ink" : "bg-line"}`} />}
            <span className={`relative z-10 grid place-items-center w-8 h-8 rounded-full text-sm font-bold ${on ? "bg-lemon text-ink ring-2 ring-ink" : "bg-cream border-2 border-line text-ink-soft"}`}>
              {n < current ? "✓" : n}
            </span>
            <span className={`mt-2 text-[11px] sm:text-sm ${n === current ? "font-bold" : "text-ink-soft"}`}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

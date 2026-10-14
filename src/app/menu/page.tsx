"use client";

import { useState } from "react";
import { categories, featured, items, type Category } from "@/lib/data";
import { Heading, ItemCard } from "@/components/ui";
import { CupIcon, CupcakeIcon, HeartDoodle, SparkleIcon, StarIcon } from "@/components/icons";

const ICONS: Record<(typeof categories)[number], typeof CupIcon> = {
  All: StarIcon,
  Coffee: CupIcon,
  Matcha: HeartDoodle,
  Specialty: SparkleIcon,
  Refreshers: CupIcon,
  Food: CupcakeIcon,
  Treats: CupcakeIcon,
};

function Section({ title, list }: { title: string; list: typeof items }) {
  return (
    <section className="pt-12">
      <Heading>{title}</Heading>
      {list.length ? (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {list.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-2xl border-2 border-dashed border-line px-6 py-10 text-center font-hand text-3xl text-ink-soft">Coming soon ♡</p>
      )}
    </section>
  );
}

export default function MenuPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const shown: Category[] = cat === "All" ? ["Coffee", "Matcha", "Specialty", "Treats"] : [cat];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-10">
      <div className="text-center">
        <Heading as="h1">Our Menu</Heading>
        <p className="mt-3 text-ink-soft">Coffee, matcha, and more — all made with love.</p>
      </div>

      <div className="mt-8 no-scrollbar flex sm:justify-center gap-3 overflow-x-auto pb-2">
        {categories.map((c) => {
          const Icon = ICONS[c];
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 w-24 rounded-xl border-2 py-3 text-xs font-medium flex flex-col items-center gap-1.5 transition-colors ${
                cat === c ? "border-ink bg-lemon/30" : "border-line bg-white/60 hover:border-ink/40"
              }`}
            >
              <Icon className="w-7 h-7" />
              {c}
            </button>
          );
        })}
      </div>

      {cat === "All" && <Section title="Featured Favorites" list={featured.map((id) => items.find((i) => i.id === id)!)} />}
      {shown.map((c) => (
        <Section key={c} title={c} list={items.filter((i) => i.category === c)} />
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { addOns, isDrink, milks, money, sizes, sweetness, type Item } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { HeartSolid } from "@/components/icons";

function Option({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md border px-4 py-1.5 text-sm transition-colors ${active ? "bg-espresso border-espresso text-cream" : "border-line bg-white hover:border-ink/50"}`}
    >
      {children}
    </button>
  );
}

export default function ItemBuilder({ item }: { item: Item }) {
  const cart = useCart();
  const drink = isDrink(item);
  const [size, setSize] = useState("16 oz");
  const [milk, setMilk] = useState("Whole");
  const [sweet, setSweet] = useState("Regular");
  const [picked, setPicked] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const extras = addOns.filter((a) => !a.only || a.only === item.id);
  const unitPrice =
    item.price +
    (drink ? sizes.find((s) => s.name === size)!.price : 0) +
    picked.reduce((n, name) => n + extras.find((a) => a.name === name)!.price, 0);

  const toggle = (name: string) => setPicked((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));

  const add = () => {
    cart.add({
      drinkId: item.id,
      name: item.name,
      image: item.image,
      size: drink ? size : "—",
      milk: drink ? milk : "—",
      extras: drink ? [...(sweet !== "Regular" ? [sweet] : []), ...picked] : [],
      unitPrice,
      qty,
    });
    setAdded(true);
  };

  return (
    <div className="mt-6 grid md:grid-cols-[minmax(0,420px)_1fr] gap-10">
      <div className="relative aspect-[230/360] max-h-[620px] rounded-2xl overflow-hidden shadow-lg">
        <Image src={item.bigImage ?? item.image} alt={item.name} fill priority sizes="(min-width:768px) 420px, 90vw" className="object-cover" />
      </div>

      <div>
        <h1 className="inline-flex items-center gap-2 font-hand text-5xl sm:text-6xl leading-none">
          {item.name} <HeartSolid className="w-8 h-8 text-lemon" />
        </h1>
        <p className="mt-2 text-2xl font-bold">{money(item.price)}</p>
        {item.desc && <p className="mt-3 max-w-md text-ink-soft">{item.desc}</p>}

        {drink && (
          <>
            <p className="mt-6 mb-2 text-sm font-semibold">Size</p>
            <div className="flex gap-2">
              {sizes.map((s) => (
                <Option key={s.name} active={size === s.name} onClick={() => setSize(s.name)}>
                  {s.name} {s.price > 0 && `(+${money(s.price)})`}
                </Option>
              ))}
            </div>

            <p className="mt-5 mb-2 text-sm font-semibold">Milk</p>
            <div className="flex flex-wrap gap-2">
              {milks.map((m) => (
                <Option key={m} active={milk === m} onClick={() => setMilk(m)}>
                  {m}
                </Option>
              ))}
            </div>

            <p className="mt-5 mb-2 text-sm font-semibold">Sweetness</p>
            <div className="flex flex-wrap gap-2">
              {sweetness.map((s) => (
                <Option key={s} active={sweet === s} onClick={() => setSweet(s)}>
                  {s}
                </Option>
              ))}
            </div>

            <p className="mt-5 mb-2 text-sm font-semibold">Add Ons (Optional)</p>
            <ul className="max-w-md divide-y divide-line">
              {extras.map((a) => (
                <li key={a.name}>
                  <label className="flex items-center gap-3 py-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={picked.includes(a.name)} onChange={() => toggle(a.name)} className="w-4 h-4 accent-[#2b2018]" />
                    <span className="flex-1">{a.name}</span>
                    <span className="text-ink-soft">+{money(a.price)}</span>
                  </label>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-6 flex items-center gap-4 max-w-md">
          <div className="inline-flex items-center rounded-full border-2 border-line bg-white">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2.5 font-bold" aria-label="Less">
              −
            </button>
            <span className="w-5 text-center font-semibold">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="px-4 py-2.5 font-bold" aria-label="More">
              +
            </button>
          </div>
          <button onClick={add} className="flex-1 rounded-full bg-lemon hover:bg-lemon-dark font-bold py-3.5 transition-colors">
            {added ? "Added! Add another ♡" : `Add to Cart · ${money(unitPrice * qty)}`}
          </button>
        </div>
        {added && (
          <Link href="/checkout" className="mt-3 inline-block text-sm font-semibold underline">
            View cart & checkout ({cart.count}) →
          </Link>
        )}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { business, money } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { Heading, Steps } from "@/components/ui";
import { HeartSolid, PinIcon } from "@/components/icons";

// Pickup slots every 30 minutes during open hours, 7:00 am – 4:30 pm
const TIMES = Array.from({ length: 20 }, (_, i) => {
  const mins = 7 * 60 + i * 30;
  const h = Math.floor(mins / 60);
  return `${((h + 11) % 12) + 1}:${(mins % 60).toString().padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
});

const PAY_METHODS = [
  { name: "Apple Pay", badge: <span className="rounded border border-ink px-1.5 text-xs font-semibold"> Pay</span> },
  { name: "Card", badge: <span className="text-xs text-ink-soft">Visa · Mastercard · Amex</span> },
  { name: "Google Pay", badge: <span className="rounded border border-ink-soft px-1.5 text-xs font-semibold"><span className="text-[#4285F4]">G</span> Pay</span> },
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white border border-line p-5 sm:p-7">
      <h2 className="font-hand text-4xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm text-ink-soft">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border-2 border-line bg-cream/60 px-4 py-2.5 placeholder:text-ink-soft/50 focus:outline-none focus:border-ink"
      />
    </label>
  );
}

export default function CheckoutPage() {
  const cart = useCart();
  const [day, setDay] = useState("Today");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pay, setPay] = useState("Apple Pay");
  const [placed, setPlaced] = useState<null | { total: number; when: string; name: string }>(null);

  const hasTime = time !== "";
  const hasInfo = name.trim() !== "" && phone.trim() !== "";
  const step = !hasTime ? 2 : !hasInfo ? 3 : 4;
  const ready = cart.count > 0 && hasTime && hasInfo;

  const placeOrder = () => {
    setPlaced({ total: cart.subtotal, when: `${day} at ${time}`, name: name.trim().split(" ")[0] });
    cart.clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <span className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-lemon ring-2 ring-ink">
          <HeartSolid className="w-8 h-8" />
        </span>
        <h1 className="mt-5 font-hand text-6xl">Thank you, {placed.name}!</h1>
        <p className="mt-4 text-lg">
          Your order for <strong>{placed.when}</strong> ({money(placed.total)}) is in.
        </p>
        <p className="mt-2 text-ink-soft">Pick it up at Lemon Gals inside the San Pablo Community Center ♡</p>
        <p className="mt-6 rounded-xl border-2 border-dashed border-line px-4 py-3 text-sm text-ink-soft">Preview site: no payment was taken and no order was sent.</p>
        <Link href="/menu" className="mt-6 inline-flex rounded-full bg-lemon hover:bg-lemon-dark font-bold px-8 py-3">
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 pt-10">
      <div className="text-center">
        <Heading as="h1">Checkout</Heading>
      </div>
      <div className="mt-8">
        <Steps current={step} />
      </div>

      <div className="mt-10 grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        <div className="space-y-6">
          <Card title="Pickup Time">
            <div className="flex items-center gap-3 rounded-xl bg-cream-deep px-4 py-3">
              <PinIcon className="w-6 h-6 shrink-0" />
              <p className="text-sm">
                <span className="font-semibold">Pickup at Lemon Gals</span> — {business.location.toLowerCase()}, {business.address}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              {["Today", "Tomorrow"].map((d) => (
                <button key={d} onClick={() => setDay(d)} className={`rounded-full px-5 py-1.5 text-sm font-medium ${day === d ? "bg-espresso text-cream" : "bg-cream-deep"}`}>
                  {d}
                </button>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-2">
              {TIMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`rounded-lg border-2 py-2 text-sm transition-colors ${time === t ? "border-ink bg-lemon font-semibold" : "border-line hover:border-ink/50"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Card>

          <Card title="Your Info">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" value={name} onChange={setName} placeholder="Your name" />
              <Field label="Phone number" value={phone} onChange={setPhone} placeholder="(510) 555-0123" type="tel" />
              <div className="sm:col-span-2">
                <Field label="Email (optional, for your receipt)" value={email} onChange={setEmail} placeholder="you@email.com" type="email" />
              </div>
            </div>
          </Card>

          <Card title="Payment">
            <div className="space-y-2.5">
              {PAY_METHODS.map((m) => (
                <button
                  key={m.name}
                  onClick={() => setPay(m.name)}
                  className={`w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left ${pay === m.name ? "border-ink bg-lemon/20" : "border-line hover:border-ink/40"}`}
                >
                  <span className={`grid place-items-center w-5 h-5 rounded-full border-2 ${pay === m.name ? "border-ink" : "border-line"}`}>
                    {pay === m.name && <span className="w-2.5 h-2.5 rounded-full bg-ink" />}
                  </span>
                  <span className="flex-1 font-medium">{m.name}</span>
                  {m.badge}
                </button>
              ))}
            </div>
            <button
              onClick={placeOrder}
              disabled={!ready}
              className="mt-6 w-full rounded-full bg-lemon hover:bg-lemon-dark disabled:bg-line disabled:text-ink-soft text-lg font-bold py-4 transition-colors"
            >
              Place Order · {money(cart.subtotal)}
            </button>
            {!ready && (
              <p className="mt-2 text-center text-xs text-ink-soft">
                {cart.count === 0 ? "Add something to your cart first." : !hasTime ? "Pick a pickup time above." : "Add your name and phone number."}
              </p>
            )}
          </Card>
        </div>

        <aside className="rounded-2xl bg-white border border-line p-5 sm:p-6 lg:sticky lg:top-24">
          <div className="flex items-baseline justify-between">
            <h2 className="font-hand text-3xl">Order Summary</h2>
            <Link href="/order" className="text-sm underline">
              Edit
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {cart.items.map((i) => (
              <li key={i.key} className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <Image src={i.image} alt="" fill sizes="48px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{i.name}</p>
                  <p className="text-xs text-ink-soft truncate">{[i.size, i.milk, ...i.extras].filter((x) => x !== "—").join(" · ")}</p>
                </div>
                <span className="text-sm text-ink-soft">×{i.qty}</span>
                <span className="w-14 text-right text-sm font-semibold">{money(i.unitPrice * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-4 border-t border-line flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{money(cart.subtotal)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

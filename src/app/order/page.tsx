"use client";

import Image from "next/image";
import Link from "next/link";
import { items, money } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { Heading, ItemCard, Steps } from "@/components/ui";
import { ArrowRightIcon } from "@/components/icons";

export default function OrderPage() {
  const cart = useCart();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 pt-10">
      <div className="text-center">
        <Heading as="h1">Order Online</Heading>
        <p className="mt-3 text-ink-soft">Pick your favorites and pick them up at the San Pablo Community Center.</p>
      </div>
      <div className="mt-8">
        <Steps current={1} />
      </div>

      <div className="mt-10 grid lg:grid-cols-[1fr_380px] gap-8 items-start">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        <aside className="rounded-2xl bg-white border border-line p-5 lg:sticky lg:top-24">
          <div className="flex items-baseline justify-between">
            <h2 className="font-hand text-3xl">Your Cart ({cart.count})</h2>
            {cart.count > 0 && (
              <button onClick={cart.clear} className="text-xs underline text-ink-soft">
                Clear
              </button>
            )}
          </div>
          {cart.items.length === 0 ? (
            <p className="mt-3 text-sm text-ink-soft">Your cart is empty — tap any item to add it ♡</p>
          ) : (
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
                  <div className="inline-flex items-center rounded-full border border-line text-sm">
                    <button onClick={() => cart.setQty(i.key, i.qty - 1)} className="px-2" aria-label="Less">
                      −
                    </button>
                    <span className="px-1">{i.qty}</span>
                    <button onClick={() => cart.setQty(i.key, i.qty + 1)} className="px-2" aria-label="More">
                      +
                    </button>
                  </div>
                  <span className="w-14 text-right text-sm font-semibold">{money(i.unitPrice * i.qty)}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 pt-4 border-t border-line flex justify-between font-bold">
            <span>Subtotal</span>
            <span>{money(cart.subtotal)}</span>
          </div>
          <Link
            href={cart.count ? "/checkout" : "#"}
            aria-disabled={!cart.count}
            className={`mt-4 flex items-center justify-center gap-2 rounded-full py-3.5 font-bold ${
              cart.count ? "bg-lemon hover:bg-lemon-dark" : "bg-line text-ink-soft pointer-events-none"
            }`}
          >
            Checkout <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </aside>
      </div>
    </div>
  );
}

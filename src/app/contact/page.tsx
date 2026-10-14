"use client";

import Image from "next/image";
import { useState } from "react";
import { business } from "@/lib/data";
import { Heading } from "@/components/ui";
import { ClockIcon, PinIcon } from "@/components/icons";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-10 grid md:grid-cols-[1fr_1.3fr] gap-10 items-start">
      <div>
        <Heading as="h1">Visit Us</Heading>
        <ul className="mt-6 space-y-5">
          <li className="flex gap-4">
            <PinIcon className="w-8 h-8 shrink-0" />
            <div>
              <p className="font-semibold">{business.city}</p>
              <p className="text-sm text-ink-soft">
                {business.location}
                <br />
                {business.address}
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <ClockIcon className="w-8 h-8 shrink-0" />
            <div>
              <p className="font-semibold">Hours</p>
              <p className="text-sm text-ink-soft">
                Monday – Sunday
                <br />
                7:00 AM – 5:00 PM
              </p>
            </div>
          </li>
        </ul>
        <a href={business.mapsUrl} className="mt-6 inline-flex items-center gap-2 rounded-full bg-lemon hover:bg-lemon-dark font-semibold px-6 py-3">
          Get Directions →
        </a>

        <h2 className="mt-12 flex items-center gap-2 font-hand text-4xl">Send Us a Message ♥</h2>
        {sent ? (
          <p className="mt-4 rounded-xl bg-cream-deep px-5 py-6 text-center">
            Thanks for reaching out! ♡
            <br />
            <span className="text-xs text-ink-soft">(Preview site: messages don&apos;t send yet.)</span>
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mt-4 space-y-3"
          >
            <input required placeholder="Name" className="w-full rounded-lg border-2 border-line bg-white px-4 py-2.5 focus:outline-none focus:border-ink" />
            <input required type="email" placeholder="Email" className="w-full rounded-lg border-2 border-line bg-white px-4 py-2.5 focus:outline-none focus:border-ink" />
            <textarea required rows={4} placeholder="Message" className="w-full rounded-lg border-2 border-line bg-white px-4 py-2.5 focus:outline-none focus:border-ink" />
            <button className="w-full rounded-full bg-lemon hover:bg-lemon-dark font-bold py-3">Send Message →</button>
          </form>
        )}
      </div>

      <div className="space-y-5">
        <div className="relative aspect-[260/173] rounded-2xl overflow-hidden shadow-lg">
          <Image src="/images/storefront.jpg" alt="Lemon Gals at the San Pablo Community Center" fill priority sizes="(min-width:768px) 55vw, 100vw" className="object-cover" />
        </div>
        <a href={business.mapsUrl} className="relative block aspect-[260/122] rounded-2xl overflow-hidden border border-line">
          <Image src="/images/map.jpg" alt="Map showing Lemon Gals at 2450 Rd 20, San Pablo" fill sizes="(min-width:768px) 55vw, 100vw" className="object-cover" />
        </a>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { Heading } from "@/components/ui";
import { CupIcon, CupcakeIcon, PeopleIcon, SparkleIcon } from "@/components/icons";

const EVENTS = [
  { title: "Corporate Events", Icon: CupIcon },
  { title: "Birthdays", Icon: CupcakeIcon },
  { title: "Community Events", Icon: PeopleIcon },
  { title: "Pop-Ups & More", Icon: SparkleIcon },
];

const PHOTOS = [
  { src: "/images/cat-cupcakes.jpg", alt: "Cupcakes", ratio: "aspect-[142/87]" },
  { src: "/images/cat-board.jpg", alt: "Lemon Gals chalkboard sign", ratio: "aspect-[113/87]" },
  { src: "/images/cat-cupcakes2.jpg", alt: "Tray of frosted cupcakes", ratio: "aspect-[184/87]" },
];

export default function CateringPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-10">
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <Heading as="h1">Catering</Heading>
          <p className="mt-5 text-lg text-ink-soft leading-relaxed">
            Bring Lemon Gals to your next event! We offer drink catering for special occasions, gatherings, and businesses in
            the San Pablo area and beyond.
          </p>
          <a href="#quote" className="mt-7 inline-flex items-center gap-2 rounded-full bg-lemon hover:bg-lemon-dark font-semibold px-7 py-3">
            Get a Quote →
          </a>
        </div>
        <div className="relative aspect-[260/162] rounded-2xl overflow-hidden shadow-lg">
          <Image src="/images/catering-drinks.jpg" alt="A carrier of Lemon Gals drinks" fill priority sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {EVENTS.map(({ title, Icon }) => (
          <div key={title} className="text-center">
            <Icon className="mx-auto w-10 h-10" />
            <p className="mt-2 text-sm font-medium">{title}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 grid grid-cols-[1.4fr_1fr_1.8fr] gap-4">
        {PHOTOS.map((p) => (
          <div key={p.src} className={`relative ${p.ratio} rounded-2xl overflow-hidden`}>
            <Image src={p.src} alt={p.alt} fill sizes="33vw" className="object-cover" />
          </div>
        ))}
      </section>

      <section id="quote" className="mt-14 scroll-mt-24 rounded-2xl bg-white border border-line p-6 sm:p-8">
        <h2 className="font-hand text-4xl">Request a Quote</h2>
        {sent ? (
          <div className="py-10 text-center">
            <p className="font-hand text-4xl">Thank you! ♡</p>
            <p className="mt-2 text-ink-soft">We&apos;ll reach out soon to plan your event.</p>
            <p className="mt-6 text-xs text-ink-soft">(Preview site: this form doesn&apos;t send yet.)</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mt-5 grid sm:grid-cols-2 gap-4"
          >
            {[
              ["Name", "text"],
              ["Phone or Email", "text"],
              ["Event Date", "date"],
              ["Number of Guests", "number"],
            ].map(([label, type]) => (
              <label key={label} className="block">
                <span className="text-sm text-ink-soft">{label}</span>
                <input required type={type} className="mt-1 w-full rounded-lg border-2 border-line bg-cream/60 px-4 py-2.5 focus:outline-none focus:border-ink" />
              </label>
            ))}
            <label className="block sm:col-span-2">
              <span className="text-sm text-ink-soft">Tell us about your event</span>
              <textarea rows={4} className="mt-1 w-full rounded-lg border-2 border-line bg-cream/60 px-4 py-2.5 focus:outline-none focus:border-ink" />
            </label>
            <button className="sm:col-span-2 rounded-full bg-lemon hover:bg-lemon-dark font-bold py-3.5">Send Request</button>
          </form>
        )}
      </section>
    </div>
  );
}

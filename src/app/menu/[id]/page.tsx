import Link from "next/link";
import { notFound } from "next/navigation";
import { items } from "@/lib/data";
import { Heading, ItemCard } from "@/components/ui";
import { ArrowLeftIcon } from "@/components/icons";
import ItemBuilder from "./ItemBuilder";

export function generateStaticParams() {
  return items.map((item) => ({ id: item.id }));
}

export default async function ItemPage({ params }: PageProps<"/menu/[id]">) {
  const { id } = await params;
  const item = items.find((i) => i.id === id);
  if (!item) notFound();
  const more = items.filter((i) => i.id !== item.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-8">
      <Link href="/menu" className="inline-flex items-center gap-2 text-sm hover:underline">
        <ArrowLeftIcon className="w-4 h-4" /> Back to Menu
      </Link>

      <ItemBuilder item={item} />

      <section className="pt-14">
        <Heading>You Might Also Like</Heading>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-5">
          {more.map((m) => (
            <ItemCard key={m.id} item={m} />
          ))}
        </div>
      </section>
    </div>
  );
}

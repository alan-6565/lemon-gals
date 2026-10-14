import Image from "next/image";
import { featured, items } from "@/lib/data";
import { Button, Heading, ItemCard } from "@/components/ui";
import { CupIcon, CupcakeIcon, HeartDoodle, SparkleIcon } from "@/components/icons";

const FEATURES = [
  { title: "Handcrafted Drinks", Icon: CupIcon },
  { title: "Fresh Treats", Icon: CupcakeIcon },
  { title: "Local Favorite", Icon: HeartDoodle },
  { title: "Good Vibes", Icon: SparkleIcon },
];

export default function HomePage() {
  const favorites = featured.map((id) => items.find((i) => i.id === id)!);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8">
      {/* Hero */}
      <section className="relative mt-6 overflow-hidden rounded-3xl bg-espresso text-cream grid md:grid-cols-2">
        <div className="relative z-10 px-7 sm:px-12 py-12 md:py-16 flex flex-col justify-center">
          <h1 className="font-hand text-6xl sm:text-7xl lg:text-8xl leading-[0.9]">
            Good
            <br />
            Drinks
            <br />
            Brighter
            <br />
            <span className="inline-flex items-center gap-3">
              Days <HeartDoodle className="w-12 h-12 text-lemon" />
            </span>
          </h1>
          <p className="mt-6 max-w-xs text-cream/85">Coffee, matcha, and delicious treats made with love in San Pablo, CA.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/order">Order Now</Button>
            <Button href="/menu" variant="light" arrow={false}>
              View Menu
            </Button>
          </div>
        </div>
        <div className="relative aspect-[312/296] md:aspect-auto">
          <Image src="/images/hero.jpg" alt="Matcha and strawberry drinks with a cupcake on a wooden counter" fill priority sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
          <div className="hidden md:block absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-espresso to-transparent" />
        </div>
      </section>

      {/* Features */}
      <section className="py-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {FEATURES.map(({ title, Icon }) => (
          <div key={title} className="text-center">
            <Icon className="mx-auto w-10 h-10" />
            <p className="mt-2 text-sm font-medium">{title}</p>
          </div>
        ))}
      </section>

      {/* Photo tiles */}
      <section className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1.6fr] gap-4">
        <div className="relative aspect-[179/160] rounded-2xl overflow-hidden">
          <Image src="/images/tile-cupcakes.jpg" alt="Tray of cupcakes" fill sizes="(min-width:768px) 30vw, 50vw" className="object-cover" />
        </div>
        <div className="relative rounded-2xl bg-lemon p-6 flex flex-col justify-center">
          <p className="font-hand text-4xl leading-tight -rotate-3">
            Coffee
            <br />
            Matcha
            <br />
            Treats
            <br />& More ♡
          </p>
        </div>
        <div className="relative col-span-2 md:col-span-1 aspect-[191/160] md:aspect-auto rounded-2xl overflow-hidden">
          <Image src="/images/tile-cafe.jpg" alt="Inside the Lemon Gals cafe" fill sizes="(min-width:768px) 35vw, 100vw" className="object-cover" />
        </div>
      </section>

      {/* Featured favorites */}
      <section className="pt-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Heading>Featured Favorites</Heading>
          <Button href="/menu" variant="outline" className="px-5 py-2 text-sm">
            Full Menu
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-5">
          {favorites.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

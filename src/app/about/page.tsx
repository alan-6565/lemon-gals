import Image from "next/image";
import { Button, Heading } from "@/components/ui";
import { CupcakeIcon, HeartDoodle, HomeIcon, SparkleIcon } from "@/components/icons";

const VALUES = [
  { title: "Quality Ingredients", desc: "We use high quality ingredients in every drink.", Icon: SparkleIcon },
  { title: "Local & Community", desc: "Proudly serving San Pablo and beyond.", Icon: HomeIcon },
  { title: "Fresh Treats", desc: "Delicious cupcakes, cookies, and more.", Icon: CupcakeIcon },
  { title: "Good Vibes Always", desc: "A welcoming space for everyone.", Icon: HeartDoodle },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-10">
      <section className="grid md:grid-cols-[1fr_1.2fr] gap-10 items-center">
        <div>
          <Heading as="h1">About Lemon Gals</Heading>
          <p className="mt-5 text-lg text-ink-soft leading-relaxed">
            Lemon Gals is a local café in San Pablo, CA located inside the community center. We&apos;re passionate about creating
            delicious drinks and treats that bring people together. Everything we make is crafted with love, good ingredients,
            and good vibes.
          </p>
          <Button href="/menu" className="mt-7">
            Our Menu
          </Button>
        </div>
        <div className="relative aspect-[292/214] rounded-2xl overflow-hidden shadow-lg">
          <Image src="/images/about-cafe.jpg" alt="The Lemon Gals counter and pastry case" fill priority sizes="(min-width:768px) 55vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="mt-14 rounded-2xl bg-cream-deep p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {VALUES.map(({ title, desc, Icon }) => (
          <div key={title} className="text-center">
            <Icon className="mx-auto w-10 h-10" />
            <p className="mt-2 font-semibold text-sm">{title}</p>
            <p className="mt-1 text-xs text-ink-soft">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export const business = {
  name: "Lemon Gals",
  city: "San Pablo, CA",
  location: "Located inside the community center",
  address: "2450 Rd 20, San Pablo, CA 94806",
  hours: "Monday – Sunday · 7:00 AM – 5:00 PM",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=2450+Rd+20+San+Pablo+CA+94806",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order" },
  { href: "/about", label: "About" },
  { href: "/catering", label: "Catering" },
  { href: "/contact", label: "Contact" },
];

export const categories = ["All", "Coffee", "Matcha", "Specialty", "Refreshers", "Food", "Treats"] as const;
export type Category = Exclude<(typeof categories)[number], "All">;

export type Item = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  desc?: string;
  bigImage?: string;
};

export const items: Item[] = [
  {
    id: "mazapan",
    name: "Mexican Mazapán",
    price: 6.5,
    image: "/images/d-mazapan.jpg",
    bigImage: "/images/mazapan-big.jpg",
    category: "Specialty",
    desc: "A sweet and nutty latte inspired by traditional Mexican mazapán, topped with crushed mazapán cookies.",
  },
  { id: "caramel", name: "Caramel Latte", price: 6.5, image: "/images/d-caramel.jpg", category: "Coffee" },
  { id: "churro", name: "Churro Latte", price: 6.5, image: "/images/d-churro.jpg", category: "Coffee" },
  { id: "vanilla", name: "Vanilla Latte", price: 6.0, image: "/images/d-vanilla.jpg", category: "Coffee" },
  { id: "mocha", name: "Mocha", price: 6.0, image: "/images/d-mocha.jpg", category: "Coffee" },
  { id: "pistachio-cold-brew", name: "Pistachio Cold Brew", price: 6.75, image: "/images/d-pistachio.jpg", category: "Coffee" },
  { id: "strawberry-matcha", name: "Strawberry Matcha", price: 6.5, image: "/images/d-strawberry-matcha.jpg", category: "Matcha" },
  { id: "tres-leches", name: "Tres Leches Cupcake", price: 5.5, image: "/images/d-tres-leches.jpg", category: "Treats" },
];

export const featured = ["tres-leches", "mazapan", "strawberry-matcha"];

export const isDrink = (item: Item) => item.category !== "Treats" && item.category !== "Food";

export const sizes = [
  { name: "16 oz", price: 0 },
  { name: "24 oz", price: 1 },
];
export const milks = ["Whole", "Oat", "Almond", "Coconut"];
export const sweetness = ["Regular", "Light", "No Sweetener"];
export const addOns = [
  { name: "Cold Foam", price: 0.75 },
  { name: "Extra Mazapán", price: 0.75, only: "mazapan" },
  { name: "Whipped Cream", price: 0.5 },
  { name: "Cinnamon", price: 0.5 },
];

export const money = (n: number) => `$${n.toFixed(2)}`;

import type { Metadata } from "next";
import { Caveat_Brush, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart";

const caveatBrush = Caveat_Brush({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: "400",
});

const dmSans = DM_Sans({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lemon Gals — Coffee, Matcha & Treats | San Pablo, CA",
  description: "Coffee, matcha, and delicious treats made with love, inside the San Pablo Community Center.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${caveatBrush.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-ink font-ui">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Bottle from "@/components/Bottle";

const slides = [
  {
    eyebrow: "Limited Offer",
    title: "Buy 3, Get a 50ML Free",
    text: "Pick any three of our 50ml perfumes and we will add a fourth on the house.",
    cta: "Shop the Deal",
    href: "/products/buy-3-get-50ml-free",
    bg: "from-[#1a1410] via-[#2b1f14] to-[#4a3420]",
    colors: ["#3b2417", "#b8893b"],
  },
  {
    eyebrow: "New Launch",
    title: "The Aarambh Series",
    text: "Six brand-new signature scents. Fresh, bold and made to be noticed.",
    cta: "Discover the Series",
    href: "/pages/aarambh-series",
    bg: "from-[#0f1b2d] via-[#1b2a49] to-[#2f4a78]",
    colors: ["#1f3b4d", "#9fc5e8"],
  },
  {
    eyebrow: "Just Landed",
    title: "Scented Candles & Body Mists",
    text: "Fill your home and your day with light, lasting fragrance.",
    cta: "Explore Candles",
    href: "/collections/candles",
    bg: "from-[#2a1424] via-[#4a2140] to-[#7b3f61]",
    colors: ["#a23b72", "#f4c2d7"],
  },
];

export default function HeroSlider() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const s = slides[i];

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${s.bg} text-white transition-all duration-700`}>
      <div className="container-page grid items-center gap-6 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-gold">{s.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">{s.title}</h1>
          <p className="mt-4 max-w-md text-base text-neutral-200">{s.text}</p>
          <Link href={s.href} className="mt-8 inline-block bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wider text-ink transition hover:bg-gold hover:text-white">
            {s.cta}
          </Link>
        </div>
        <div className="mx-auto h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96">
          <Bottle colors={s.colors} className="h-full w-full drop-shadow-2xl" />
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, n) => (
          <button
            key={n}
            onClick={() => setI(n)}
            aria-label={`Slide ${n + 1}`}
            className={`h-2 rounded-full transition-all ${n === i ? "w-8 bg-white" : "w-2 bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}

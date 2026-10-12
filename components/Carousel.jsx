"use client";

import { useRef } from "react";
import ProductCard from "@/components/ProductCard";

export default function Carousel({ items }) {
  const ref = useRef(null);
  const scroll = (dir) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div ref={ref} className="hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2">
        {items.map((p) => (
          <div key={p.slug} className="w-[46%] shrink-0 sm:w-[31%] lg:w-[23.5%]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll(-1)}
        aria-label="Previous"
        className="absolute -left-3 top-1/3 hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-ink hover:text-white lg:flex"
      >
        ‹
      </button>
      <button
        onClick={() => scroll(1)}
        aria-label="Next"
        className="absolute -right-3 top-1/3 hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-ink hover:text-white lg:flex"
      >
        ›
      </button>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name: A to Z" },
];

export default function CollectionGrid({ products }) {
  const [sort, setSort] = useState("featured");
  const [size, setSize] = useState("all");

  const sizes = useMemo(() => ["all", ...Array.from(new Set(products.map((p) => p.size)))], [products]);

  const shown = useMemo(() => {
    let list = products.filter((p) => size === "all" || p.size === size);
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [products, sort, size]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-y border-neutral-200 py-3 text-sm">
        <label className="flex items-center gap-2">
          <span className="text-neutral-500">Size</span>
          <select value={size} onChange={(e) => setSize(e.target.value)} className="border border-neutral-300 bg-white px-3 py-2">
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All sizes" : s}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center gap-4">
          <span className="text-neutral-500">{shown.length} products</span>
          <label className="flex items-center gap-2">
            <span className="text-neutral-500">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-neutral-300 bg-white px-3 py-2">
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="py-16 text-center text-neutral-500">No products match this filter.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

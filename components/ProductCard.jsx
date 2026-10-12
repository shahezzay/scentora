"use client";

import Link from "next/link";
import Bottle from "@/components/Bottle";
import { useCart } from "@/context/CartContext";
import { discountPercent, formatPrice } from "@/data/products";

export function Stars({ value = 5, size = "text-sm" }) {
  const full = Math.round(value);
  return (
    <span className={`${size} tracking-tight text-gold`} aria-label={`${value} out of 5`}>
      {"★".repeat(full)}
      <span className="text-neutral-300">{"★".repeat(5 - full)}</span>
    </span>
  );
}

export default function ProductCard({ product, collection }) {
  const { addItem } = useCart();
  const off = discountPercent(product);
  const href = `/products/${product.slug}`;

  return (
    <div className="group flex flex-col">
      <Link href={href} className="relative block overflow-hidden bg-sand">
        {off > 0 && (
          <span className="absolute left-2 top-2 z-10 bg-ink px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            {off}% off
          </span>
        )}
        <div className="aspect-square p-6 transition duration-500 group-hover:scale-105">
          <Bottle colors={product.colors} kind={product.kind} className="h-full w-full" />
        </div>
      </Link>

      <div className="flex flex-1 flex-col pt-3">
        <Link href={href} className="text-sm font-semibold hover:underline sm:text-base">
          {product.name}
        </Link>
        <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
          <Stars value={product.rating} />
          <span>{product.reviews > 0 ? `${product.reviews} reviews` : "No reviews"}</span>
        </div>
        <div className="mt-1 text-sm">
          {product.compareAt && (
            <span className="mr-2 text-neutral-400 line-through">{formatPrice(product.compareAt)}</span>
          )}
          <span className="font-semibold">{formatPrice(product.price)}</span>
        </div>
        <button
          onClick={() => addItem(product.slug)}
          className="mt-3 w-full border border-ink py-2.5 text-xs font-semibold uppercase tracking-wider transition hover:bg-ink hover:text-white"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

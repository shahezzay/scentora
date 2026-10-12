"use client";

import Link from "next/link";
import Bottle from "@/components/Bottle";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

export default function ProductCardMini({ product }) {
  const { addItem } = useCart();
  return (
    <div className="flex items-center gap-3 border border-neutral-200 p-2">
      <div className="h-16 w-16 shrink-0 bg-sand p-1.5">
        <Bottle colors={product.colors} kind={product.kind} className="h-full w-full" />
      </div>
      <div className="flex-1 text-sm">
        <Link href={`/products/${product.slug}`} className="font-semibold hover:underline">
          {product.name}
        </Link>
        <div className="text-neutral-600">{formatPrice(product.price)}</div>
      </div>
      <button onClick={() => addItem(product.slug)} className="border border-ink px-3 py-2 text-[11px] font-semibold uppercase tracking-wider hover:bg-ink hover:text-white">
        Add
      </button>
    </div>
  );
}

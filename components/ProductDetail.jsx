"use client";

import { useState } from "react";
import Link from "next/link";
import Bottle from "@/components/Bottle";
import { Stars } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { discountPercent, formatPrice } from "@/data/products";

export default function ProductDetail({ product }) {
  const { addItem, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const off = discountPercent(product);
  const isBundle = product.kind === "bundle";

  function buyNow() {
    addItem(product.slug, qty);
    setOpen(false);
    window.location.href = "/checkout";
  }

  return (
    <div className="container-page grid gap-10 pb-10 md:grid-cols-2">
      {/* gallery */}
      <div>
        <div className="relative bg-sand p-10">
          {off > 0 && (
            <span className="absolute left-3 top-3 bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              {off}% off
            </span>
          )}
          <Bottle colors={product.colors} kind={product.kind} className="mx-auto h-80 w-80 max-w-full" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((n) => (
            <div key={n} className="bg-sand p-3">
              <Bottle
                colors={n === 1 ? [product.colors[1], product.colors[0]] : product.colors}
                kind={product.kind}
                className="mx-auto h-20 w-20"
              />
            </div>
          ))}
        </div>
      </div>

      {/* info */}
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gold">{product.family}</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">{product.name}</h1>
        <div className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
          <Stars value={product.rating} />
          <span>{product.reviews > 0 ? `${product.reviews} reviews` : "No reviews yet"}</span>
        </div>

        <div className="mt-4 text-2xl">
          {product.compareAt && <span className="mr-3 text-lg text-neutral-400 line-through">{formatPrice(product.compareAt)}</span>}
          <span className="font-semibold">{formatPrice(product.price)}</span>
        </div>
        <p className="mt-1 text-xs text-neutral-500">Size: {product.size} · Taxes included. Shipping calculated at checkout.</p>

        <p className="mt-5 leading-relaxed text-neutral-700">{product.description}</p>

        {!isBundle && (
          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
            {[
              ["Top", product.notes.top],
              ["Heart", product.notes.heart],
              ["Base", product.notes.base],
            ].map(([k, v]) => (
              <div key={k} className="border border-neutral-200 p-3">
                <div className="font-semibold uppercase tracking-wider text-gold">{k}</div>
                <div className="mt-1 text-neutral-700">{v}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <div className="flex items-center border border-neutral-300">
            <button className="h-12 w-12 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
              −
            </button>
            <span className="w-10 text-center">{qty}</span>
            <button className="h-12 w-12 text-lg" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
              +
            </button>
          </div>
          <button onClick={() => addItem(product.slug, qty)} className="btn-outline h-12 flex-1">
            Add to Cart
          </button>
        </div>
        <button onClick={buyNow} className="btn-dark mt-3 w-full">
          Buy it now
        </button>

        <ul className="mt-6 space-y-2 text-sm text-neutral-600">
          <li>✓ Free shipping when you order any two perfumes</li>
          <li>✓ Cash on delivery available</li>
          <li>✓ 14-day refund policy</li>
        </ul>

        {/* tabs */}
        <div className="mt-8 border-b border-neutral-200">
          {["description", "shipping", "returns"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`mr-6 border-b-2 pb-2 text-sm font-medium capitalize ${tab === t ? "border-ink" : "border-transparent text-neutral-500"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="py-4 text-sm leading-relaxed text-neutral-600">
          {tab === "description" && (
            <p>
              {product.description} Apply to pulse points such as wrists, neck and behind the ears. Keep away from direct sunlight and heat to preserve the fragrance.
            </p>
          )}
          {tab === "shipping" && (
            <p>
              Orders are dispatched within 24 hours and usually arrive in 2 to 4 working days across Pakistan. See our{" "}
              <Link href="/policies/shipping-policy" className="underline">
                shipping policy
              </Link>{" "}
              for details.
            </p>
          )}
          {tab === "returns" && (
            <p>
              If something is wrong with your order, contact us within 14 days. Read the full{" "}
              <Link href="/pages/return-policy" className="underline">
                refund policy
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

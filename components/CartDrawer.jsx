"use client";

import Link from "next/link";
import Bottle from "@/components/Bottle";
import ProductCardMini from "@/components/ProductCardMini";
import { useCart } from "@/context/CartContext";
import { formatPrice, products } from "@/data/products";

export default function CartDrawer() {
  const { open, setOpen, items, subtotal, setQty, removeItem } = useCart();
  const suggestions = products
    .filter((p) => ["gift-box", "body-mist-2x-deal", "4x-perfume-bundle", "tester-box"].includes(p.slug))
    .filter((p) => !items.some((i) => i.slug === p.slug));

  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <h2 className="font-display text-xl">Your Cart</h2>
          <button onClick={() => setOpen(false)} aria-label="Close cart" className="text-3xl leading-none">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-neutral-500">Your cart is currently empty.</p>
              <Link href="/collections/frontpage" onClick={() => setOpen(false)} className="btn-dark mt-5">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-neutral-200">
              {items.map(({ product, qty }) => (
                <li key={product.slug} className="flex gap-4 py-4">
                  <div className="h-20 w-20 shrink-0 bg-sand p-2">
                    <Bottle colors={product.colors} kind={product.kind} className="h-full w-full" />
                  </div>
                  <div className="flex-1">
                    <Link href={`/products/${product.slug}`} onClick={() => setOpen(false)} className="text-sm font-semibold hover:underline">
                      {product.name}
                    </Link>
                    <div className="mt-1 text-sm text-neutral-600">{formatPrice(product.price)}</div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center border border-neutral-300">
                        <button className="h-8 w-8" onClick={() => setQty(product.slug, qty - 1)} aria-label="Decrease">
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{qty}</span>
                        <button className="h-8 w-8" onClick={() => setQty(product.slug, qty + 1)} aria-label="Increase">
                          +
                        </button>
                      </div>
                      <button onClick={() => removeItem(product.slug)} className="text-xs text-neutral-500 underline">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {suggestions.length > 0 && (
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider">You may also like</h3>
                <Link href="/collections/crazy-deals" onClick={() => setOpen(false)} className="text-xs underline">
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {suggestions.map((p) => (
                  <ProductCardMini key={p.slug} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-neutral-200 px-5 py-4">
          <div className="flex items-center justify-between text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-1 text-xs text-neutral-500">Shipping and taxes are calculated at checkout.</p>
          <Link
            href="/checkout"
            onClick={() => setOpen(false)}
            className={`btn-dark mt-4 w-full ${items.length === 0 ? "pointer-events-none opacity-40" : ""}`}
          >
            Check out
          </Link>
          <Link href="/cart" onClick={() => setOpen(false)} className="mt-2 block text-center text-sm underline">
            View full cart
          </Link>
        </div>
      </aside>
    </div>
  );
}

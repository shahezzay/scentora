"use client";

import Link from "next/link";
import Bottle from "@/components/Bottle";
import Breadcrumb from "@/components/Breadcrumb";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

export default function CartPage() {
  const { items, subtotal, setQty, removeItem, clear } = useCart();

  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <div className="container-page pb-6">
        <h1 className="mb-8 text-center font-display text-3xl">Your Cart</h1>

        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-neutral-500">Your cart is currently empty.</p>
            <Link href="/collections/frontpage" className="btn-dark mt-6">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="hidden grid-cols-12 border-b border-neutral-200 pb-3 text-xs uppercase tracking-wider text-neutral-500 sm:grid">
                <span className="col-span-6">Product</span>
                <span className="col-span-3 text-center">Quantity</span>
                <span className="col-span-3 text-right">Total</span>
              </div>
              <ul className="divide-y divide-neutral-200">
                {items.map(({ product, qty }) => (
                  <li key={product.slug} className="grid grid-cols-12 items-center gap-3 py-5">
                    <div className="col-span-12 flex gap-4 sm:col-span-6">
                      <div className="h-24 w-24 shrink-0 bg-sand p-2">
                        <Bottle colors={product.colors} kind={product.kind} className="h-full w-full" />
                      </div>
                      <div>
                        <Link href={`/products/${product.slug}`} className="font-semibold hover:underline">
                          {product.name}
                        </Link>
                        <div className="mt-1 text-sm text-neutral-600">{formatPrice(product.price)}</div>
                        <button onClick={() => removeItem(product.slug)} className="mt-2 text-xs text-neutral-500 underline">
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="col-span-6 flex justify-start sm:col-span-3 sm:justify-center">
                      <div className="flex items-center border border-neutral-300">
                        <button className="h-9 w-9" onClick={() => setQty(product.slug, qty - 1)} aria-label="Decrease">
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{qty}</span>
                        <button className="h-9 w-9" onClick={() => setQty(product.slug, qty + 1)} aria-label="Increase">
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-span-6 text-right font-semibold sm:col-span-3">{formatPrice(product.price * qty)}</div>
                  </li>
                ))}
              </ul>
              <button onClick={clear} className="mt-4 text-sm text-neutral-500 underline">
                Clear cart
              </button>
            </div>

            <aside className="h-fit border border-neutral-200 bg-sand p-6">
              <h2 className="font-display text-xl">Order Summary</h2>
              <div className="mt-4 flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-2 text-xs text-neutral-500">Shipping, taxes and discount codes are calculated at checkout.</p>
              <Link href="/checkout" className="btn-dark mt-6 w-full">
                Check out
              </Link>
              <Link href="/collections/frontpage" className="mt-3 block text-center text-sm underline">
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}

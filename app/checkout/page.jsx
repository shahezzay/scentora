"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Bottle from "@/components/Bottle";
import Breadcrumb from "@/components/Breadcrumb";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { calcShipping, FREE_SHIPPING_MIN } from "@/lib/pricing";
import { api, useUser } from "@/lib/useUser";

const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Hyderabad", "Sialkot"];

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [form, setForm] = useState({
    email: "", firstName: "", lastName: "", address: "", city: "Karachi", phone: "", payment: "cod", note: "",
  });
  const [errors, setErrors] = useState({});
  const [orderId, setOrderId] = useState(null);

  const [user] = useUser();
  const [busy, setBusy] = useState(false);
  const [serverErr, setServerErr] = useState("");
  const [prefilled, setPrefilled] = useState(false);
  useEffect(() => {
    if (user && !prefilled) {
      setForm((f) => ({ ...f, email: f.email || user.email, firstName: f.firstName || user.firstName, lastName: f.lastName || user.lastName }));
      setPrefilled(true);
    }
  }, [user, prefilled]);

  const shipping = calcShipping(items);
  const total = subtotal + shipping;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setServerErr("");
    const err = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email address";
    if (!form.firstName.trim()) err.firstName = "First name is required";
    if (!form.lastName.trim()) err.lastName = "Last name is required";
    if (form.address.trim().length < 6) err.address = "Enter your full address";
    if (!/^(03\d{9}|\+923\d{9})$/.test(form.phone.replace(/[\s-]/g, ""))) err.phone = "Enter a valid mobile number (e.g. 03001234567)";
    setErrors(err);
    if (Object.keys(err).length) return;
    setBusy(true);
    const r = await api("/api/orders", {
      ...form,
      items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
    });
    setBusy(false);
    if (!r.ok) {
      if (r.data.fields) setErrors(r.data.fields);
      return setServerErr(r.data.error || "Could not place your order. Please try again.");
    }
    setOrderId(r.data.orderNo);
    clear();
  }

  if (orderId) {
    return (
      <div className="container-page py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">✓</div>
        <h1 className="mt-6 font-display text-3xl">Thank you, {form.firstName}!</h1>
        <p className="mt-3 text-neutral-600">
          Your order <strong>#{orderId}</strong> has been placed. Keep this number and the phone number you entered to track your parcel.
        </p>
        <p className="mt-1 text-sm text-neutral-500">Please keep the exact amount ready for the courier (Cash on Delivery).</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/pages/track-order" className="btn-outline">Track order</Link>
          <Link href="/collections/frontpage" className="btn-dark">Continue shopping</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-3xl">Your cart is empty</h1>
        <p className="mt-3 text-neutral-500">Add something to your cart before checking out.</p>
        <Link href="/collections/frontpage" className="btn-dark mt-6">Continue Shopping</Link>
      </div>
    );
  }

  const field = (k, label, props = {}) => (
    <div>
      <label htmlFor={`f-${k}`} className="mb-1 block text-xs font-medium uppercase tracking-wider text-neutral-500">{label}</label>
      <input id={`f-${k}`} className="input" value={form[k]} onChange={set(k)} {...props} />
      {errors[k] && <p className="mt-1 text-xs text-red-600">{errors[k]}</p>}
    </div>
  );

  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <form onSubmit={submit} className="container-page grid gap-10 pb-6 lg:grid-cols-5" noValidate>
        <div className="space-y-8 lg:col-span-3">
          <section>
            <h2 className="mb-3 font-display text-xl">Contact</h2>
            {field("email", "Email", { type: "email", placeholder: "you@example.com" })}
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl">Delivery</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {field("firstName", "First name")}
              {field("lastName", "Last name")}
              <div className="sm:col-span-2">{field("address", "Address", { placeholder: "House, street, area" })}</div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-neutral-500">City</label>
                <select className="input" value={form.city} onChange={set("city")}>
                  {cities.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              {field("phone", "Phone", { placeholder: "03001234567", inputMode: "tel" })}
            </div>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl">Payment</h2>
            <div className="divide-y divide-neutral-200 border border-neutral-200">
              {[
                ["cod", "Cash on Delivery (COD)", "Pay in cash when your order arrives."],
              ].map(([v, t, d]) => (
                <label key={v} className="flex cursor-pointer items-start gap-3 p-4">
                  <input type="radio" name="payment" checked={form.payment === v} onChange={() => setForm((f) => ({ ...f, payment: v }))} className="mt-1" />
                  <span>
                    <span className="block font-medium">{t}</span>
                    <span className="text-sm text-neutral-500">{d}</span>
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-neutral-500">Order note (optional)</label>
            <textarea className="input" rows={3} value={form.note} onChange={set("note")} />
          </section>

          {serverErr && <p className="text-sm text-red-600">{serverErr}</p>}
          <button className="btn-dark w-full py-4" disabled={busy}>{busy ? "Placing order…" : "Complete order"}</button>
        </div>

        <aside className="h-fit border border-neutral-200 bg-sand p-6 lg:col-span-2">
          <h2 className="font-display text-xl">Order Summary</h2>
          <ul className="mt-4 divide-y divide-neutral-200">
            {items.map(({ product, qty }) => (
              <li key={product.slug} className="flex items-center gap-3 py-3">
                <div className="relative h-14 w-14 shrink-0 bg-white p-1">
                  <Bottle colors={product.colors} kind={product.kind} className="h-full w-full" />
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-700 text-[10px] text-white">{qty}</span>
                </div>
                <div className="flex-1 text-sm">{product.name}</div>
                <div className="text-sm">{formatPrice(product.price * qty)}</div>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-neutral-300 pt-4 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
            <div className="flex justify-between border-t border-neutral-300 pt-3 text-lg font-semibold"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
          </dl>
          <p className="mt-3 text-xs text-neutral-500">Free shipping on any two perfumes or orders above Rs.{FREE_SHIPPING_MIN.toLocaleString("en-PK")}.</p>
        </aside>
      </form>
    </>
  );
}

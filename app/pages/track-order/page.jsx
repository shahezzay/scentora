"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { api } from "@/lib/useUser";

const steps = ["placed", "packed", "out_for_delivery", "delivered"];
const LABELS = { placed: "Order placed", packed: "Packed", out_for_delivery: "Out for delivery", delivered: "Delivered" };

export default function TrackOrderPage() {
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const [stage, setStage] = useState(null);
  const [status, setStatus] = useState("");

  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setStage(null);
    if (!/^#?SC\d{6}$/i.test(id.trim())) return setErr("Order numbers look like SC123456.");
    if (phone.replace(/\D/g, "").length < 10) return setErr("Enter the phone number used on the order.");
    setBusy(true);
    const r = await api("/api/orders/track", { orderNo: id, phone });
    setBusy(false);
    if (!r.ok) return setErr(r.data.error || "Could not look up this order.");
    setStatus(r.data.status);
    setStage(r.data.status === "cancelled" ? -1 : steps.indexOf(r.data.status));
  }

  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Track Order" }]} />
      <div className="container-page pb-6">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center font-display text-3xl sm:text-4xl">Track Your Order</h1>
          <p className="mt-3 text-center text-neutral-600">Enter your order number and phone number to see where your parcel is.</p>

          <form onSubmit={submit} className="mt-8 space-y-4" noValidate>
            <input className="input" placeholder="Order number (e.g. SC123456)" value={id} onChange={(e) => setId(e.target.value)} />
            <input className="input" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            {err && <p className="text-sm text-red-600">{err}</p>}
            <button className="btn-dark w-full" disabled={busy}>{busy ? "Checking…" : "Track"}</button>
          </form>

          {stage !== null && (
            <div className="mt-10 border border-neutral-200 p-6">
              <p className="mb-5 text-sm text-neutral-500">Status for {id.trim().toUpperCase().replace(/^#?/, "#")}</p>
              {status === "cancelled" ? (
                <p className="text-sm text-red-700">This order was cancelled. Please contact support if you have any questions.</p>
              ) : (
              <ol className="space-y-4">
                {steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${i <= stage ? "bg-ink text-white" : "bg-neutral-200 text-neutral-500"}`}>
                      {i <= stage ? "✓" : i + 1}
                    </span>
                    <span className={i <= stage ? "font-medium" : "text-neutral-400"}>{LABELS[s]}</span>
                  </li>
                ))}
              </ol>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { api, useUser } from "@/lib/useUser";
import { ORDER_STATUSES, STATUS_LABELS } from "@/lib/pricing";
import { products, formatPrice } from "@/data/products";

const TABS = ["Orders", "Messages", "Codes"];

function Orders() {
  const [orders, setOrders] = useState(null);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);
  const load = useCallback(() => fetch("/api/admin/orders").then((r) => r.json()).then((d) => setOrders(d.orders || [])), []);
  useEffect(() => { load(); }, [load]);

  async function setStatus(o, status) {
    setOrders((list) => list.map((x) => (x.id === o.id ? { ...x, status } : x)));
    const r = await api(`/api/admin/orders/${o.id}`, { status }, "PATCH");
    if (!r.ok) load();
  }

  if (!orders) return <p className="text-sm text-neutral-500">Loading…</p>;
  const shown = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const revenue = orders.filter((o) => o.status !== "cancelled").reduce((n, o) => n + o.total, 0);

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="bg-sand p-4"><p className="text-xs uppercase text-neutral-500">Orders</p><p className="text-2xl font-semibold">{orders.length}</p></div>
        <div className="bg-sand p-4"><p className="text-xs uppercase text-neutral-500">New</p><p className="text-2xl font-semibold">{orders.filter((o) => o.status === "placed").length}</p></div>
        <div className="col-span-2 bg-sand p-4 sm:col-span-1"><p className="text-xs uppercase text-neutral-500">Revenue (excl. cancelled)</p><p className="text-2xl font-semibold">{formatPrice(revenue)}</p></div>
      </div>
      <select className="input mb-4 max-w-xs" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All statuses</option>
        {ORDER_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
      </select>
      {shown.length === 0 && <p className="text-sm text-neutral-500">No orders yet.</p>}
      <ul className="divide-y divide-neutral-200 border border-neutral-200">
        {shown.map((o) => (
          <li key={o.id} className="p-4 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button className="text-left" onClick={() => setOpen(open === o.id ? null : o.id)}>
                <span className="font-semibold">#{o.order_no}</span>{" "}
                <span className="text-neutral-500">· {o.first_name} {o.last_name} · {o.city}</span>
                <span className="block text-xs text-neutral-400">{new Date(o.created_at).toLocaleString("en-GB")}</span>
              </button>
              <div className="flex items-center gap-3">
                <span className="font-medium">{formatPrice(o.total)}</span>
                <select className="input !w-auto !py-2" value={o.status} onChange={(e) => setStatus(o, e.target.value)}>
                  {ORDER_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                </select>
              </div>
            </div>
            {open === o.id && (
              <div className="mt-3 grid gap-4 bg-sand p-4 sm:grid-cols-2">
                <div>
                  <p className="font-medium">Customer</p>
                  <p>{o.first_name} {o.last_name}</p>
                  <p><a className="underline" href={`tel:${o.phone}`}>{o.phone}</a></p>
                  <p>{o.email}</p>
                  <p className="mt-2">{o.address}, {o.city}</p>
                  {o.note && <p className="mt-2 italic">Note: {o.note}</p>}
                </div>
                <div>
                  <p className="font-medium">Items</p>
                  {o.items.map((i, k) => <p key={k}>{i.name} × {i.qty} <span className="text-neutral-500">({formatPrice(i.price * i.qty)})</span></p>)}
                  <p className="mt-2 text-neutral-600">Subtotal {formatPrice(o.subtotal)} · Shipping {o.shipping ? formatPrice(o.shipping) : "Free"}</p>
                  <p className="font-semibold">Total {formatPrice(o.total)} (Cash on Delivery)</p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Messages() {
  const [msgs, setMsgs] = useState(null);
  useEffect(() => { fetch("/api/admin/messages").then((r) => r.json()).then((d) => setMsgs(d.messages || [])); }, []);
  async function toggle(m) {
    setMsgs((l) => l.map((x) => (x.id === m.id ? { ...x, handled: !m.handled } : x)));
    await api(`/api/admin/messages/${m.id}`, { handled: !m.handled }, "PATCH");
  }
  if (!msgs) return <p className="text-sm text-neutral-500">Loading…</p>;
  if (msgs.length === 0) return <p className="text-sm text-neutral-500">No messages yet.</p>;
  return (
    <ul className="divide-y divide-neutral-200 border border-neutral-200">
      {msgs.map((m) => (
        <li key={m.id} className={`p-4 text-sm ${m.handled ? "opacity-60" : ""}`}>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <p><span className="font-semibold">{m.name}</span> · <a className="underline" href={`mailto:${m.email}`}>{m.email}</a>{m.phone && <> · {m.phone}</>}</p>
            <button className="btn-outline !px-3 !py-1 !text-xs" onClick={() => toggle(m)}>{m.handled ? "Mark as new" : "Mark as handled"}</button>
          </div>
          <p className="mt-2 whitespace-pre-wrap">{m.message}</p>
          <p className="mt-1 text-xs text-neutral-400">{new Date(m.created_at).toLocaleString("en-GB")}</p>
        </li>
      ))}
    </ul>
  );
}

function Codes() {
  const perfumes = products.filter((p) => !p.kind);
  const [slug, setSlug] = useState(perfumes[0].slug);
  const [count, setCount] = useState(10);
  const [fresh, setFresh] = useState([]);
  const [all, setAll] = useState(null);
  const [busy, setBusy] = useState(false);
  const load = useCallback(() => fetch("/api/admin/codes").then((r) => r.json()).then((d) => setAll(d.codes || [])), []);
  useEffect(() => { load(); }, [load]);

  async function generate(e) {
    e.preventDefault();
    setBusy(true);
    const r = await api("/api/admin/codes", { slug, count: Number(count) });
    setBusy(false);
    if (r.ok) { setFresh(r.data.codes); load(); }
  }

  return (
    <div>
      <p className="mb-4 text-sm text-neutral-600">Generate authenticity codes to print on boxes. Customers check them on the "Spot Fake" page.</p>
      <form onSubmit={generate} className="flex flex-wrap gap-3">
        <select className="input !w-auto" value={slug} onChange={(e) => setSlug(e.target.value)}>
          {perfumes.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
        </select>
        <input className="input !w-24" type="number" min="1" max="500" value={count} onChange={(e) => setCount(e.target.value)} />
        <button className="btn-dark" disabled={busy}>{busy ? "Generating…" : "Generate"}</button>
      </form>
      {fresh.length > 0 && (
        <textarea readOnly className="input mt-4 font-mono text-xs" rows={Math.min(fresh.length, 10)} value={fresh.join("\n")} onFocus={(e) => e.target.select()} />
      )}
      <h3 className="mt-8 font-display text-lg">Recent codes</h3>
      {!all ? <p className="mt-2 text-sm text-neutral-500">Loading…</p> : (
        <div className="mt-2 overflow-x-auto border border-neutral-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand text-xs uppercase text-neutral-500"><tr><th className="p-3">Code</th><th className="p-3">Product</th><th className="p-3">Checks</th></tr></thead>
            <tbody>{all.map((c) => (
              <tr key={c.code} className="border-t border-neutral-200"><td className="p-3 font-mono">{c.code}</td><td className="p-3">{c.product_name}</td><td className="p-3">{c.scans}</td></tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [user] = useUser();
  const [tab, setTab] = useState("Orders");

  if (user === undefined) return <p className="py-20 text-center text-sm text-neutral-500">Loading…</p>;
  if (!user || user.role !== "admin") {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-3xl">Admin panel</h1>
        <p className="mt-3 text-neutral-600">{user ? "This account does not have admin access." : "Please log in with the admin account."}</p>
        <Link href="/account" className="btn-dark mt-6">Go to login</Link>
      </div>
    );
  }
  return (
    <div className="container-page py-8">
      <h1 className="font-display text-3xl">Admin panel</h1>
      <div className="mt-5 mb-6 flex gap-2 overflow-x-auto border-b border-neutral-200">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium ${tab === t ? "border-b-2 border-ink" : "text-neutral-500"}`}>{t}</button>
        ))}
      </div>
      {tab === "Orders" && <Orders />}
      {tab === "Messages" && <Messages />}
      {tab === "Codes" && <Codes />}
    </div>
  );
}

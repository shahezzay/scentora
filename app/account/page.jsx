"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { site } from "@/data/site";
import { api, useUser } from "@/lib/useUser";
import { STATUS_LABELS } from "@/lib/pricing";
import { formatPrice } from "@/data/products";

function Dashboard({ user, onLogout }) {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    fetch("/api/account/orders").then((r) => r.json()).then((d) => setOrders(d.orders || [])).catch(() => setOrders([]));
  }, []);
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-center font-display text-3xl">Hello, {user.firstName}</h1>
      <p className="mt-1 text-center text-sm text-neutral-500">{user.email}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {user.role === "admin" && <Link href="/admin" className="btn-dark">Admin panel</Link>}
        <button onClick={onLogout} className="btn-outline">Log out</button>
      </div>

      <h2 className="mt-10 font-display text-xl">Your orders</h2>
      {orders === null ? (
        <p className="mt-4 text-sm text-neutral-500">Loading…</p>
      ) : orders.length === 0 ? (
        <p className="mt-4 text-sm text-neutral-500">You have not placed any orders yet. <Link href="/collections/frontpage" className="underline">Start shopping</Link></p>
      ) : (
        <ul className="mt-4 divide-y divide-neutral-200 border border-neutral-200">
          {orders.map((o) => (
            <li key={o.orderNo} className="flex flex-wrap items-center justify-between gap-2 p-4 text-sm">
              <div>
                <p className="font-medium">#{o.orderNo}</p>
                <p className="text-neutral-500">{o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}</p>
                <p className="text-xs text-neutral-400">{new Date(o.createdAt).toLocaleDateString("en-GB")}</p>
              </div>
              <div className="text-right">
                <p>{formatPrice(o.total)}</p>
                <p className="text-xs text-neutral-500">{STATUS_LABELS[o.status] || o.status}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AccountPage() {
  const [user, setUser] = useUser();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("Enter a valid email address.");
    if (password.length < 6) return setErr("Password must be at least 6 characters.");
    setBusy(true);
    const r = await api("/api/auth/login", { email, password });
    setBusy(false);
    if (!r.ok) return setErr(r.data.error || "Could not log in.");
    setUser(r.data.user);
  }

  async function logout() {
    await api("/api/auth/logout");
    setUser(null);
    setPassword("");
  }

  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: user ? "My account" : "Log in" }]} />
      <div className="container-page pb-10">
        {user === undefined ? (
          <p className="py-10 text-center text-sm text-neutral-500">Loading…</p>
        ) : user ? (
          <Dashboard user={user} onLogout={logout} />
        ) : (
          <div className="mx-auto max-w-md">
            <h1 className="text-center font-display text-3xl">{mode === "login" ? "Login" : "Reset your password"}</h1>
            {mode === "login" ? (
              <>
                <p className="mt-2 text-center text-sm text-neutral-500">Welcome back. Please sign in to continue.</p>
                <form onSubmit={submit} className="mt-8 space-y-4" noValidate>
                  <input className="input" type="email" placeholder="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <input className="input" type="password" placeholder="Password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  {err && <p className="text-sm text-red-600">{err}</p>}
                  <button className="btn-dark w-full" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
                </form>
              </>
            ) : (
              <p className="mt-6 text-center text-sm leading-relaxed text-neutral-600">
                To reset your password, message us on WhatsApp ({site.whatsapp}) or email {site.email} from the address you registered with, and we will help you right away.
              </p>
            )}
            <div className="mt-5 flex justify-between text-sm">
              <button onClick={() => { setMode(mode === "login" ? "reset" : "login"); setErr(""); }} className="underline">
                {mode === "login" ? "Forgot your password?" : "Back to login"}
              </button>
              <Link href="/account/register" className="underline">Create account</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

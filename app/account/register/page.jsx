"use client";

import Link from "next/link";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { api } from "@/lib/useUser";

export default function RegisterPage() {
  const [f, setF] = useState({ first: "", last: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setErr("");
    if (!f.first.trim() || !f.last.trim()) return setErr("Please enter your first and last name.");
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr("Enter a valid email address.");
    if (f.password.length < 6) return setErr("Password must be at least 6 characters.");
    setBusy(true);
    const r = await api("/api/auth/register", { firstName: f.first, lastName: f.last, email: f.email, password: f.password });
    setBusy(false);
    if (!r.ok) return setErr(r.data.error || "Could not create your account.");
    setDone(true);
  }

  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Log in", href: "/account" }, { label: "Create account" }]} />
      <div className="container-page pb-6">
        <div className="mx-auto max-w-md">
          <h1 className="text-center font-display text-3xl">Create Account</h1>
          {done ? (
            <div className="mt-8 border border-green-200 bg-green-50 p-6 text-center">
              <p className="font-medium text-green-800">Welcome, {f.first}!</p>
              <p className="mt-1 text-sm text-green-700">Your account has been created and you are logged in.</p>
              <Link href="/collections/frontpage" className="btn-dark mt-5">Start shopping</Link>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-8 space-y-4" noValidate>
              <input className="input" placeholder="First name" autoComplete="given-name" value={f.first} onChange={set("first")} />
              <input className="input" placeholder="Last name" autoComplete="family-name" value={f.last} onChange={set("last")} />
              <input className="input" type="email" placeholder="Email" autoComplete="email" value={f.email} onChange={set("email")} />
              <input className="input" type="password" placeholder="Password (min 6 characters)" autoComplete="new-password" value={f.password} onChange={set("password")} />
              {err && <p className="text-sm text-red-600">{err}</p>}
              <button className="btn-dark w-full" disabled={busy}>{busy ? "Creating…" : "Create"}</button>
              <p className="text-center text-sm">
                Already have an account? <Link href="/account" className="underline">Log in</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { site } from "@/data/site";
import { api } from "@/lib/useUser";

export default function ContactPage() {
  const [f, setF] = useState({ name: "", email: "", phone: "", message: "" });
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [serverErr, setServerErr] = useState("");
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setServerErr("");
    const er = {};
    if (!f.name.trim()) er.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = "Enter a valid email";
    if (f.message.trim().length < 10) er.message = "Message should be at least 10 characters";
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    const r = await api("/api/contact", f);
    setBusy(false);
    if (r.ok) return setSent(true);
    if (r.data.fields) setErr(r.data.fields);
    setServerErr(r.data.error || "Could not send your message. Please try again.");
  }

  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
      <div className="container-page pb-6">
        <h1 className="text-center font-display text-3xl sm:text-4xl">Contact Us</h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-neutral-600">Questions about an order or a fragrance? Send us a message and we will get back to you.</p>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {sent ? (
            <div className="h-fit border border-green-200 bg-green-50 p-8 text-center">
              <p className="font-display text-xl text-green-800">Thanks, {f.name}!</p>
              <p className="mt-2 text-sm text-green-700">Your message has been received. We will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4" noValidate>
              <div>
                <input className="input" placeholder="Name" value={f.name} onChange={set("name")} />
                {err.name && <p className="mt-1 text-xs text-red-600">{err.name}</p>}
              </div>
              <div>
                <input className="input" type="email" placeholder="Email" value={f.email} onChange={set("email")} />
                {err.email && <p className="mt-1 text-xs text-red-600">{err.email}</p>}
              </div>
              <input className="input" placeholder="Phone (optional)" value={f.phone} onChange={set("phone")} />
              <div>
                <textarea className="input" rows={6} placeholder="How can we help?" value={f.message} onChange={set("message")} />
                {err.message && <p className="mt-1 text-xs text-red-600">{err.message}</p>}
              </div>
              {serverErr && <p className="text-sm text-red-600">{serverErr}</p>}
              <button className="btn-dark w-full" disabled={busy}>{busy ? "Sending…" : "Send message"}</button>
            </form>
          )}

          <div className="space-y-6">
            <div className="bg-sand p-6">
              <h2 className="font-display text-xl">Customer Support</h2>
              <p className="mt-2 text-sm text-neutral-700">{site.hours}</p>
              <p className="mt-3 text-sm">WhatsApp: {site.whatsapp}</p>
              <p className="text-sm">Email: {site.email}</p>
            </div>
            <div>
              <h2 className="font-display text-xl">Our Outlets</h2>
              <ul className="mt-3 space-y-3 text-sm">
                {site.outlets.map((o) => (
                  <li key={o.name} className="border-b border-neutral-200 pb-3">
                    <strong>{o.name}</strong>
                    <br />
                    <span className="text-neutral-600">{o.address}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

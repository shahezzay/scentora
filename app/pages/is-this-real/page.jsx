"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { api } from "@/lib/useUser";

export default function VerifyPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);

  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    const r = await api("/api/verify", { code });
    setBusy(false);
    setResult(r.ok ? r.data : { ok: false, text: r.data.error || "Could not check this code. Please try again." });
  }

  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Spot Fake" }]} />
      <div className="container-page pb-6">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center font-display text-3xl sm:text-4xl">Is This Real?</h1>
          <p className="mt-3 text-center text-neutral-600">Enter the verification code printed on the box to check that your bottle is genuine.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <input className="input text-center tracking-widest" placeholder="SCN-XXXX-XXXX" value={code} onChange={(e) => setCode(e.target.value)} />
            <button className="btn-dark w-full" disabled={busy}>{busy ? "Checking…" : "Verify"}</button>
          </form>

          {result && (
            <div className={`mt-6 border p-4 text-sm ${result.ok ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"}`}>
              {result.text}
            </div>
          )}

          <div className="mt-10 bg-sand p-6 text-sm leading-relaxed text-neutral-700">
            <h2 className="font-display text-lg">How to spot a fake</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Genuine boxes carry a printed verification code.</li>
              <li>Check the print quality of the label. Blurry text is a warning sign.</li>
              <li>Buy only from the official store.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

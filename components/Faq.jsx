"use client";

import { useState } from "react";

export default function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-neutral-200 border-y border-neutral-200">
      {items.map((it, n) => (
        <div key={it.q}>
          <button
            onClick={() => setOpen(open === n ? -1 : n)}
            className="flex w-full items-center justify-between py-4 text-left font-medium"
          >
            <span>{it.q}</span>
            <span className="ml-4 text-xl">{open === n ? "−" : "+"}</span>
          </button>
          {open === n && <p className="pb-4 text-sm leading-relaxed text-neutral-600">{it.a}</p>}
        </div>
      ))}
    </div>
  );
}

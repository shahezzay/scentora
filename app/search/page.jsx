"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

function SearchInner() {
  const params = useSearchParams();
  const router = useRouter();
  const query = (params.get("q") || "").trim();
  const [q, setQ] = useState(query);

  const needle = query.toLowerCase();
  const results = needle
    ? products.filter((p) =>
        [p.name, p.family, p.description, p.notes.top, p.notes.heart, p.notes.base, p.size].join(" ").toLowerCase().includes(needle)
      )
    : [];

  function submit(e) {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <div className="container-page pb-6">
        <h1 className="text-center font-display text-3xl">Search</h1>
        <form onSubmit={submit} className="mx-auto mt-6 flex max-w-xl gap-3">
          <input className="input" placeholder="Search perfumes, oud, candles..." value={q} onChange={(e) => setQ(e.target.value)} />
          <button className="btn-dark">Search</button>
        </form>

        {query && (
          <p className="mt-8 text-center text-sm text-neutral-500">
            {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
          </p>
        )}

        {query && results.length === 0 && (
          <p className="py-12 text-center text-neutral-500">No products found. Try a different word such as “oud”, “rose” or “candle”.</p>
        )}

        {results.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-page py-20 text-center">Loading…</div>}>
      <SearchInner />
    </Suspense>
  );
}

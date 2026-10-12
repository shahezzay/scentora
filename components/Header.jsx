"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { site } from "@/data/site";

function Logo() {
  return (
    <Link href="/" className="flex flex-col items-center leading-none" aria-label={`${site.name} home`}>
      <span className="font-display text-2xl font-bold tracking-[0.25em] sm:text-3xl">SCENTORA</span>
      <span className="mt-1 text-[9px] uppercase tracking-[0.45em] text-gold">Perfume House</span>
    </Link>
  );
}

export default function Header() {
  const { count, setOpen } = useCart();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [shopOpen, setShopOpen] = useState(false);

  function submitSearch(e) {
    e.preventDefault();
    if (!q.trim()) return;
    setSearchOpen(false);
    setMenu(false);
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        {/* mobile hamburger */}
        <button className="lg:hidden" onClick={() => setMenu(true)} aria-label="Open menu">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        <div className="lg:order-1">
          <Logo />
        </div>

        {/* desktop nav */}
        <nav className="hidden items-center gap-7 text-sm font-medium lg:order-2 lg:flex">
          {site.nav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <Link href={item.href} className="flex items-center gap-1 py-6 hover:text-gold">
                  {item.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 3l4 4 4-4" />
                  </svg>
                </Link>
                {shopOpen && (
                  <div className="absolute left-0 top-full w-56 border border-neutral-200 bg-white py-2 shadow-lg">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setShopOpen(false)}
                        className="block px-5 py-2.5 hover:bg-sand"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.label} href={item.href} className="hover:text-gold">
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* icons */}
        <div className="flex items-center gap-4 lg:order-3">
          <button onClick={() => setSearchOpen((s) => !s)} aria-label="Search">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </button>
          <Link href="/account" aria-label="Account" className="hidden sm:block">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </Link>
          <button onClick={() => setOpen(true)} className="relative" aria-label="Open cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 8h14l-1 12H6L5 8z" />
              <path d="M9 8V6a3 3 0 016 0v2" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* search bar */}
      {searchOpen && (
        <form onSubmit={submitSearch} className="border-t border-neutral-200 bg-white">
          <div className="container-page flex gap-3 py-3">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search perfumes, mists, candles..."
              className="input"
            />
            <button className="btn-dark">Search</button>
          </div>
        </form>
      )}

      {/* mobile drawer */}
      {menu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMenu(false)} />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-xl font-bold tracking-[0.2em]">SCENTORA</span>
              <button onClick={() => setMenu(false)} aria-label="Close menu" className="text-2xl leading-none">
                ×
              </button>
            </div>
            <form onSubmit={submitSearch} className="mb-6 flex gap-2">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="input" />
              <button className="btn-dark px-4">Go</button>
            </form>
            <ul className="space-y-1 text-base">
              {site.nav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} onClick={() => setMenu(false)} className="block border-b border-neutral-100 py-3 font-medium">
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="border-b border-neutral-100 pb-2 pl-4 text-sm text-neutral-600">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} onClick={() => setMenu(false)} className="block py-2">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li>
                <Link href="/account" onClick={() => setMenu(false)} className="block py-3 font-medium">
                  Log in
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

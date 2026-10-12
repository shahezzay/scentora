import Link from "next/link";
import { site } from "@/data/site";

const support = [
  { label: "Contact Us", href: "/pages/contact-us" },
  { label: "Exchange Policy", href: "/pages/return-exchange-policy" },
  { label: "Refund Policy", href: "/pages/return-policy" },
  { label: "Track Order", href: "/pages/track-order" },
  { label: "Cancellation Policy", href: "/policies/terms-of-service" },
];

const quick = [
  { label: "Terms of Service", href: "/policies/terms-of-service" },
  { label: "About Us", href: "/pages/about-us" },
  { label: "Blog", href: "/blogs/news" },
  { label: "Search", href: "/search" },
  { label: "Trademark Notice", href: "/pages/intellectual-property" },
  { label: "Privacy Policy", href: "/policies/privacy-policy" },
  { label: "Shipping Policy", href: "/policies/shipping-policy" },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-ink text-neutral-300">
      <div className="container-page py-14">
        <div className="mb-12 grid gap-8 border-b border-neutral-700 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          {site.outlets.map((o) => (
            <div key={o.name}>
              <h4 className="mb-2 font-display text-lg text-white">{o.name}</h4>
              <p className="text-sm leading-relaxed">{o.address}</p>
              <Link href="/pages/contact-us" className="mt-2 inline-block text-sm text-gold hover:underline">
                Get Direction
              </Link>
            </div>
          ))}
        </div>

        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="font-display text-2xl font-bold tracking-[0.25em] text-white">SCENTORA</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.45em] text-gold">Perfume House</div>
            <p className="mt-4 text-sm leading-relaxed">{site.tagline}.</p>
            <div className="mt-5 flex gap-3 text-xs">
              {["Instagram", "Facebook", "YouTube", "TikTok"].map((s) => (
                <span key={s} className="border border-neutral-600 px-2 py-1">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              {support.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quick.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Get in Touch</h4>
            <p className="text-sm">
              <strong className="text-white">Customer Support</strong>
              <br />
              {site.hours}
            </p>
            <p className="mt-3 text-sm">
              <strong className="text-white">Contact</strong>
              <br />
              WhatsApp: {site.whatsapp}
              <br />
              Email: {site.email}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-700 pt-6 text-xs leading-relaxed text-neutral-400">
          <p>© 2026 Scentora. All rights reserved.</p>
          <div className="mt-3 flex gap-2">
            <span className="border border-neutral-600 px-2 py-1">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

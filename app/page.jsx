import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import Section from "@/components/Section";
import Carousel from "@/components/Carousel";
import ProductCard from "@/components/ProductCard";
import Faq from "@/components/Faq";
import ReviewsStrip from "@/components/ReviewsStrip";
import Bottle from "@/components/Bottle";
import { getProduct, getCollectionProducts } from "@/data/products";
import { posts } from "@/data/blog";

const pick = (slugs) => slugs.map(getProduct).filter(Boolean);

const faqs = [
  { q: "What are the best perfumes for men?", a: "Look for scents that last long, project well and suit warm weather. Our Desert Oud, Citrus Rush, Midnight Wolf and Pulse Noir are the most popular choices for men." },
  { q: "How long do Scentora perfumes last?", a: "On average, between six and ten hours on skin. Woody and oud scents tend to last longer, while fresh scents may need a top-up in the evening." },
  { q: "How should I apply perfume to make it last longer?", a: "Apply to pulse points such as your wrists, neck and behind the ears. Do not rub your wrists together. Applying right after a shower helps absorption." },
  { q: "What is the difference between EDP and EDT?", a: "EDP contains more fragrance oil and lasts longer on the skin. EDT has less oil and fades faster." },
  { q: "Do these perfumes work in hot weather?", a: "Yes. Fresh and aquatic scents are great for hot days, while woody and oud scents perform better in cooler months and evenings." },
];

export default function Home() {
  return (
    <>
      <HeroSlider />

      {/* feature strip */}
      <div className="border-b border-neutral-200 bg-sand">
        <div className="container-page grid grid-cols-2 gap-4 py-5 text-center text-xs font-medium uppercase tracking-wider md:grid-cols-4">
          <span>Free shipping on 2 perfumes</span>
          <span>Cash on delivery</span>
          <span>14 days refund</span>
          <span>Long-lasting formulas</span>
        </div>
      </div>

      <Section title="Perfume Bundles" href="/collections/crazy-deals" cta="Shop All Bundle Deals">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {pick(["buy-3-get-50ml-free", "2x-100ml-deal", "top-3-best-sellers", "body-mist-2x-deal"]).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>

      {/* candles banner */}
      <section className="bg-gradient-to-r from-[#2b1f14] to-[#5a3f27] text-white">
        <div className="container-page grid items-center gap-6 py-10 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">New</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Scented Candles</h2>
            <p className="mt-3 max-w-md text-neutral-200">Hand-poured, slow-burning and beautifully scented. Perfect for cosy evenings and gifting.</p>
            <Link href="/collections/candles" className="mt-6 inline-block bg-white px-7 py-3 text-sm font-semibold uppercase tracking-wider text-ink hover:bg-gold hover:text-white">
              Shop Candles
            </Link>
          </div>
          <div className="mx-auto h-48 w-48">
            <Bottle kind="candle" colors={["#3d2b1f", "#c68b59"]} className="h-full w-full" />
          </div>
        </div>
      </section>

      <Section title="Scented Candle" href="/collections/candles" cta="Explore all Candles">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {getCollectionProducts("candles").map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>

      <Section title="New Arrival Mist" href="/collections/mist" cta="Explore All Mist" tone="sand">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {getCollectionProducts("mist").map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>

      <Section title="New Arrivals of 100ML" href="/collections/100-ml" cta="Explore the 100ML Collection">
        <Carousel items={getCollectionProducts("100-ml")} />
      </Section>

      <Section title="Best Seller Perfumes" href="/collections/best-sellings" cta="Shop Best Sellers Now" tone="sand">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {pick(["desert-oud-50ml", "citrus-rush-50ml", "midnight-wolf-50ml", "pulse-noir-50ml"]).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>

      <Section title="Best Perfumes for Women" href="/collections/perfume-for-her" cta="Shop Women's Perfumes">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {pick(["velvet-bloom-50ml", "amber-petal-50ml", "queen-whisper-50ml", "berry-grace-50ml"]).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>

      {/* tester box */}
      <section className="bg-sand">
        <div className="container-page grid items-center gap-8 py-14 md:grid-cols-2">
          <div className="mx-auto h-56 w-56">
            <Bottle kind="bundle" colors={["#b8893b", "#f3e3c3"]} className="h-full w-full" />
          </div>
          <div>
            <h2 className="font-display text-3xl">How to Pick the Right Perfume Online</h2>
            <p className="mt-4 leading-relaxed text-neutral-600">
              Start by working out which scents you enjoy: fresh, floral, woody, sweet or spicy. Then read the notes listed on each product page and check what customers say in the reviews.
              If you are still unsure, the Tester Box is the smartest first buy.
            </p>
            <Link href="/products/tester-box" className="btn-dark mt-6">
              Try Our Tester Box
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl">Perfumes You Will Love, at a Price That Makes Sense</h2>
          <p className="mt-4 leading-relaxed text-neutral-600">
            At Scentora we believe a great fragrance should not cost a fortune. Whether you want a deep oud for the evening, a crisp citrus for the office or a soft floral for her, you will find it here at a fair price.
          </p>
          <Link href="/collections/frontpage" className="btn-dark mt-6">
            Shop Our Full Collection
          </Link>
        </div>
      </section>

      <Section title="Customer Reviews" tone="sand">
        <ReviewsStrip />
      </Section>

      <section className="container-page py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center font-display text-3xl">Fragrance Guide</h2>
          <div className="space-y-6 text-neutral-600">
            <div>
              <h3 className="font-semibold text-ink">Perfume Bundles</h3>
              <p className="mt-1 leading-relaxed">The easiest way to explore is through a bundle. Choose from the 3x, 4x or 6x deals, or start with the Tester Box and try several scents before committing to a full bottle.</p>
            </div>
            <div>
              <h3 className="font-semibold text-ink">Oud Perfumes</h3>
              <p className="mt-1 leading-relaxed">Deep, woody and rich, oud suits our culture, occasions and climate. Explore the <Link href="/collections/oud-collection" className="underline">Oud Collection</Link> for something smoky and long-lasting.</p>
            </div>
            <div>
              <h3 className="font-semibold text-ink">Unisex Perfumes</h3>
              <p className="mt-1 leading-relaxed">Clean musks, light woods and balanced florals work for everyone. Our <Link href="/collections/unisex" className="underline">unisex range</Link> is perfect for couples or when you are unsure of someone's taste.</p>
            </div>
          </div>
        </div>
      </section>

      <Section title="Blog Posts" href="/blogs/news" cta="View all">
        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blogs/news/${p.slug}`} className="group block border border-neutral-200 p-5 transition hover:border-ink">
              <div className="text-xs text-neutral-500">{p.date}</div>
              <h3 className="mt-2 font-display text-lg group-hover:underline">{p.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </Section>

      <section className="container-page pb-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center font-display text-3xl">Frequently Asked Questions</h2>
          <Faq items={faqs} />
        </div>
      </section>
    </>
  );
}

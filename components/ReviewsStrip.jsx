import { Stars } from "@/components/ProductCard";
import { reviewsData } from "@/data/products";

export default function ReviewsStrip() {
  return (
    <div>
      <div className="mb-8 text-center">
        <div className="text-4xl font-bold">4.8</div>
        <Stars value={5} size="text-xl" />
        <p className="mt-2 text-sm text-neutral-500">Average rating from our customers</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviewsData.map((r) => (
          <article key={r.name} className="border border-neutral-200 bg-white p-5">
            <Stars value={r.rating} />
            <h3 className="mt-2 font-semibold">{r.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">{r.body}</p>
            <p className="mt-3 text-xs text-neutral-500">
              {r.name} · {r.city} · <span className="text-gold">Verified</span>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

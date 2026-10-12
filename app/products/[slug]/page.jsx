import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";
import ReviewsStrip from "@/components/ReviewsStrip";
import { getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getProduct(params.slug);
  return { title: p ? `${p.name} | Scentora` : "Product | Scentora" };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== product.slug && p.collections.some((c) => c !== "frontpage" && product.collections.includes(c)))
    .slice(0, 4);

  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Shop All", href: "/collections/frontpage" }, { label: product.name }]} />
      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="container-page py-10">
          <h2 className="mb-6 text-center font-display text-2xl">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-sand py-12">
        <div className="container-page">
          <h2 className="mb-8 text-center font-display text-2xl">Customer Reviews</h2>
          <ReviewsStrip />
        </div>
      </section>
    </>
  );
}

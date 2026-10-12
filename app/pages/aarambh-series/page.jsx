import Breadcrumb from "@/components/Breadcrumb";
import CollectionGrid from "@/components/CollectionGrid";
import { getCollectionProducts } from "@/data/products";

export const metadata = { title: "Aarambh Series | Scentora" };

export default function SeriesPage() {
  const items = getCollectionProducts("series-one");
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Aarambh Series" }]} />
      <section className="bg-gradient-to-br from-[#0f1b2d] to-[#2f4a78] py-14 text-center text-white">
        <div className="container-page">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">New Launch</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">The Aarambh Series</h1>
          <p className="mx-auto mt-4 max-w-xl text-neutral-200">
            Aarambh means “beginning”. Six new signature scents, from fresh and spicy to soft and floral, mark the start of something new.
          </p>
        </div>
      </section>
      <div className="container-page mt-10">
        <CollectionGrid products={items} />
      </div>
    </>
  );
}

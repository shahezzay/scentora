import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import CollectionGrid from "@/components/CollectionGrid";
import { collections, getCollection, getCollectionProducts } from "@/data/products";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const c = getCollection(params.slug);
  return { title: c ? `${c.title} | Scentora` : "Collection | Scentora" };
}

export default function CollectionPage({ params }) {
  const collection = getCollection(params.slug);
  if (!collection) notFound();
  const items = getCollectionProducts(params.slug);

  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: collection.title }]} />
      <div className="container-page pb-6 text-center">
        <h1 className="font-display text-3xl sm:text-4xl">{collection.title}</h1>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">{collection.description}</p>
      </div>
      <div className="container-page mt-6">
        <CollectionGrid products={items} />
      </div>
    </>
  );
}

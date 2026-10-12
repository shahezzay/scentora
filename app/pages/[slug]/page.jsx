import { notFound } from "next/navigation";
import TextPage from "@/components/TextPage";
import { textPages } from "@/data/pages";

export function generateStaticParams() {
  return Object.keys(textPages).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const page = textPages[params.slug];
  return { title: page ? `${page.title} | Scentora` : "Page | Scentora" };
}

export default function InfoPage({ params }) {
  const page = textPages[params.slug];
  if (!page) notFound();
  return <TextPage page={page} />;
}

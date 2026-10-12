import { notFound } from "next/navigation";
import TextPage from "@/components/TextPage";
import { policyPages } from "@/data/pages";

export function generateStaticParams() {
  return Object.keys(policyPages).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const page = policyPages[params.slug];
  return { title: page ? `${page.title} | Scentora` : "Policy | Scentora" };
}

export default function PolicyPage({ params }) {
  const page = policyPages[params.slug];
  if (!page) notFound();
  return <TextPage page={page} />;
}

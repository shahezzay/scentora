import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { posts } from "@/data/blog";

export const metadata = { title: "Blog | Scentora" };

export default function BlogIndex() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <div className="container-page pb-6">
        <h1 className="text-center font-display text-3xl sm:text-4xl">News & Fragrance Guides</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blogs/news/${p.slug}`} className="group block border border-neutral-200 p-6 transition hover:border-ink">
              <div className="text-xs text-neutral-500">{p.date}</div>
              <h2 className="mt-2 font-display text-xl group-hover:underline">{p.title}</h2>
              <p className="mt-3 text-sm text-neutral-600">{p.excerpt}</p>
              <span className="mt-4 inline-block text-sm font-semibold underline">Read more</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

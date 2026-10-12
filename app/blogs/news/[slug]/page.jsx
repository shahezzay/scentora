import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { getPost, posts } from "@/data/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getPost(params.slug);
  return { title: p ? `${p.title} | Scentora` : "Blog | Scentora" };
}

export default function BlogPost({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blogs/news" }, { label: post.title }]} />
      <article className="container-page pb-6">
        <div className="mx-auto max-w-2xl">
          <div className="text-center text-xs text-neutral-500">{post.date}</div>
          <h1 className="mt-2 text-center font-display text-3xl sm:text-4xl">{post.title}</h1>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-neutral-700">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-12 border-t border-neutral-200 pt-8">
            <h2 className="font-display text-xl">Keep reading</h2>
            <ul className="mt-3 space-y-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/blogs/news/${o.slug}`} className="underline">
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </>
  );
}

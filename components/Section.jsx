import Link from "next/link";

export default function Section({ title, href, cta, children, tone = "white" }) {
  return (
    <section className={tone === "sand" ? "bg-sand py-14" : "py-14"}>
      <div className="container-page">
        <h2 className="mb-8 text-center font-display text-2xl sm:text-3xl">{title}</h2>
        {children}
        {href && (
          <div className="mt-10 text-center">
            <Link href={href} className="btn-outline">
              {cta}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

import Breadcrumb from "@/components/Breadcrumb";

export default function TextPage({ page }) {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: page.title }]} />
      <div className="container-page pb-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-center font-display text-3xl sm:text-4xl">{page.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-neutral-600">{page.intro}</p>
          <div className="mt-10 space-y-8">
            {page.sections.map((s) => (
              <section key={s.h}>
                <h2 className="font-display text-xl">{s.h}</h2>
                <p className="mt-2 leading-relaxed text-neutral-700">{s.p}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

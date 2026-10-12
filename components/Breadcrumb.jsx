import Link from "next/link";

export default function Breadcrumb({ trail }) {
  return (
    <nav className="container-page py-4 text-xs text-neutral-500" aria-label="Breadcrumb">
      {trail.map((t, i) => (
        <span key={t.label}>
          {t.href ? (
            <Link href={t.href} className="hover:text-ink hover:underline">
              {t.label}
            </Link>
          ) : (
            <span className="text-ink">{t.label}</span>
          )}
          {i < trail.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
}

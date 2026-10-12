import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-gold">Error 404</p>
      <h1 className="mt-3 font-display text-4xl">Page not found</h1>
      <p className="mt-3 text-neutral-600">The page you are looking for does not exist or has moved.</p>
      <Link href="/" className="btn-dark mt-8">
        Back to home
      </Link>
    </div>
  );
}

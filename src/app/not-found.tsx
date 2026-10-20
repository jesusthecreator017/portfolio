import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main" className="wrap py-24">
      <p className="label">404</p>
      <h1 className="mt-3 mb-6 text-4xl font-semibold tracking-tight">
        Page not found
      </h1>
      <Link href="/" className="underline underline-offset-4">
        Back home
      </Link>
    </main>
  );
}

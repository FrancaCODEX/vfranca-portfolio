import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center px-5 py-32 text-center">
      <p className="font-mono text-sm text-accent">404 Not Found</p>
      <h1 className="mt-3 text-3xl font-semibold">Página não encontrada · Page not found</h1>
      <Link href="/pt" className="mt-8 text-sm font-medium text-accent hover:underline">
        ← Início / Home
      </Link>
    </div>
  );
}

import Link from "next/link";
import { adminText } from "@/content/admin";

export default function AdminNotFound() {
  return (
    <main className="site-container flex-1 py-16">
      <h1 className="text-ink text-3xl font-bold">{adminText.notFound.title}</h1>
      <p className="text-muted mt-3">{adminText.detail.notFound}</p>
      <Link href="/admin/demandes" className="text-brand-dark mt-6 inline-block rounded-sm font-semibold underline underline-offset-2">
        {adminText.notFound.back}
      </Link>
    </main>
  );
}

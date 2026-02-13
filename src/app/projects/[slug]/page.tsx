"use client";

import { useRouter } from "next/navigation";

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();

  return (
    <main className="min-h-screen flex justify-center items-center bg-[color:var(--bg)] text-[color:var(--text)]">
      
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="cursor-pointer mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm text-[color:var(--text-secondary)] hover:bg-[color:var(--bg)] transition-colors"
        >
          ← Back
        </button>

        {/* Card */}
        <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-10 text-center">

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Coming Soon
          </h1>

          <p className="mt-4 text-[color:var(--text-secondary)]">
            Detail project{" "}
            belum tersedia.
          </p>

        </div>

      </div>

    </main>
  );
}
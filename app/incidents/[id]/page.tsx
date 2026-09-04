import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Evidence, Incident } from "@/lib/types";
import {
  evidenceIcon,
  formatDate,
  severityStyle,
  statusStyle,
} from "@/lib/ui";

export const dynamic = "force-dynamic";

export default async function IncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // ye tumhari JOIN query ka Supabase version hai --
  // incident + uska saara evidence, ek hi request mein
  const { data, error } = await supabase
    .from("incidents")
    .select("*, evidence(*)")
    .eq("id", id)
    .single();

  if (error || !data) notFound();

  const incident = data as Incident & { evidence: Evidence[] };
  const evidence = [...incident.evidence].sort((a, b) =>
    a.collected_at.localeCompare(b.collected_at)
  );

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/"
        className="text-sm text-neutral-400 transition hover:text-neutral-200"
      >
        &larr; All incidents
      </Link>

      <header className="mt-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          &#128680; {incident.title}
        </h1>

        <div className="mt-3 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${severityStyle[incident.severity]}`}
          >
            {incident.severity}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyle[incident.status]}`}
          >
            {incident.status}
          </span>
          <span className="rounded-full px-2.5 py-0.5 text-xs text-neutral-500 ring-1 ring-inset ring-neutral-800">
            {formatDate(incident.created_at)}
          </span>
        </div>
      </header>

      <section className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Description
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-300">
          {incident.description ?? "No description recorded."}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Evidence ({evidence.length})
        </h2>

        {evidence.length === 0 ? (
          <p className="mt-3 rounded-lg border border-dashed border-neutral-800 p-6 text-center text-sm text-neutral-500">
            Is incident ka koi evidence collect nahi hua.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-neutral-800 rounded-xl border border-neutral-800 bg-neutral-900/40">
            {evidence.map((item) => (
              <li key={item.id} className="flex gap-3 p-4">
                <span className="text-lg leading-none">
                  {evidenceIcon[item.evidence_type] ?? "\u{1F4CE}"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{item.evidence_type}</p>
                  {item.description && (
                    <p className="mt-0.5 text-sm text-neutral-400">
                      {item.description}
                    </p>
                  )}
                  {item.file_hash && (
                    <p className="mt-1.5 break-all font-mono text-xs text-neutral-500">
                      SHA-256: {item.file_hash}
                    </p>
                  )}
                  <p className="mt-1.5 text-xs text-neutral-600">
                    Collected {formatDate(item.collected_at)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

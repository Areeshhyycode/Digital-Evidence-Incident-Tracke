import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Incident } from "@/lib/types";
import { formatDate, severityDot, severityStyle, statusStyle } from "@/lib/ui";

// har request pe fresh data (cache nahi)
export const dynamic = "force-dynamic";

export default async function IncidentsPage() {
  // ye wahi query hai jo tumne SQL Editor mein chalayi thi:
  //   select *, count(evidence) from incidents order by created_at desc
  const { data, error } = await supabase
    .from("incidents")
    .select("*, evidence(count)")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="mx-auto max-w-3xl p-8">
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
          <p className="font-semibold">Supabase se data nahi aaya</p>
          <p className="mt-1 font-mono text-xs">{error.message}</p>
        </div>
      </main>
    );
  }

  const incidents = (data ?? []) as (Incident & {
    evidence: { count: number }[];
  })[];

  const open = incidents.filter((i) => i.status === "Open").length;
  const critical = incidents.filter((i) => i.severity === "Critical").length;

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Digital Evidence &amp; Incident Tracker
        </h1>
        <p className="mt-1 text-sm text-neutral-400">
          {incidents.length} incidents &middot; {open} open &middot; {critical}{" "}
          critical
        </p>
      </header>

      {incidents.length === 0 ? (
        <p className="rounded-lg border border-dashed border-neutral-700 p-8 text-center text-sm text-neutral-500">
          Koi incident nahi mila. Supabase mein dummy data insert karo.
        </p>
      ) : (
        <ul className="space-y-3">
          {incidents.map((incident) => (
            <li key={incident.id}>
              <Link
                href={`/incidents/${incident.id}`}
                className="block rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 transition hover:border-neutral-600 hover:bg-neutral-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-2 shrink-0 rounded-full ${severityDot[incident.severity]}`}
                      />
                      <h2 className="truncate font-medium">{incident.title}</h2>
                    </div>
                    <p className="mt-1 line-clamp-1 text-sm text-neutral-400">
                      {incident.description ?? "No description"}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
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
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-xs text-neutral-500">
                  <span>{formatDate(incident.created_at)}</span>
                  <span>
                    {incident.evidence?.[0]?.count ?? 0} evidence items
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

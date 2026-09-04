import type { Severity, Status } from "./types";

// Severity ke hisaab se colour
export const severityStyle: Record<Severity, string> = {
  Low: "bg-sky-500/10 text-sky-300 ring-sky-500/30",
  Medium: "bg-amber-500/10 text-amber-300 ring-amber-500/30",
  High: "bg-orange-500/10 text-orange-300 ring-orange-500/30",
  Critical: "bg-red-500/10 text-red-300 ring-red-500/30",
};

export const severityDot: Record<Severity, string> = {
  Low: "bg-sky-400",
  Medium: "bg-amber-400",
  High: "bg-orange-400",
  Critical: "bg-red-400",
};

export const statusStyle: Record<Status, string> = {
  Open: "bg-red-500/10 text-red-300 ring-red-500/30",
  Investigating: "bg-yellow-500/10 text-yellow-300 ring-yellow-500/30",
  Resolved: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30",
};

// Evidence type ke hisaab se icon
export const evidenceIcon: Record<string, string> = {
  "Login Log": "\u{1F4C4}",
  "IP Address": "\u{1F310}",
  Screenshot: "\u{1F5BC}\u{FE0F}",
  "File Hash": "\u{1F510}",
  "Security Alert": "\u{1F6A8}",
  "Email Header": "\u{1F4E7}",
};

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

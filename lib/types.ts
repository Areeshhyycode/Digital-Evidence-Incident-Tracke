export type Severity = "Low" | "Medium" | "High" | "Critical";
export type Status = "Open" | "Investigating" | "Resolved";

export type Incident = {
  id: string;
  title: string;
  description: string | null;
  severity: Severity;
  status: Status;
  created_at: string;
};

export type Evidence = {
  id: string;
  incident_id: string;
  evidence_type: string;
  description: string | null;
  file_hash: string | null;
  collected_at: string;
};

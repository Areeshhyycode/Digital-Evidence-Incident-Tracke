import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Supabase ne key ka naam badla hai: purana "anon", naya "publishable".
// Dono chalti hain -- jo bhi .env.local mein ho, wahi utha lo.
const key =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error(
    "Supabase env vars missing. .env.local mein NEXT_PUBLIC_SUPABASE_URL aur NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY set karo."
  );
}

export const supabase = createClient(url, key);

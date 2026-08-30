import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const url = import.meta.env.VITE_PANGEA_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_PANGEA_SUPABASE_PUBLISHABLE_KEY as string | undefined;

/**
 * Pangea's MVP runs entirely on mock data + localStorage (see src/state/AppStateContext.tsx)
 * so it works fully offline with zero setup. This client is scaffolding for wiring up a real
 * Supabase project later — see pangea/supabase/migrations for the matching schema.
 */
export const supabase = url && key ? createClient<Database>(url, key) : null;

export const isSupabaseConfigured = Boolean(supabase);

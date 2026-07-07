import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Single client — anon key is safe to ship.
// INSERT is open to anon (tracking). SELECT requires a signed-in user (RLS).
export const supabase = createClient(url, key);

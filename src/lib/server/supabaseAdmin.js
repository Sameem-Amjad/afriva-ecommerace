import { createClient } from "@supabase/supabase-js";

/** Service-role client for server routes only. Never import this in a component. */
export function supabaseAdmin() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
    return createClient(url, key, {
        db: { schema: process.env.NEXT_PUBLIC_SUPABASE_DB_SCHEMA || "public" },
        auth: { persistSession: false, autoRefreshToken: false },
    });
}

export const isEmail = (value) => typeof value === "string" && value.length <= 254 && /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(value);

import { NextResponse } from "next/server";
import crypto from "crypto";
import { isEmail, supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { makeToken } from "@/lib/server/otpToken";

const MAX_ATTEMPTS = 5;

/** Checks the latest code for this email; returns a short-lived token on success. */
export async function POST(req) {
    const { email: raw, otp, purpose = "signup" } = await req.json().catch(() => ({}));
    const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";
    if (!isEmail(email) || typeof otp !== "string" || !/^\d{4}$/.test(otp)) {
        return NextResponse.json({ success: false, message: "Enter the 4-digit code" }, { status: 400 });
    }

    const db = supabaseAdmin();
    const { data: rows, error } = await db
        .from("email_otps")
        .select("id, otp, attempts, verified, expires_at")
        .eq("email", email)
        .eq("purpose", purpose)
        .order("created_at", { ascending: false })
        .limit(1);
    const row = rows?.[0];
    if (error || !row || row.verified) {
        return NextResponse.json({ success: false, message: "Request a new code" }, { status: 400 });
    }
    if (new Date(row.expires_at) < new Date()) {
        return NextResponse.json({ success: false, message: "That code has expired. Request a new one." }, { status: 400 });
    }
    if (row.attempts >= MAX_ATTEMPTS) {
        return NextResponse.json({ success: false, message: "Too many wrong tries. Request a new code." }, { status: 429 });
    }
    const match = crypto.timingSafeEqual(Buffer.from(row.otp.padEnd(8)), Buffer.from(otp.padEnd(8)));
    if (!match) {
        await db.from("email_otps").update({ attempts: row.attempts + 1 }).eq("id", row.id);
        return NextResponse.json({ success: false, message: "That code isn't right" }, { status: 400 });
    }
    await db.from("email_otps").update({ verified: true }).eq("id", row.id);
    return NextResponse.json({ success: true, message: "Code verified", token: makeToken(email, purpose) });
}

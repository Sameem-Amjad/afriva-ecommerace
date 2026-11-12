import { NextResponse } from "next/server";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import { isEmail, supabaseAdmin } from "@/lib/server/supabaseAdmin";

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
const PURPOSES = ["signup", "reset"];
const MAX_PER_WINDOW = 5;
const WINDOW_MINUTES = 15;

/**
 * Sends a 4-digit email code for sign-up or password reset.
 * The code is only ever returned in the response in demo mode, for sign-up,
 * because the demo has no email service. Password reset needs a real inbox,
 * so it is switched off in demo mode.
 */
export async function POST(req) {
    const { email: raw, purpose = "signup" } = await req.json().catch(() => ({}));
    const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";
    if (!isEmail(email)) {
        return NextResponse.json({ success: false, message: "Enter a valid email address" }, { status: 400 });
    }
    if (!PURPOSES.includes(purpose)) {
        return NextResponse.json({ success: false, message: "Unknown request" }, { status: 400 });
    }
    if (DEMO_MODE && purpose === "reset") {
        return NextResponse.json({
            success: false,
            message: "Password reset is off in this demo because it can't send email. Use the demo login, or sign up with a new account.",
        }, { status: 403 });
    }

    const db = supabaseAdmin();
    const since = new Date(Date.now() - WINDOW_MINUTES * 60000).toISOString();
    const { count, error: countError } = await db.from("email_otps").select("id", { count: "exact", head: true }).eq("email", email).gte("created_at", since);
    if (countError) {
        return NextResponse.json({ success: false, message: "Couldn't send a code, try again" }, { status: 500 });
    }
    if (count >= MAX_PER_WINDOW) {
        return NextResponse.json({ success: false, message: `Too many codes requested. Try again in ${WINDOW_MINUTES} minutes.` }, { status: 429 });
    }

    if (purpose === "signup") {
        const { data: existing } = await db.from("users").select("uid").ilike("email", email).limit(1);
        if (existing?.length) {
            return NextResponse.json({ success: false, message: "An account with this email already exists. Log in instead." }, { status: 409 });
        }
    }

    const otp = String(crypto.randomInt(0, 10000)).padStart(4, "0");
    const { error } = await db.from("email_otps").insert({
        email,
        otp,
        purpose,
        expires_at: new Date(Date.now() + 10 * 60000).toISOString(),
    });
    if (error) {
        return NextResponse.json({ success: false, message: "Couldn't send a code, try again" }, { status: 500 });
    }

    if (DEMO_MODE) {
        return NextResponse.json({ success: true, message: "Demo mode: no email is sent, your code is shown here.", demoCode: otp });
    }

    if (!process.env.NEXT_SEND_GRID_API_KEY) {
        return NextResponse.json({ success: false, message: "Email isn't set up on this server" }, { status: 503 });
    }
    // For a reset, only send if the account exists, without saying so.
    if (purpose === "reset") {
        const { data: account } = await db.from("users").select("uid").ilike("email", email).limit(1);
        if (!account?.length) return NextResponse.json({ success: true, message: "If that account exists, a code is on its way." });
    }
    try {
        sgMail.setApiKey(process.env.NEXT_SEND_GRID_API_KEY);
        await sgMail.send({
            to: email,
            from: process.env.NEXT_SEND_DOMAIN_EMAIL,
            subject: "Your Afriva code",
            templateId: process.env.NEXT_OTP_SENDGRID_TEMPLATE_ID,
            dynamic_template_data: { appName: "Afriva", otp, year: new Date().getFullYear() },
        });
    } catch {
        return NextResponse.json({ success: false, message: "Couldn't send the email, try again" }, { status: 502 });
    }
    return NextResponse.json({ success: true, message: "A code is on its way to your inbox." });
}

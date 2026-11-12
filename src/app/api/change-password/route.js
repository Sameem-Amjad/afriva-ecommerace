import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { readToken } from "@/lib/server/otpToken";

/**
 * Sets a new password after a verified reset code. The token from
 * /api/verify-otp is the only proof accepted: never an email on its own.
 */
export async function POST(req) {
    const { token, password } = await req.json().catch(() => ({}));
    const email = readToken(token, "reset");
    if (!email) {
        return NextResponse.json({ success: false, message: "Your reset link has expired. Start again." }, { status: 401 });
    }
    if (typeof password !== "string" || password.length < 8 || password.length > 72) {
        return NextResponse.json({ success: false, message: "Use 8 to 72 characters" }, { status: 400 });
    }

    const db = supabaseAdmin();
    const { data: profiles } = await db.from("users").select("uid").ilike("email", email).limit(1);
    const uid = profiles?.[0]?.uid;
    const { data: found } = uid ? await db.auth.admin.getUserById(uid) : { data: null };
    const user = found?.user;
    if (!user || user.email?.toLowerCase() !== email) {
        return NextResponse.json({ success: false, message: "Password change failed" }, { status: 400 });
    }
    if (user.app_metadata?.no_delete || email.endsWith("@demo.afriva.shop")) {
        return NextResponse.json({ success: false, message: "The demo account's password can't be changed." }, { status: 403 });
    }
    const { error } = await db.auth.admin.updateUserById(user.id, { password });
    if (error) {
        return NextResponse.json({ success: false, message: "Password change failed" }, { status: 400 });
    }
    return NextResponse.json({ success: true, message: "Password changed" });
}

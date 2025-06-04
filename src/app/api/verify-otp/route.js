import { NextResponse } from 'next/server';
import { supabase } from '../../../../supabase';


export async function POST(req) {
    try {
        const { email, otp } = await req.json();
        if (!email || !otp) {
            return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
        }
        const { data, error } = await supabase
            .from("email_otps")
            .select("*")
            .eq("email", email)
            .eq("otp", otp)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();
        if (error || !data) {
            return NextResponse.json({ message: 'Invalid OTP or email' }, { status: 400 });
        }
        if (data.expires_at < new Date().toISOString()) {
            await supabase
                .from("email_otps")
                .delete()
                .eq("email", email)
                .eq("otp", otp);
            return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
        }
        // Optionally, you can delete the OTP after successful verification
        await supabase
            .from("email_otps")
            .delete()
            .eq("email", email)
            .eq("otp", otp);

        return NextResponse.json({ success: true, message: 'Otp verified successfully' }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ success: false, error: 'Otp Verification failed' }, { status: 400 });
    }
}

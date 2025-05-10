import { NextResponse } from 'next/server';
import { supabase } from '../../../../supabase';

export async function POST(req) {
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
        return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('email_otps')
        .select('*')
        .eq('email', email)
        .single();

    if (error || !data) {
        return NextResponse.json({ verified: false, message: 'Invalid email or OTP' }, { status: 400 });
    }

    const isValid = data.otp === otp && new Date(data.expires_at) > new Date();

    if (!isValid) {
        return NextResponse.json({ verified: false, message: 'OTP expired or incorrect' }, { status: 400 });
    }

    // Optional: delete OTP after use
    await supabase.from('email_otps').delete().eq('email', email);

    return NextResponse.json({ verified: true, message: 'OTP verified' }, { status: 200 });
}

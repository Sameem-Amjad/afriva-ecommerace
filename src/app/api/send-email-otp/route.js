import AWS from 'aws-sdk';
import { NextResponse } from 'next/server';
import { supabase } from '../../../../supabase';
const ses = new AWS.SES({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


export async function POST(req) {
    const body = await req.json();
    const { email } = body;

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    const emailParams = {
        Source: process.env.SES_FROM_EMAIL,
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Subject: {
                Data: 'Your OTP Code',
            },
            Body: {
                Text: {
                    Data: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
                },
            },
        },
    };

    try {
        await ses.sendEmail(emailParams).promise();

        const { error } = await supabase
            .from('email_otps')
            .upsert([{ email, otp, expires_at: expiresAt }], { onConflict: ['email'] });

        if (error) throw error;

        return NextResponse.json({ message: 'OTP sent to email' });
    } catch (err) {
        console.error('Failed to send email OTP:', err);
        return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
    }
}

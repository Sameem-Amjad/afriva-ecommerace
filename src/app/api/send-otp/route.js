import { NextResponse } from 'next/server';
import otpGenerator from "otp-generator";
import sgMail from '@sendgrid/mail';
import { supabase } from '../../../../supabase';

export async function POST(req) {
    try {
        sgMail.setApiKey(process.env.NEXT_SEND_GRID_API_KEY);
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }
        // Simulate sending OTP
        let otp = otpGenerator.generate(4, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });

        const { data, error } = await supabase
            .from("email_otps")
            .insert([
                {
                    email,
                    otp,
                    created_at: new Date().toISOString(),
                    expires_at: new Date(Date.now() + 2 * 60 * 1000).toISOString(),
                },
            ])
            .select("*")
            .single();;

        const msg = {
            to: email,
            from: process.env.NEXT_SEND_DOMAIN_EMAIL,
            subject: "OTP Verification",
            templateId: process.env.NEXT_OTP_SENDGRID_TEMPLATE_ID,
            dynamic_template_data: {
                appName: "afriva",
                otp: otp,
                year: new Date().getFullYear(),
            }
        };
        const response = await sgMail.send(msg);

        if (error) {
            return NextResponse.json({ error: 'Failed to save OTP' }, { status: 400, response: response });
        }
        return NextResponse.json({ success: true, message: 'Otp sent successfully', otp, response: response }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Otp Sending failed', error, mail: process.env.SEND_GRID_TEMPLATE_ID || "sd" }, { status: 400 });
    }
}
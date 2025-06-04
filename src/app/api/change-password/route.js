import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req) {
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY);

    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
        }
        const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers({
            email: email
        });

        if (error || !users || users.length === 0) {
            throw new Error('User not found');
        }
        const user = users.find((user) => user.email == email);
        if (!user) {
            throw new Error('User not found');
        }
        const userId = user.id;
        await supabaseAdmin.auth.admin.updateUserById(userId, {
            password: password
        });
        return NextResponse.json({ success: true, message: 'password changed successfully', userId }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ success: false, message: 'Password change failed' }, { status: 400 });
    }
}

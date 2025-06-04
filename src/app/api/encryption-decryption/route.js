import crypto from 'crypto';
import { NextResponse } from 'next/server';


export async function POST(req) {
    try {
        const { text, key, iv } = await req.json();

        if (!text || !key || !iv) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        return NextResponse.json({ encrypted }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Encryption failed' }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const { encrypted, key, iv } = Object.fromEntries(new URL(req.url).searchParams);

        if (!encrypted || !key || !iv) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return NextResponse.json({ decrypted }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Decryption failed' }, { status: 500 });
    }
}
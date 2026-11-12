import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Card payments go through Stripe only when a secret key is configured.
// The demo has none: its checkout simulates the payment instead.
export async function POST(request) {
    if (!process.env.STRIPE_SECRET_KEY || process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
        return NextResponse.json({ error: 'Card payments are simulated in this demo' }, { status: 404 });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    try {
        const { amount, currency } = await request.json();
        if (!Number.isInteger(amount) || amount < 50 || amount > 10_000_00 || currency !== 'usd') {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            automatic_payment_methods: { enabled: true },
        });
        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        return NextResponse.json({ error: 'Payment could not be started' }, { status: 400 });
    }
}

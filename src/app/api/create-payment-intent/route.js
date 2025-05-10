import { NextResponse } from 'next/server';
import Stripe from 'stripe';


export async function POST(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    try {
        const body = await request.json()
        const { amount, currency } = body;

        if (!amount || !currency) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card']
            // automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function GET(request) {

    try {

        return NextResponse.json({ "user": 'sameem' });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

"use client";
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import RoundedButton from '../buttons/RoundedButton';
import { toast } from 'sonner';
import dynamic from "next/dynamic";
import { DEMO_MODE } from '@/utils/demo';
import { usePlaceOrder } from './usePlaceOrder';
const Loader = dynamic(() => import("@/components/Loader/Loader"), { ssr: false });

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = !DEMO_MODE && PUBLISHABLE_KEY ? loadStripe(PUBLISHABLE_KEY) : null;

function CheckoutForm({ clientSecret }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const { place, placing } = usePlaceOrder();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret) return;
        setLoading(true);
        const result = await stripe.confirmPayment({ elements, confirmParams: {}, redirect: "if_required" });
        setLoading(false);
        if (result.error) {
            toast.error(result.error.message);
            return;
        }
        if (result.paymentIntent?.status === 'succeeded') {
            await place("card");
        }
    };

    return (
        <form onSubmit={handleSubmit} className='h-auto w-full flex flex-col gap-y-4 mt-5'>
            {clientSecret ? <PaymentElement /> : <p>Loading payment form...</p>}
            <RoundedButton
                type="submit"
                disabled={loading || placing}
                label={"Pay and Order"}
                className=" bg-primary border-primary text-white font-medium px-6 py-3.5"
            />
        </form>
    );
}

const digits = (v) => v.replace(/\D/g, "");

/** Demo checkout: no payment provider is connected, nothing is charged. */
function DemoCardForm({ amount }) {
    const { place, placing } = usePlaceOrder();
    const [name, setName] = useState("");
    const [card, setCard] = useState("4242 4242 4242 4242");
    const [expiry, setExpiry] = useState("12/30");
    const [cvc, setCvc] = useState("123");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return toast.error("Enter the name on the card");
        if (digits(card).length !== 16) return toast.error("Enter a 16-digit card number");
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) return toast.error("Enter the expiry as MM/YY");
        if (!/^\d{3,4}$/.test(cvc)) return toast.error("Enter the 3-digit security code");
        await place("card");
    };

    const field = "w-full rounded-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/40";
    return (
        <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className='h-auto w-full flex flex-col gap-y-3 mt-5'>
            <p role="note" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Demo mode: no card is charged. A test card is filled in, so just add a name and pay ${Number(amount || 0).toFixed(2)}.
            </p>
            <label className="text-sm font-medium" htmlFor="card-name">Name on card</label>
            <input id="card-name" className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="cc-name" placeholder="Amara Okafor" />
            <label className="text-sm font-medium" htmlFor="card-number">Card number</label>
            <input id="card-number" className={field} value={card} inputMode="numeric" autoComplete="off"
                onChange={(e) => setCard(digits(e.target.value).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 "))} />
            <div className="flex gap-3">
                <div className="flex-1 flex flex-col gap-y-1">
                    <label className="text-sm font-medium" htmlFor="card-expiry">Expiry</label>
                    <input id="card-expiry" className={field} value={expiry} placeholder="MM/YY" autoComplete="off"
                        onChange={(e) => { const d = digits(e.target.value).slice(0, 4); setExpiry(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d); }} />
                </div>
                <div className="flex-1 flex flex-col gap-y-1">
                    <label className="text-sm font-medium" htmlFor="card-cvc">CVC</label>
                    <input id="card-cvc" className={field} value={cvc} inputMode="numeric" autoComplete="off"
                        onChange={(e) => setCvc(digits(e.target.value).slice(0, 4))} />
                </div>
            </div>
            <RoundedButton
                type="submit"
                disabled={placing}
                label={"Pay and Order"}
                className=" bg-primary border-primary text-white font-medium px-6 py-3.5"
            />
        </form>
    );
}

export default function StripeForm({ amount }) {
    const [clientSecret, setClientSecret] = useState(null);
    const live = Boolean(stripePromise);

    useEffect(() => {
        if (!live) return;
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: Math.round(amount * 100), currency: 'usd' }),
        })
            .then((r) => r.json())
            .then((data) => setClientSecret(data.clientSecret || null))
            .catch((error) => console.error('Error fetching client secret:', error));
    }, [amount, live]);

    if (!live) return <DemoCardForm amount={amount} />;
    return clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
            <CheckoutForm clientSecret={clientSecret} />
        </Elements>
    ) : <Loader />;
}

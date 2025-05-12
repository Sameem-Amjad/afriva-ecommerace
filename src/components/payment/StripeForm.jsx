"use client";
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js';
import RoundedButton from '../buttons/RoundedButton';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderDetails } from '@/redux/features/order/orderSlice';
import { createNewOrder } from '@/redux/features/order/orderThunk';
import { removeCartItemThunk } from '@/redux/features/cart/cartThunk';
import { setPaymentHistory } from '@/redux/features/payment/paymentSlice';
import { addPaymentHistoryThunk } from '@/redux/features/payment/paymentThunk';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
import dynamic from "next/dynamic";
const Loader = dynamic(() => import("@/components/Loader/Loader"), { ssr: false });

function CheckoutForm({ clientSecret, handleButton, amount }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const { orderDetails } = useSelector((state) => state.orders);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret) return;

        setLoading(true);

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
            },
            redirect: "if_required"
        });

        if (result.error) {
            toast.error(result?.error?.message);
        } else {
            if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                if (!orderDetails?.user_delivery_address ||
                    !orderDetails.user_delivery_address.name ||
                    !orderDetails.user_delivery_address.address ||
                    !orderDetails.user_delivery_address.city ||
                    !orderDetails.user_delivery_address.phone_number) {
                    toast.error("Please fill in all the required fields.");
                    return;
                }

                cartItems?.forEach((item) => {
                    dispatch(setOrderDetails({ field: "product_ids", value: [item?.products.id] }));
                    dispatch(setOrderDetails({ field: "quantity", value: item.quantity }));
                    dispatch(setOrderDetails({ field: "payment_method", value: "cash" }));
                    const sizeDetail = item?.products?.size_details?.find(
                        (size) =>
                            size?.size === item?.selected_size &&
                            (size?.color.startsWith("#") ? size?.color : `#${size?.color}`) ===
                            (item?.selected_color.startsWith("#") ? item?.selected_color : `#${item?.selected_color}`)
                    );
                    if (sizeDetail) {
                        const price = parseFloat(sizeDetail.price) || 0;
                        const itemDiscount = (parseFloat(sizeDetail?.discount) || 0) / 100;
                        const itemDeliveryFee = parseFloat(sizeDetail?.delivery_fee) || 0;
                        dispatch(setOrderDetails({ field: "order_id", value: [...Array(5)].map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]).join('').toLowerCase() }));
                        dispatch(setOrderDetails({ field: "user_delivery_address.userId", value: item?.created_by }));
                        dispatch(setOrderDetails({ field: "user_delivery_address.created_at", value: new Date() }));
                        dispatch(setOrderDetails({ field: "subtotal", value: price }));
                        dispatch(setOrderDetails({ field: "delivery_charge", value: itemDeliveryFee }));
                        dispatch(setOrderDetails({ field: "total", value: (price - itemDiscount) + itemDeliveryFee }));
                        dispatch(setOrderDetails({ field: "total_amount", value: (price - itemDiscount) + itemDeliveryFee }));
                        dispatch(setOrderDetails({ field: "created_by", value: item?.created_by }));
                        dispatch(setPaymentHistory({ field: "amount", value: amount }));
                        dispatch(setPaymentHistory({ field: "type", value: "stripe" }));
                        dispatch(setPaymentHistory({ field: "created_by", value: item?.created_by }));
                        dispatch(setOrderDetails({ field: "selected_size_details", value: { qty: item.quantity, size: item.selected_size, color: sizeDetail?.colorName, color_code: "#"+item.selected_color } }));
                        dispatch(createNewOrder());

                        dispatch(removeCartItemThunk(item?.cart_id));
                        dispatch(addPaymentHistoryThunk());
                    }
                })
                toast.success('Payment succeeded! Order placed successfully!');
            }
        }

        setLoading(false);
        handleButton();
    };

    return (
        <form onSubmit={handleSubmit} className='h-auto w-full flex flex-col gap-y-4 mt-5'>
            {clientSecret ? (
                <PaymentElement />
            ) : (
                <p>Loading payment form...</p>
            )}
            <RoundedButton
                // label="Go to Checkout"
                type="submit"
                label={"Pay and Order"}
                className=" bg-primary border-primary text-white font-medium px-6 py-3.5"
            />
        </form>
    );
}

export default function StripeForm({ amount, handleButton }) {
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await fetch('/api/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: amount * 100, currency: 'usd' }),
                });
                const data = await response.json();
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error('Error fetching client secret:', error);
            }
        };

        fetchClientSecret();
    }, [amount]);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        clientSecret ? (
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm clientSecret={clientSecret} handleButton={handleButton} amount={amount} />
            </Elements>
        ) :
            <Loader />

    );
}
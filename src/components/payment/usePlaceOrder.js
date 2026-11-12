"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createNewOrder } from "@/redux/features/order/orderThunk";
import { getCartItemsThunk } from "@/redux/features/cart/cartThunk";

/** Places the whole cart as orders, then refreshes the cart and opens My orders. */
export function usePlaceOrder() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user } = useSelector((state) => state.users);
    const { cartItems } = useSelector((state) => state.cart);
    const { orderDetails } = useSelector((state) => state.orders);
    const [placing, setPlacing] = useState(false);

    const addressReady = () => {
        const a = orderDetails?.user_delivery_address;
        return Boolean(a?.name && a?.address && a?.city && a?.phone_number);
    };

    const place = async (paymentMethod) => {
        if (!addressReady()) {
            toast.error("Please fill in all the required fields.");
            return false;
        }
        if (!cartItems?.length) {
            toast.error("Your cart is empty.");
            return false;
        }
        setPlacing(true);
        try {
            const { placed, failed } = await dispatch(
                createNewOrder({ address: orderDetails.user_delivery_address, items: cartItems, paymentMethod })
            ).unwrap();
            if (user?.id) dispatch(getCartItemsThunk(user.id));
            failed.forEach(({ item, message }) => toast.error(`${item?.products?.name || "An item"}: ${message}`, { duration: 8000 }));
            if (placed.length) {
                toast.success(placed.length === 1 ? `Order ${placed[0].order_id} placed` : `${placed.length} orders placed`);
                router.push("/profile?orders");
            }
            return placed.length > 0;
        } catch (message) {
            toast.error(typeof message === "string" ? message : "Couldn't place the order. Please try again.");
            return false;
        } finally {
            setPlacing(false);
        }
    };

    return { place, placing };
}

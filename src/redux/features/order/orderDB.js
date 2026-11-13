import { supabase } from "../../../../supabase";

export const getActiveOrders = async (userId) => {
    const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq("created_by", userId)
        .in("status", ["packed", "shipped", "pending", "paid"])
        .order("created_at", { ascending: false });

    if (ordersError) {
        console.error("Error fetching orders:", ordersError);
        return null;
    }

    const enrichedOrders = await Promise.all(
        orders.map(async (order) => {
            const { data: products, error: productsError } = await supabase
                .from("products")
                .select("*")
                .in("id", order.product_ids);

            if (productsError) {
                console.error("Error fetching products for order:", productsError);
                return { ...order, products: [] };
            }

            return { ...order, products };
        })
    );

    return enrichedOrders;
};

export const getCompletedOrders = async (userId) => {
    const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq("created_by", userId)
        .in("status", ["completed", "delivered", "return requested", "return accepted", "return rejected"])
        .order("created_at", { ascending: false });

    if (ordersError) {
        console.error("Error fetching orders:", ordersError);
        return null;
    }

    const enrichedOrders = await Promise.all(
        orders.map(async (order) => {
            const { data: products, error: productsError } = await supabase
                .from("products")
                .select("* , sellers(name)")
                .in("id", order.product_ids);

            if (productsError) {
                console.error("Error fetching products for order:", productsError);
                return { ...order, products: [] };
            }

            return { ...order, products };
        })
    );

    return enrichedOrders;
};

const ORDER_ID_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const newOrderId = () => {
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    return "AF-" + Array.from(bytes, (b) => ORDER_ID_CHARS[b % ORDER_ID_CHARS.length]).join("");
};

/** Reuse the buyer's saved address when it matches, otherwise save it. */
const saveAddress = async (userId, address) => {
    const fields = {
        name: address?.name?.trim() || "",
        address: address?.address?.trim() || "",
        city: address?.city?.trim() || "",
        country: address?.country?.trim() || "",
        phone_number: address?.phone_number?.trim() || "",
    };
    const { data: saved } = await supabase
        .from("address")
        .select("*")
        .eq("user_id", userId)
        .eq("name", fields.name)
        .eq("address", fields.address)
        .eq("city", fields.city)
        .eq("phone_number", fields.phone_number)
        .limit(1);
    if (saved?.length) return saved[0];
    const { data, error } = await supabase
        .from("address")
        .insert({ user_id: userId, ...fields })
        .select("*")
        .single();
    if (error) throw error;
    return data;
};

/**
 * Places one order per cart line. The database prices each order from the
 * product's own size details and takes the stock in the same step, so a
 * line that sold out meanwhile is refused instead of oversold.
 * Returns the placed orders and the lines that failed, with the reason.
 */
export const placeOrders = async ({ address, items, paymentMethod = "cash" }) => {
    const { data: auth } = await supabase.auth.getUser();
    const userId = auth?.user?.id;
    if (!userId) throw new Error("Log in to place an order");
    const saved = await saveAddress(userId, address);
    const deliveryAddress = {
        id: saved.id,
        user_id: userId,
        name: saved.name,
        address: saved.address,
        city: saved.city,
        country: saved.country,
        phone_number: saved.phone_number,
        created_at: saved.created_at,
    };
    const placed = [];
    const failed = [];
    for (const item of items) {
        const product = item?.products;
        const detail = product?.size_details?.find(
            (d) => d?.size === item?.selected_size && (d?.color || "").replace("#", "").toLowerCase() === (item?.selected_color || "").replace("#", "").toLowerCase()
        );
        const { data, error } = await supabase
            .from("orders")
            .insert({
                order_id: newOrderId(),
                product_ids: [product?.id || item?.product_id],
                quantity: item.quantity,
                payment_method: paymentMethod,
                user_delivery_address: deliveryAddress,
                selected_size_details: {
                    qty: item.quantity,
                    size: item.selected_size,
                    color: detail?.colorName || "",
                    color_code: "#" + (item.selected_color || "").replace("#", ""),
                },
            })
            .select("*")
            .single();
        if (error) {
            failed.push({ item, message: error.message });
            continue;
        }
        placed.push(data);
        await supabase.from("cart").delete().eq("cart_id", item.cart_id);
    }
    const paid = placed.reduce((sum, o) => sum + Number(o.total || 0), 0);
    if (paymentMethod === "card" && placed.length) {
        await supabase.from("payment_history").insert({ amount: Math.round(paid * 100) / 100, type: "card", created_by: userId });
    }
    return { placed, failed, paid };
};

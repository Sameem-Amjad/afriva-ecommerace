import { supabase } from "../../../../supabase";

export const getActiveOrders = async (userId) => {
    const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq("created_by", userId)
        .in("status", ["packed", "shipped", "pending", "paid"]);

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
        .in("status", ["completed", "delivered", "return requested", "return accepted", "return rejected"]);

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

export const createOrder = async (orderData) => {
    const { data, error } = await supabase
        .from("orders")
        .insert([orderData])
        .select("*");

    orderData.product_ids.forEach(async (productId) => {
        const { data: productData, error: productError } = await supabase
            .from("products")
            .select("*")
            .eq("id", productId)
            .single();

        if (productError) {
            console.error("Error fetching product for order:", productError);
            return null;
        }

        let {size_details} = productData;
        size_details = size_details.map((size) => {
            if (size.size == orderData?.selected_size_details?.size ) {
                return { ...size, quantity: size.quantity - orderData?.selected_size_details?.qty };
            }
            return size;
        });
        const { error: updateError } = await supabase
            .from("products")
            .update({ size_details })
            .eq("id", productId);
        if (updateError) {
            console.error("Error updating product quantity:", updateError);
            return null;
        }
    });
    if (error) {
        console.log("Error creating order:", error);
        return null;
    }

    return data[0];
}
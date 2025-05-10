import { supabase } from "../../../../supabase";

export const addToCart = async (userId, productId, quantity, selectedSize, selectedColor) => {

    try {
        // console.log(userId, productId, quantity, selectedSize, selectedColor)
        const { data, error } = await supabase
            .from("cart")
            .insert([
                {
                    user_id: userId,
                    product_id: productId,
                    quantity: quantity,
                    selected_size: selectedSize,
                    selected_color: selectedColor.replace("#", ""),
                    created_by: userId,
                    updated_by: userId,
                    created_at: new Date(),
                },
            ])
            .select("*")
            .single();

        // console.log(data)

        if (error) {
            return { error };
        }

        return data;
    } catch (error) {
        console.error("Error adding to cart: ", error);
        throw error;
    }
}

export const getCartItems = async (userId) => {
    try {
        const { data, error } = await supabase
            .from("cart")
            .select("*, products(*)")
            .eq("user_id", userId);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Error getting cart items: ", error);
        throw error;
    }
}

export const updateCartItem = async (cartId, quantity) => {
    try {
        const { data, error } = await supabase
            .from("cart")
            .update({ quantity, updated_at: new Date() })
            .eq("cart_id", cartId)
            .select("*")
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Error updating cart item: ", error);
        throw error;
    }
};


export const removeCartItem = async (cartId) => {
    try {
        const { data, error } = await supabase
            .from("cart")
            .delete()
            .eq("cart_id", cartId);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Error removing cart item: ", error);
        throw error;
    }
};
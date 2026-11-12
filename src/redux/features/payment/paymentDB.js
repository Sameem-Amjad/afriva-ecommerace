import { supabase } from "../../../../supabase";

const cardBrand = (number) => {
    if (/^4/.test(number)) return "Visa";
    if (/^(5[1-5]|2[2-7])/.test(number)) return "Mastercard";
    if (/^3[47]/.test(number)) return "American Express";
    if (/^6(011|5)/.test(number)) return "Discover";
    return "Card";
};

/**
 * Saved cards keep only the brand, the last four digits and the expiry. The
 * full number and the security code are never stored (the database refuses
 * them too): charging a saved card would go through a payment provider token.
 */
export const addPaymentMethod = async (paymentData) => {
    try {
        const number = String(paymentData.card_no || "").replace(/\D/g, "");
        if (number.length < 12) throw new Error("Enter the full card number");
        const { data: auth } = await supabase.auth.getUser();
        const userId = auth?.user?.id;
        const row = {
            created_by: userId,
            card_holder_name: paymentData.card_holder_name,
            type: cardBrand(number),
            card_no: "************" + number.slice(-4),
            expiry: paymentData.expiry,
            cvc: null,
            isPrimary: Boolean(paymentData.isPrimary),
        };
        if (row.isPrimary) {
            const { error: updateError } = await supabase
                .from("payment_methods")
                .update({ isPrimary: false })
                .eq("created_by", userId);
            if (updateError) throw updateError;
        }
        const { data, error } = await supabase.from("payment_methods").insert([row]).select("*");
        if (error) throw error;
        return data;
    } catch (err) {
        console.error("Error adding payment method:", err.message);
        throw new Error("Failed to add payment method.");
    }
};

export const getPaymentMethods = async (userId) => {
    const { data, error } = await supabase
        .from("payment_methods")
        .select("*")
        .eq("created_by", userId)
        .order("created_at", { ascending: true });
    if (error) {
        console.error("Error fetching payment methods:", error.message);
        throw error;
    }
    return data;
};

export const removePaymentMethod = async (id) => {
    try {
        const { data, error } = await supabase
            .from("payment_methods")
            .delete()
            .eq("id", id);

        if (error) {
            throw error;
        }

        return data;
    } catch (err) {
        console.error("Error removing payment method:", err.message);
        throw err;
    }
}

export const addPaymentHistory = async (payment_history) => {
    try {
        const { data, error } = await supabase
            .from("payment_history")
            .insert([payment_history]);

        if (error) {
            throw error;
        }

        return data;
    } catch (err) {
        console.error("Error adding payment history:", err.message);
        throw err;
    }
}

export const getPaymentHistory = async (userId) => {
    try {
        const { data, error } = await supabase
            .from("payment_history")
            .select("*")
            .eq("created_by", userId);

        if (error) {
            throw error;
        }

        return data;
    } catch (err) {
        console.error("Error fetching payment history:", err.message);
        throw err;
    }
}
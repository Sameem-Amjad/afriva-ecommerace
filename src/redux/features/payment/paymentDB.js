import { encrypt } from "@/hooks/useEncrypt";
import { supabase } from "../../../../supabase";
import { decrypt } from "@/hooks/useDecrypt";
// Helper function to mask the card number
const maskCardNumber = (cardNo) => {
    const lastFourDigits = cardNo.slice(-4);
    return `******${lastFourDigits}`;
};


export const addPaymentMethod = async (paymentData) => {
    try {
        console.log("paymentData", paymentData);
        const encryptedCardNo = encrypt(paymentData.card_no);
        const encryptedCvc = encrypt(paymentData.cvc);

        const encryptedPaymentData = {
            ...paymentData,
            card_no: encryptedCardNo,
            cvc: encryptedCvc,
        };
        console.log("encryptedPaymentData", encryptedPaymentData);
        if (encryptedPaymentData.isPrimary) {
            const { error: updateError } = await supabase
                .from("payment_methods")
                .update({ isPrimary: false })
                .eq("created_by", encryptedPaymentData.created_by);

            if (updateError) throw updateError;
        }

        const { data, error } = await supabase
            .from("payment_methods")
            .insert([encryptedPaymentData]);

        if (error) throw error;

        return data;
    } catch (err) {
        console.error("Error adding payment method:", err.message);
        throw new Error("Failed to add payment method.");
    }
};

export const getPaymentMethods = async (userId) => {
    try {
        const { data, error } = await supabase
            .from("payment_methods")
            .select("*")
            .eq("created_by", userId);

        if (error) {
            throw error;
        }

        return data.map((method) => ({
            ...method,
            card_no: maskCardNumber(decrypt(method.card_no)), // Mask the card number for display
        }));
    } catch (err) {
        console.error("Error fetching payment methods:", err.message);
        throw err;
    }
}

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
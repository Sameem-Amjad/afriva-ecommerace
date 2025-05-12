import { supabase } from "../../../../supabase";

export const getPromoCodeDiscount = async (promoCode ,id) => {
    try {
        const { data, error } = await supabase
            .from('promocode')
            .select('discount')
            .eq('code', promoCode)
            .eq('assignto', id)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data ? data.discount : null;
    } catch (error) {
        console.error('Error fetching promo code discount:', error);
        throw error;
    }
}
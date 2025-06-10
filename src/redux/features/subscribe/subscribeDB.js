import { supabase } from "../../../../supabase";
export const subscribeUser = async (email) => {
    // Check if the user is already subscribed
    const { data: existing, error: fetchError } = await supabase
        .from("subscribe_newsletter")
        .select("*")
        .ilike("email", email)
        .single();
    if (fetchError && fetchError.code !== "PGRST116") { // PGRST116: No rows found
        console.error("Error checking subscription:", fetchError);
        return null;
    }

    if (existing) {
        // User already subscribed
        return { alreadySubscribed: true, data: existing };
    }

    // Insert new subscription
    const { data, error } = await supabase
        .from("subscribe_newsletter")
        .insert([{ email, active: true, created_at: new Date() }])
        .select("*");

    if (error) {
        console.error("Error subscribing user:", error);
        return null;
    }

    return { alreadySubscribed: false, data };
};

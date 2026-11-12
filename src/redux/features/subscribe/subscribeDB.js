import { supabase } from "../../../../supabase";

// The list itself is never readable from the browser: a database function
// adds the address and says whether it was new.
export const subscribeUser = async (email) => {
    const { data, error } = await supabase.rpc("subscribe", { p_email: (email || "").trim() });
    if (error) {
        console.error("Error subscribing user:", error);
        return null;
    }
    if (data === "invalid") {
        throw new Error("Enter a valid email address");
    }
    return { alreadySubscribed: data === "already" };
};

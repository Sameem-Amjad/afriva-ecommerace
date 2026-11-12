
import { supabase } from "../../../../supabase";
import { uploadImage } from "../auth/authDB";

export const addReturnRequest = async (returnRequest) => {
    const { order_id, quantity, reason, location_confirmation, refund_to, refund_amount, created_by, images, details, comments } = returnRequest;

    try {
        // Moving the order to "return requested" is allowed only for the
        // buyer's own delivered order, so it goes first.
        const { data: moved, error: orderError } = await supabase
            .from("orders")
            .update({ status: "return requested" })
            .eq("order_id", order_id)
            .select("order_id");
        if (orderError) {
            throw new Error(orderError.message);
        }
        if (!moved?.length) {
            throw new Error("This order can't be returned");
        }
        const stamp = Date.now();
        const uploadedImages = await Promise.all(
            images.map(async (image, index) => {
                const file = dataURLtoFile(image, `return_${order_id}_${index}.jpg`);
                return await uploadImage(file, 'return-orders-media', `${created_by}/${order_id}_${stamp}_${index}.jpg`);
            })
        );
        const { data: returnData, error: returnError } = await supabase
            .from("return_requests")
            .insert({
                order_id,
                quantity,
                reason,
                location_confirmation,
                refund_to,
                refund_amount,
                created_by,
                images: uploadedImages,
                details,
                comments,
                confirm_return: false,
            })
            .select("*");

        if (returnError) {
            throw new Error(returnError.message);
        }
        return returnData;
    } catch (error) {
        console.error("Error adding return request:", error);
        throw error;
    }
};
// Helper function to convert a data URL to a File object
function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

export const returnRequestDetails = async (orderId) => {
    let { data, error } = await supabase.from("return_requests").select("*").eq("order_id", orderId).single();
    if (error) {
        console.error("Error fetching return request details:", error);
        throw error;
    }
    return data;
}
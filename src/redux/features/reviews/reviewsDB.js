import { supabase } from "../../../../supabase";
import { uploadImage } from "../auth/authDB";

export const getAllReviews = async () => {
    const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching reviews:", error);
        return null;
    }

    return data;
}


export const giveReview = async (rating, description, orderId, productId, images, reviewer_name, review_by) => {

    // One review per order and product.
    const { data: existingReview } = await supabase
        .from("reviews")
        .select("review_id")
        .eq("order_id", orderId)
        .eq("product_id", productId)
        .eq("review_by", review_by)
        .maybeSingle();

    if (existingReview) {
        return { alreadyGiven: true, message: "Review already exists" };
    }

    const uploadedImages = await Promise.all(
        images.map(async (image, index) => {
            const safeName = (image.name || "photo.jpg").replace(/[^\w.-]+/g, "_");
            return uploadImage(image, "review_media", `${review_by}/${Date.now()}_${index}_${safeName}`);
        })
    );
    const { data, error } = await supabase
        .from("reviews")
        .insert({
            description,
            total_score: rating,
            review_images: uploadedImages,
            product_id: productId,
            order_id: orderId,
            review_by,
            reviewer_name,
            created_by: review_by
        })
        .select("*");

    if (error) {
        console.error("Error giving review:", error);
        return null;
    }
    // The product's rating is a true average, recomputed by the database.
    await supabase.rpc("refresh_rating", { p_product: productId });
    return data;
};

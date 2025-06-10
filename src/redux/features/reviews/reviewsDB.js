import { supabase } from "../../../../supabase";
import { uploadImage } from "../auth/authDB";

export const getAllReviews = async () => {
    const { data, error } = await supabase
        .from("reviews")
        .select("*,users(name,username, full_address)")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching reviews:", error);
        return null;
    }

    return data;
}


export const giveReview = async (rating, description, orderId, productId, images, reviewer_name, review_by) => {

    // Check if a review already exists for the given orderId and productId
    const { data: existingReview, error: fetchError } = await supabase
        .from("reviews")
        .select("*")
        .eq("order_id", orderId)
        .eq("product_id", productId)
        .eq("created_by", review_by)
        .single();

    // if (fetchError && fetchError.code !== "PGRST116") { // Ignore "No rows found" error
    //     console.error("Error checking existing review:", fetchError);
    //     return null;
    // }

    if (existingReview) {
        console.warn("Review already exists for this order and product.");
        return { alreadyGiven: true, message: "Review already exists" };
    }

    const uploadedImages = await Promise.all(
        images.map(async (image) => {
            const imagePath = `${review_by}_${Date.now()}_${image.name}`;
            const uploadedImage = await uploadImage(image, "review_media", imagePath);
            return uploadedImage;
        })
    );
    const imageUrls = uploadedImages.map((img) => img);
    const { data, error } = await supabase
        .from("reviews")
        .insert({
            description,
            total_score: rating,
            review_images: imageUrls,
            product_id: productId,
            order_id: orderId,
            review_by,
            reviewer_name,
            created_at: new Date().toISOString(),
            created_by: review_by
        })
        .select("*");

    if (error) {
        console.error("Error giving review:", error);
        return null;
    }
    // {"rating": 5.0, "totalRating": 5.0, "totalReviews": 1}

    // Fetch current overall_rating
    const { data: productData, error: productError } = await supabase
        .from("products")
        .select("overall_rating")
        .eq("id", productId)
        .single();

    if (!productError && productData && productData.overall_rating) {
        const current = productData.overall_rating;
        const newTotalRating = (current.totalRating || 0) + rating;
        const newTotalReviews = (current.totalReviews || 0) + 1;
        const newRating = (current.rating + rating) / 2

        await supabase.from("products").update({
            overall_rating: {
                totalRating: newTotalRating,
                totalReviews: newTotalReviews,
                rating: newRating,
            }
        }).eq("id", productId);
    }

    // Update product rating logic remains the same
    return data;
};
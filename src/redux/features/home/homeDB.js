import { supabase } from "../../../../supabase";

export const getHomeData = async () => {
    // Fetch total brands and their names
    const { data: brandsData, error: brandsError } = await supabase
        .from('brands').select('*')
    if (brandsError) throw brandsError;

    const totalBrands = brandsData.length;

    // Fetch total reviews with total_score > 3
    const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('review_id')
        .gt('total_score', 3);
    if (reviewsError) throw reviewsError;

    const totalReviews = reviewsData.length;

    // Fetch total products
    const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id');
    if (productsError) throw productsError;

    const totalProducts = productsData.length;

    // Return the aggregated data
    return {
        totalBrands,
        totalReviews,
        totalProducts
    };

};

export const getBrandsImages = async () => {
    const { data: brandsData, error: brandsError } = await supabase
        .from('brands')
        .select('name,logo_url');
    if (brandsError) throw brandsError;
    const uniqueBrands = [];
    const seenNames = new Set();

    for (const brand of brandsData) {
        if (!seenNames.has(brand.name)) {
            uniqueBrands.push(brand);
            seenNames.add(brand.name);
        }
    }
    return uniqueBrands;
};


export const newArrivalProducts = async () => {
    const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*)')
        .order('created_at', { ascending: false })
        .limit(4);
    if (productsError) throw productsError;
    return productsData;
}

export const getTopSellingsProducts = async () => {
    const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('total_number_of_sell', { ascending: false })
        .limit(4);
    if (productsError) throw productsError;
    return productsData;
}
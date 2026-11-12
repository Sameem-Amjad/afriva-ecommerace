import { supabase } from "../../../../supabase";

export const getHomeData = async () => {
    const count = async (query) => {
        const { count: n, error } = await query;
        if (error) throw error;
        return n || 0;
    };
    const [totalBrands, totalReviews, totalProducts] = await Promise.all([
        count(supabase.from('brands').select('brand_id', { count: 'exact', head: true })),
        count(supabase.from('reviews').select('review_id', { count: 'exact', head: true }).gt('total_score', 3)),
        count(supabase.from('products').select('id', { count: 'exact', head: true })),
    ]);
    return { totalBrands, totalReviews, totalProducts };
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
        .select('*')
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
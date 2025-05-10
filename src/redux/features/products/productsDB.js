import { supabase } from "../../../../supabase";

export const getNewArrivalPaginatedProducts = async (start, limit = 25) => {
    // console.log("start", start);
    // console.log("limit", start + limit - 1);
    const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .range(start, start + limit - 1);

    if (productsError) throw productsError;
    const hasMore = productsData.length === limit;

    return { products: productsData, hasMore, start };
};

export const getBrandsWithProducts = async (start, limit = 5) => {
    const { data: brandsData, error: brandsError } = await supabase
        .from('brands')
        .select('*, products:products(*)')
        .range(start, start + limit - 1);

    if (brandsError) throw brandsError;

    const filteredBrands = brandsData.filter(brand => brand.products && brand.products.length > 0);

    const hasMore = filteredBrands.length === limit;

    const brandsWithProducts = filteredBrands.map(brand => ({
        id: brand.brand_id,
        name: brand.name,
        logo_url: brand.logo_url,
        products: brand.products,
    }));

    return { brands: brandsWithProducts, hasMore, start };
};

export const getProductDetailsById = async (id) => {
    const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (productError) throw productError;

    return productData;
};

export const getProductReviewsById = async ({ id, start, limit = 10, sort = "latest", rating = null }) => {
    let query = supabase
        .from('reviews')
        .select('*,users(name,username, full_address)')
        .eq('product_id', id)
        .range(start, start + limit - 1);

    // Apply sorting
    if (sort === "latest") {
        query = query.order('created_at', { ascending: false });
    } else if (sort === "Lowest to Highest") {
        query = query.order('total_score', { ascending: false });
    } else if (sort === "Highest to Lowest") {
        query = query.order('total_score', { ascending: true });
    }

    // Apply rating filter if provided
    if (rating !== null && rating !== undefined) {
        query = query.eq('total_score', rating);
    }

    const { data: reviewsData, error: reviewsError } = await query;

    if (reviewsError) throw reviewsError;

    const hasMore = reviewsData.length === limit;

    return { reviews: reviewsData, hasMore, start };
};

export const getSimillarProducts = async (id, limit = 4) => {
    const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (productError) throw productError;

    let query = supabase.from('products').select('*').neq('id', id);
    let simillarProductsData = [];

    // Try to get products from the same category
    if (productData.category_id) {
        const { data, error } = await query
            .eq('category_id', productData.category_id)
            .limit(limit);

        if (error) throw error;
        simillarProductsData = data;
    }

    // // If not enough products, try to get from the same subcategory
    // if (simillarProductsData.length < limit && productData.subcategory) {
    //     const subcategoryValue = JSON.stringify(productData.subcategory[0]).replace(/^"|"$/g, '');
    //     const { data, error } = await query
    //         .eq('subcategory', subcategoryValue)
    //         .limit(limit - simillarProductsData.length);

    //     if (error) throw error;
    //     simillarProductsData = [...simillarProductsData, ...data];
    // }

    // If still not enough, try to get from the same seller
    if (simillarProductsData.length < limit && productData.seller_id) {
        const { data, error } = await query
            .eq('seller_id', productData.seller_id)
            .limit(limit - simillarProductsData.length);

        if (error) throw error;
        simillarProductsData = [...simillarProductsData, ...data];
    }

    // If still not enough, try to get from the same brand
    if (simillarProductsData.length < limit && productData.brand_id) {
        const { data, error } = await query
            .eq('brand_id', productData.brand_id)
            .limit(limit - simillarProductsData.length);

        if (error) throw error;
        simillarProductsData = [...simillarProductsData, ...data];
    }

    // If still not enough, get the latest products from the same category
    if (simillarProductsData.length < limit && productData.category_id) {
        const { data, error } = await query
            .eq('category_id', productData.category_id)
            .order('created_at', { ascending: false })
            .limit(limit - simillarProductsData.length);

        if (error) throw error;
        simillarProductsData = [...simillarProductsData, ...data];
    }

    // Remove duplicate products while keeping the full product data and limit the results
    const uniqueProducts = [...new Map(simillarProductsData.map(item => [item.id, item])).values()]
        .slice(0, limit);

    return uniqueProducts || [];
};

export const searchProducts = async (searchTerm, start, limit = 10) => {
    const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${searchTerm}%`)
        .range(start, start + limit - 1);

    if (productsError) throw productsError;

    const hasMore = productsData.length === limit;

    return { products: productsData, hasMore, start };
}

export const getFavouriteProducts = async (userId, start, limit = 10) => {
    // console.log(userId, start, limit = 10)
    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('favorite_products')
        .eq('uid', userId)
        .single();

    if (userError) throw userError;

    const totalFavouriteProducts = userData.favorite_products.length;
    const favouriteProductIds = userData.favorite_products.slice(start, start + limit);

    const { data: favouriteProductsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .in('id', favouriteProductIds);

    if (productsError) throw productsError;

    const hasMore = userData.favorite_products.length > start + limit;
    // console.log(favouriteProductsData, "favouriteProductsData")
    return { products: favouriteProductsData, hasMore, start, totalFavouriteProducts };
};

export const addToFavourites = async (userId, productId) => {
    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('favorite_products')
        .eq('uid', userId)
        .single();

    if (userError) throw userError;

    let updatedFavorites = [...userData.favorite_products, productId];
    // Remove duplicates
    updatedFavorites = [...new Set(updatedFavorites)];
    // remove null 
    updatedFavorites = updatedFavorites.filter(id => id !== null && id !== undefined);
    const { data, error } = await supabase
        .from('users')
        .update({ favorite_products: updatedFavorites })
        .eq('uid', userId);
    const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
    if (error) throw error;
    if (productError) throw productError;

    return { product: productData };
};

export const removeFromFavourites = async (userId, productId) => {
    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('favorite_products')
        .eq('uid', userId)
        .single();
    if (userError) throw userError;

    const updatedFavorites = userData?.favorite_products?.filter(id => id !== productId);
    const { data, error } = await supabase
        .from('users')
        .update({ favorite_products: updatedFavorites })
        .eq('uid', userId);

    if (error) throw error;

    return data;
};

export const isFavourite = async (productId, userId) => {
    if (!userId) {
        throw new Error("Invalid userId: userId is undefined or null");
    }

    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('favorite_products')
        .eq('uid', userId)
        .single();

    if (userError) throw userError;
    return !!userData.favorite_products.includes(productId);
};
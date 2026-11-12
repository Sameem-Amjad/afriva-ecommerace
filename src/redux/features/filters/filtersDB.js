import { supabase } from "../../../../supabase";

export const getSubCategories = async (category) => {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("category_name", category).single();

    if (error) throw error;

    return data?.subcategories;
}

export const getPriceRangeByCategory = async (category) => {
    const { data, error } = await supabase
        .from("products")
        .select("size_details, categories!inner(category_name)")
        .eq("categories.category_name", category);

    if (error) throw error;

    const prices = data
        .flatMap(product => (product.size_details || []).map(detail => parseFloat(detail.price)))
        .filter(Number.isFinite);
    if (!prices.length) return [0, 0];
    const minPrice = Math.floor(Math.min(...prices));
    const maxPrice = Math.ceil(Math.max(...prices));

    return [minPrice, maxPrice];
}

export const getColorsByCategory = async (category) => {
    let { data, error } = await supabase
        .from("products")
        .select("size_details, categories!inner(category_name)")
        .eq("categories.category_name", category);
    data = data.map(product => {
        const sizeDetails = product.size_details;
        return sizeDetails.map(sizeDetail => sizeDetail.color.startsWith("#") ? sizeDetail.color : `#${sizeDetail.color}`);
    }
    ).flat(1);
    if (error) throw error;
    //remove duplicate color
    data = [...new Set(data)];
    return data;
}
export const getFilteredProducts = async ({
    category,
    subCategory,
    priceRange,
    color,
    size,
    style,
    page = 1,
    sortBy = "latest",
    limit = 100
}) => {

    // Only this category's products (the join filters by its name).
    const select = category ? "*, categories!inner(category_name)" : "*";
    let countQuery = supabase.from("products").select(select, { count: "exact", head: true });
    if (category) countQuery = countQuery.eq("categories.category_name", category);
    if (subCategory) countQuery = countQuery.contains("subcategory", [subCategory]);
    const { count } = await countQuery;
    let query = supabase
        .from("products")
        .select(select)
        .range((page - 1) * limit, page * limit - 1);
    if (category) {
        query = query.eq("categories.category_name", category);
    }

    if (subCategory) {
        query = query.contains("subcategory", [subCategory]);
    }

    if (size) {
        query = query.filter("size_details", "cs", JSON.stringify([{ size: size }]));
    }

    if (sortBy === "lowest") {
        query = query.order("size_details->0->price", { ascending: true });
    } else if (sortBy === "highest") {
        query = query.order("size_details->0->price", { ascending: false });
    } else if (sortBy === "latest") {
        query = query.order("created_at", { ascending: false });
    }

    const { data, error } = await query;
    if (error) {
        console.error("Error fetching products:", error);
        throw error;
    }

    let filteredData = data;
    if (priceRange) {
        filteredData = data.filter(product =>
            product.size_details?.some(detail => {
                const price = parseFloat(detail.price);
                return price >= priceRange[0] && price <= priceRange[1];
            })
        );
    }
    if (color) {
        const colorToMatch = color.startsWith("#") ? color.toLowerCase() : `#${color.toLowerCase()}`;
        filteredData = filteredData.filter(product =>
            product.size_details?.some(detail =>
                detail.color?.toLowerCase() === colorToMatch
            )
        );
    }
    //total page 
    let totalPageCount = Math.ceil(filteredData.length / limit);
    return { products: filteredData, total: count, totalPageCount };
};

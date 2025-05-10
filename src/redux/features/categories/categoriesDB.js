import { supabase } from "../../../../supabase";

export const getCategories = async () => {
    const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*');
    if (categoriesError) throw categoriesError;
    return categoriesData;
}

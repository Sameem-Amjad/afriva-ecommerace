import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFilteredProducts, getSubCategories, getPriceRangeByCategory, getColorsByCategory, } from "./filtersDB";

export const fetchFilteredProducts = createAsyncThunk(
    "filters/fetchFilteredProducts",
    async ({ filters, page, limit }) => {
        const { products, total } = await getFilteredProducts({ ...filters, page, limit });
        return { products, total };
    }
);

export const fetchSubCategories = createAsyncThunk(
    "filters/fetchSubCategories",
    async (category) => {
        const subCategories = await getSubCategories(category);
        return subCategories;
    }
);

export const fetchPriceRangeByCategory = createAsyncThunk(
    "filters/fetchPriceRangeByCategory",
    async (category) => {
        const priceRange = await getPriceRangeByCategory(category);
        return priceRange;
    }
);

export const fetchColorsByCategory = createAsyncThunk(
    "filters/fetchColorsByCategory",
    async (category) => {
        const colors = await getColorsByCategory(category);
        return colors;
    }
);
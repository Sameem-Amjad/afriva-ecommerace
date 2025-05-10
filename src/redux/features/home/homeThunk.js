import { createAsyncThunk } from "@reduxjs/toolkit";

import { getHomeData, getBrandsImages, newArrivalProducts, getTopSellingsProducts } from "./homeDB";

export const fetchHomeData = createAsyncThunk(
    "home/fetchHomeData",
    async () => {
        try {
            const data = await getHomeData();
            return data;
        } catch (error) {
            throw new Error("Failed to fetch home data: " + error.message);
        }
    }
);

export const fetchBrandsImages = createAsyncThunk(
    "home/fetchBrandsImages",
    async () => {
        try {
            const data = await getBrandsImages();
            return data;
        } catch (error) {
            throw new Error("Failed to fetch brands names: " + error.message);
        }
    }
);

export const fetchNewArrivalProducts = createAsyncThunk(
    "home/fetchNewArrivalProducts",
    async () => {
        try {
            const data = await newArrivalProducts();
            return data;
        } catch (error) {
            throw new Error("Failed to fetch new arrival products: " + error.message);
        }
    }
);

export const fetchTopSellingsProducts = createAsyncThunk(
    "home/fetchTopSellingsProducts",
    async () => {
        try {
            const data = await getTopSellingsProducts();
            return data;
        } catch (error) {
            throw new Error("Failed to fetch top selling products: " + error.message);
        }
    }
);
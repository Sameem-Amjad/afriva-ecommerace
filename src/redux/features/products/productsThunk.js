import { createAsyncThunk } from "@reduxjs/toolkit";

import { getNewArrivalPaginatedProducts, getBrandsWithProducts, getProductDetailsById, getProductReviewsById, getSimillarProducts, searchProducts, getFavouriteProducts, addToFavourites, removeFromFavourites, isFavourite } from "./productsDB";

export const fetchGetNewArrivalPaginatedProducts = createAsyncThunk(
    "products/fetchGetNewArrivalPaginatedProducts",
    async ({ start, limit }) => {
        const { products, hasMore } = await getNewArrivalPaginatedProducts(start, limit);
        return { products, hasMore };
    }
);

export const fetchGetProductsWithBrandDetails = createAsyncThunk(
    "products/fetchGetProductsWithBrandDetails",
    async ({ start, limit }) => {
        const products = await getBrandsWithProducts(start, limit);
        return products;
    }
);

export const fetchGetProductDetailsById = createAsyncThunk(
    "products/fetchGetProductDetailsById",
    async (id) => {
        const product = await getProductDetailsById(id);
        return product;
    }
);

export const fetchGetProductReviewsById = createAsyncThunk(
    "products/fetchGetProductReviewsById",
    async ({ id, start, limit, sort, rating }) => {
        const { reviews, hasMore } = await getProductReviewsById({ id, start, limit, sort, rating });
        return { reviews, hasMore };
    }
);

export const fetchGetSimillarProducts = createAsyncThunk(
    "products/fetchGetSimillarProducts",
    async (id) => {
        const products = await getSimillarProducts(id);
        return products;
    }
);

export const fetchSearchProducts = createAsyncThunk(
    "products/fetchSearchProducts",
    async ({ searchTerm, start, limit }) => {
        const products = await searchProducts(searchTerm, start, limit);
        return products;
    }
);

export const fetchGetFavouriteProducts = createAsyncThunk(
    "products/fetchGetFavouriteProducts",
    async ({ userId, start, limit }) => {
        const products = await getFavouriteProducts(userId, start, limit);
        return products;
    }
);

export const fetchAddToFavourites = createAsyncThunk(
    "products/fetchAddToFavourites",
    async ({ productId, userId }) => {
        const product = await addToFavourites(userId, productId);
        return product;
    }
);

export const fetchRemoveFromFavourites = createAsyncThunk(
    "products/fetchRemoveFromFavourites",
    async ({ productId, userId }) => {

        const product = await removeFromFavourites(userId, productId);
        return product;
    }
);

export const fetchIsFavourite = createAsyncThunk(
    "products/fetchIsFavourite",
    async ({ productId, userId }) => {
        const isFav = await isFavourite(productId, userId);
        return isFav;
    }
);
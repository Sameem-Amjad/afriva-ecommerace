import { createSlice } from '@reduxjs/toolkit';
import { fetchGetNewArrivalPaginatedProducts, fetchGetProductsWithBrandDetails, fetchGetProductDetailsById, fetchGetProductReviewsById, fetchGetSimillarProducts, fetchSearchProducts, fetchAddToFavourites, fetchGetFavouriteProducts, fetchRemoveFromFavourites, fetchIsFavourite } from './productsThunk';

const initialState = {
    arrivalProducts: [],
    productsWithBrandDetails: [],
    productDetails: {},
    productReviews: [],
    simillarProducts: [],
    filters: {
        sort: "latest", // Default sort
        rating: null,   // Default rating filter
    },
    searchProducts: [],
    hasMore: true,
    loading: false,
    productDetailLoading: false,
    productReviewsLoading: false,
    simillarProductsLoading: false,
    error: null,
    favouriteProducts: [],
    isFavouriteProduct: false,
    totalFavouriteProducts: 0,
};

const productsSlice = createSlice({

    name: 'products',
    initialState,
    reducers: {
        resetNewArrivalProducts: (state) => {
            state.arrivalProducts = [];
            state.productsWithBrandDetails = [];
            state.productDetails = {};
            state.productReviews = [];
            state.simillarProducts = [];
            state.simillarProductsLoading = false;
            state.loading = false;
            state.error = null;
            state.hasMore = true;
        },
        resetProductReviews: (state) => {
            state.productReviews = []; // Clear the reviews
            state.hasMore = true; // Reset pagination
            state.filters = { sort: "latest", rating: null }; // Reset filters
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setSearchProducts: (state, action) => {
            state.searchProducts = action.payload;
        },
        resetSearchProducts: (state) => {
            state.searchProducts = []; // Clear the search results
            state.hasMore = true; // Reset pagination
            state.filters = { sort: "latest", rating: null }; // Reset filters
        },
        resetSimillarProducts: (state) => {
            state.simillarProducts = []; // Clear the simillar products
            state.hasMore = true; // Reset pagination
            state.filters = { sort: "latest", rating: null }; // Reset filters
        },
        resetProductDetails: (state) => {
            state.productDetails = {}; // Clear the product details
            state.productDetailLoading = false; // Reset loading state
            state.error = null; // Reset error state
        },
        resetFavourites: (state) => {
            state.favouriteProducts = []; // Clear the favourite products
            state.hasMore = true; // Reset pagination
            state.filters = { sort: "latest", rating: null }; // Reset filters
            state.totalFavouriteProducts = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetNewArrivalPaginatedProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetNewArrivalPaginatedProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.arrivalProducts = [
                    ...state.arrivalProducts,
                    ...action.payload.products
                ].filter(
                    (product, index, self) =>
                        index === self.findIndex((p) => p.id === product.id)
                );
                state.hasMore = action.payload.hasMore;
            })
            .addCase(fetchGetNewArrivalPaginatedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchGetProductsWithBrandDetails.pending, (state) => {
                state.loading = true;
                state.hasMore = true;
                state.error = null;
            })
            .addCase(fetchGetProductsWithBrandDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.hasMore = action.payload.hasMore;

                state.productsWithBrandDetails = [
                    ...state.productsWithBrandDetails,
                    ...action.payload.brands
                ].filter(
                    (brand, index, self) =>
                        index === self.findIndex((b) => b.id === brand.id)
                );
            })
            .addCase(fetchGetProductsWithBrandDetails.rejected, (state, action) => {
                state.loading = false;
                state.hasMore = false;
                state.error = action.error.message;
            })
            .addCase(fetchGetProductDetailsById.pending, (state) => {
                state.productDetailLoading = true;
                state.error = null;
            })
            .addCase(fetchGetProductDetailsById.fulfilled, (state, action) => {
                state.productDetailLoading = false;
                state.productDetails = action.payload;
            })
            .addCase(fetchGetProductDetailsById.rejected, (state, action) => {
                state.productDetailLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchGetProductReviewsById.pending, (state) => {
                state.productReviewsLoading = true;
                state.error = null;
            })
            .addCase(fetchGetProductReviewsById.fulfilled, (state, action) => {
                state.productReviewsLoading = false;
                state.productReviews = [
                    ...state.productReviews,
                    ...action.payload.reviews
                ].filter(
                    (review, index, self) =>
                        index === self.findIndex((r) => r.review_id === review.review_id)
                );
                state.hasMore = action.payload.hasMore;
            })
            .addCase(fetchGetProductReviewsById.rejected, (state, action) => {
                state.productReviewsLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchGetSimillarProducts.pending, (state) => {
                state.simillarProductsLoading = true;
                state.error = null;
            })
            .addCase(fetchGetSimillarProducts.fulfilled, (state, action) => {
                state.simillarProductsLoading = false;
                state.simillarProducts = action.payload;
            })
            .addCase(fetchGetSimillarProducts.rejected, (state, action) => {
                state.simillarProductsLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchSearchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.searchProducts = action.payload.products;
                //     [
                //     ...state.searchProducts,
                //     ...action.payload.products
                // ].filter(
                //     (product, index, self) =>
                //         index === self.findIndex((p) => p.id === product.id)
                // );
                state.hasMore = action.payload.hasMore;
            })
            .addCase(fetchSearchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAddToFavourites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAddToFavourites.fulfilled, (state, action) => {
                state.loading = false;
                state.isFavouriteProduct = true; // Set the isFavouriteProduct state to true
                state.favouriteProducts = [
                    ...state.favouriteProducts,
                    action.payload.product
                ].filter(
                    (product, index, self) =>
                        index === self.findIndex((p) => p.id === product.id)
                );


            })
            .addCase(fetchAddToFavourites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchGetFavouriteProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetFavouriteProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.favouriteProducts = action.payload.products;
                state.totalFavouriteProducts = action.payload.totalFavouriteProducts;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(fetchGetFavouriteProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchRemoveFromFavourites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRemoveFromFavourites.fulfilled, (state, action) => {
                state.loading = false;
                state.favouriteProducts = state.favouriteProducts.filter(
                    (product) => product.id !== action.payload?.id
                );
                state.isFavouriteProduct = false; // Reset the isFavouriteProduct state
            })
            .addCase(fetchRemoveFromFavourites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchIsFavourite.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIsFavourite.fulfilled, (state, action) => {
                state.loading = false;
                state.isFavouriteProduct = action.payload;

            })
            .addCase(fetchIsFavourite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    },
});

export const { resetNewArrivalProducts, resetProductReviews, setFilters,

} = productsSlice.actions;
export default productsSlice.reducer;
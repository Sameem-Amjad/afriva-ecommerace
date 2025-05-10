import { createSlice } from "@reduxjs/toolkit";

import { fetchHomeData, fetchBrandsImages, fetchNewArrivalProducts, fetchTopSellingsProducts } from "./homeThunk";

const initialState = {
    homeData: null,
    brandsImages: null,
    arrivalProducts: null,
    topSellingProducts: null,
    loading: false,
    error: null,
};

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {

        setHomeData: (state, action) => {
            state.homeData = action.payload;
        }
        ,
        setArrivalProducts: (state, action) => {
            state.arrivalProducts = action.payload;
        },
        setBrandsImages: (state, action) => {
            state.brandsImages = action.payload;
        },
        setTopSellingProducts: (state, action) => {
            state.topSellingProducts = action.payload;
        },
        clearHomeData: (state) => {
            state.homeData = null;
        },
        clearBrandsImages: (state) => {
            state.brandsImages = null;
        },
        clearArrivalProducts: (state) => {
            state.arrivalProducts = null;
        },
        clearTopSellingProducts: (state) => {
            state.topSellingProducts = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomeData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomeData.fulfilled, (state, action) => {
                state.loading = false;
                state.homeData = action.payload;
            })
            .addCase(fetchHomeData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchBrandsImages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBrandsImages.fulfilled, (state, action) => {
                state.loading = false;
                state.brandsImages = action.payload;
            })
            .addCase(fetchBrandsImages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchNewArrivalProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewArrivalProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.arrivalProducts = action.payload;
            })
            .addCase(fetchNewArrivalProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchTopSellingsProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchTopSellingsProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.topSellingProducts = action.payload;
            })
            .addCase(fetchTopSellingsProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setHomeData, clearHomeData, setLoading,
    setBrandsImages, clearBrandsImages, setArrivalProducts, clearArrivalProducts, setTopSellingProducts, clearTopSellingProducts } = homeSlice.actions;
export default homeSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { fetchFilteredProducts, fetchSubCategories, fetchPriceRangeByCategory, fetchColorsByCategory } from "./filterThunk";

const initialState = {
    subCategories: [],
    priceRange: [0, 10000],
    filters: {
        subCategory: null,
        priceRange: [0, 1000],
        color: null,
        sortBy: "latest",
        size: null,
        style: null,
    },
    colors: [],
    products: [],
    total: 0,
    currentPage: 1,
    totalPageCount: 0,

    loading: false,
    error: null,
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
            state.currentPage = 1;
        },
        setSubCategories: (state, action) => {
            state.subCategories = action.payload;
        },
        resetSubCategories: (state) => {
            state.subCategories = initialState.subCategories;
        }
        ,
        setPriceRange: (state, action) => {
            state.priceRange = action.payload;
        },
        resetPriceRange: (state) => {
            state.priceRange = initialState.priceRange;
        },
        setColors: (state, action) => {
            state.colors = action.payload;
        },
        resetColors: (state) => {
            state.colors = initialState.colors;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilteredProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.totalPageCount = action.payload.totalPageCount;
            })
            .addCase(fetchFilteredProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchSubCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.subCategories = action.payload;
            })
            .addCase(fetchSubCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchPriceRangeByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPriceRangeByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.priceRange = action.payload;
            })
            .addCase(fetchPriceRangeByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchColorsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchColorsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.colors = action.payload;
            })
            .addCase(fetchColorsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setFilters, setPage, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
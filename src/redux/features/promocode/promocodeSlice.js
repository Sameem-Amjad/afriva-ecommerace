import { createSlice } from "@reduxjs/toolkit";
import { fetchPromoCodeDiscount } from "./promocodeThunk";

const initialState = {
    promoCode: "",
    discount: 0,
    error: null,
    loading: false,
};

const promoCodeSlice = createSlice({
    name: "promocode",
    initialState,
    reducers: {
        setPromoCode: (state, action) => {
            state.promoCode = action.payload;
        },
        clearPromoCode: (state) => {
            state.promoCode = "";
            state.discount = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPromoCodeDiscount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPromoCodeDiscount.fulfilled, (state, action) => {
                state.loading = false;
                state.discount = action.payload;
            })
            .addCase(fetchPromoCodeDiscount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setPromoCode, clearPromoCode } = promoCodeSlice.actions;

export default promoCodeSlice.reducer;
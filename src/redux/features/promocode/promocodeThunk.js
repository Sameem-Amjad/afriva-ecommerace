import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPromoCodeDiscount } from "./promocodeDB";
export const fetchPromoCodeDiscount = createAsyncThunk(
    "promocode/fetchPromoCodeDiscount",
    async ({ promoCode, id }, { rejectWithValue }) => {
        try {
            const discount = await getPromoCodeDiscount(promoCode, id);
            return discount;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
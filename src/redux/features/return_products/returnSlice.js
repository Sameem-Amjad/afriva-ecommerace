import { createSlice } from "@reduxjs/toolkit";
import { addReturnRequestThunk, returnRequestDetailsThunk } from "./returnThunk";

const initialState = {
    returnRequest: {
        order_id: null,
        quantity: 1,
        reason: "",
        location_confirmation: "",
        refund_to: "debit_card",
        refund_amount: 0,
        created_by: null,
        images: [],
        details: "",
        comments: "",
    },
    loading: false,
    error: null,
};

const returnSlice = createSlice({
    name: "returnProducts",
    initialState,
    reducers: {
        setReturnRequestField: (state, action) => {
            const { field, value } = action.payload;
            state.returnRequest[field] = value;
        },
        addImage: (state, action) => {
            state.returnRequest.images.push(action.payload);
        },
        removeImage: (state, action) => {
            state.returnRequest.images = state.returnRequest.images.filter(
                (_, index) => index !== action.payload
            );
        },
        resetReturnRequest: (state) => {
            state.returnRequest = initialState.returnRequest;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addReturnRequestThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addReturnRequestThunk.fulfilled, (state) => {
                state.loading = false;
                state.returnRequest = initialState.returnRequest; // Reset the return request after submission
            })
            .addCase(addReturnRequestThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(returnRequestDetailsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(returnRequestDetailsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.returnRequest = action.payload; // Set the return request details
            })
            .addCase(returnRequestDetailsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setReturnRequestField, addImage, removeImage, resetReturnRequest } =
    returnSlice.actions;

export default returnSlice.reducer;
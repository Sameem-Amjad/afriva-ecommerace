import { createSlice } from "@reduxjs/toolkit";
import { addPaymentThunk, fetchPaymentMethodsThunk, addPaymentHistoryThunk, removePaymentMethodThunk,fetchPaymentHistoryThunk } from "./paymentThunk";

const initialState = {
    paymentData: {
        card_holder_name: "",
        type: "",
        card_no: "",
        expiry: "",
        cvc: "",
        created_by: null,
        isPrimary: false,
    },

    paymentMethods: [], // List of all payment methods
    loading: false,
    error: null,
    paymentHistory: {
        amount: 0,
        type: "",
        created_by: null
    },
    paymentHistoryList: [], // List of all payment history records
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setPaymentField: (state, action) => {
            const { field, value } = action.payload;
            state.paymentData[field] = value; // Update a specific field
        },
        resetPaymentMethod: (state) => {
            state.paymentData = initialState.paymentData; // Reset paymentData to initial state
        },
        setPaymentHistory: (state, action) => {
            const { field, value } = action.payload;
            state.paymentHistory[field] = value; // Update a specific field in paymentHistory
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addPaymentThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPaymentThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentMethods.push(action.payload); // Add the new payment method to the list
                state.paymentData = initialState.paymentData; // Reset paymentData
            })
            .addCase(addPaymentThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set the error message
            })

            .addCase(fetchPaymentMethodsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPaymentMethodsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentMethods = action.payload;
            })
            .addCase(fetchPaymentMethodsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(removePaymentMethodThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removePaymentMethodThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentMethods = state.paymentMethods.filter(
                    (method) => method.id !== action.payload.id
                ); // Remove the payment method from the list
            })
            .addCase(removePaymentMethodThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set the error message
            })
            .addCase(addPaymentHistoryThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPaymentHistoryThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentHistory = action.payload;
            })
            .addCase(addPaymentHistoryThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPaymentHistoryThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPaymentHistoryThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentHistoryList = action.payload; // Update the payment history list
            })
            .addCase(fetchPaymentHistoryThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set the error message
            });

    },
});

export const { setPaymentField, resetPaymentMethod, setPaymentHistory } = paymentSlice.actions;

export default paymentSlice.reducer;
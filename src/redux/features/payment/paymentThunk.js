import { createAsyncThunk } from "@reduxjs/toolkit";
import { addPaymentMethod, getPaymentMethods, removePaymentMethod, addPaymentHistory,getPaymentHistory } from "./paymentDB";

export const addPaymentThunk = createAsyncThunk(
    "payment/addPayment",
    async (_, { getState, rejectWithValue }) => {
        const { payment } = getState(); // Access the payment state
        const { paymentData } = payment;
        try {
            const response = await addPaymentMethod(paymentData); // Call the DB function
            return response[0]; // Return the inserted payment method
        } catch (error) {
            return rejectWithValue(error.message); // Handle errors
        }
    }
);

export const fetchPaymentMethodsThunk = createAsyncThunk(
    "payment/fetchPaymentMethods",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await getPaymentMethods(userId); // Call the DB function
            return response; // Return the fetched payment methods
        } catch (error) {
            return rejectWithValue(error.message); // Handle errors
        }
    }
);

export const removePaymentMethodThunk = createAsyncThunk(
    "payment/removePaymentMethod",
    async (id, { rejectWithValue }) => {
        try {
            const response = await removePaymentMethod(id); // Call the DB function
            return response; // Return the removed payment method
        } catch (error) {
            return rejectWithValue(error.message); // Handle errors
        }
    }
);

export const addPaymentHistoryThunk = createAsyncThunk(
    "payment/addPaymentHistory",
    async (_, { getState, rejectWithValue }) => {
        try {
            const { payment } = getState();
            const { paymentHistory } = payment; // Access the payment history from the state
            console.log("paymentHistory", paymentHistory);
            const response = await addPaymentHistory(paymentHistory); // Call the DB function
            return response; // Return the added payment history
        } catch (error) {
            return rejectWithValue(error.message); // Handle errors
        }
    }
);

export const fetchPaymentHistoryThunk = createAsyncThunk(
    "payment/fetchPaymentHistory",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await getPaymentHistory(userId); // Call the DB function
            return response; // Return the fetched payment history
        } catch (error) {
            return rejectWithValue(error.message); // Handle errors
        }
    }
);
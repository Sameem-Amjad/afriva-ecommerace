import { createAsyncThunk } from "@reduxjs/toolkit";
import { getActiveOrders, getCompletedOrders, placeOrders } from "./orderDB";

export const fetchActiveOrders = createAsyncThunk(
    "orders/fetchActiveOrders",
    async (userId, { rejectWithValue }) => {
        try {
            const orders = await getActiveOrders(userId);
            if (!orders) {
                throw new Error("Failed to fetch active orders");
            }
            return orders;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCompletedOrders = createAsyncThunk(
    "orders/fetchCompletedOrders",
    async (userId, { rejectWithValue }) => {
        try {
            const orders = await getCompletedOrders(userId);
            if (!orders) {
                throw new Error("Failed to fetch completed orders");
            }
            return orders;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const createNewOrder = createAsyncThunk(
    "orders/createNewOrder",
    async ({ userId, address, items, paymentMethod }, { rejectWithValue }) => {
        try {
            return await placeOrders({ userId, address, items, paymentMethod });
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

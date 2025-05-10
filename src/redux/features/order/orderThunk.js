import { createAsyncThunk } from "@reduxjs/toolkit";
import { getActiveOrders, getCompletedOrders, createOrder } from "./orderDB";

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
    async (_, { getState, rejectWithValue }) => {
        try {
            const { orderDetails } = getState().orders;
            const order = await createOrder(orderDetails);
            if (!order) {
                throw new Error("Failed to create order");
            }
            return order;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

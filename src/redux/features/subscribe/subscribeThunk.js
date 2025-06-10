import { createAsyncThunk } from "@reduxjs/toolkit";
import { subscribeUser } from "./subscribeDB";

export const subscribeThunk = createAsyncThunk(
    "subscribe/subscribeThunk",
    async (email, { rejectWithValue }) => {
        try {
            const response = await subscribeUser(email);

            if (!response) {
                throw new Error("Subscription failed");
            }
            // Pass through the alreadySubscribed flag and data
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
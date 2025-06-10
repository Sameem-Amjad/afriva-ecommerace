import { createSlice } from "@reduxjs/toolkit";
import { subscribeThunk } from "./subscribeThunk";

const initialState = {
    isLoading: false,
    error: null,
    success: false,
    alreadySubscribed: false,
    data: null,
    message: null,
};

const subscribeSlice = createSlice({
    name: "subscribe",
    initialState,
    reducers: {
        resetSubscribeState: (state) => {
            state.isLoading = false;
            state.error = null;
            state.success = false;
            state.alreadySubscribed = false;
            state.data = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(subscribeThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
                state.alreadySubscribed = false;
                state.data = null;
                state.message = null;
            })
            .addCase(subscribeThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data;
                state.alreadySubscribed = action.payload.alreadySubscribed;
                if (action.payload.alreadySubscribed) {
                    state.success = false;
                    state.message = "You are already subscribed.";
                } else {
                    state.success = true;
                    state.message = "Subscription successful!";
                }
            })
            .addCase(subscribeThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.success = false;
                state.message = null;
            });
    },
});

export const { resetSubscribeState } = subscribeSlice.actions;

export default subscribeSlice.reducer;
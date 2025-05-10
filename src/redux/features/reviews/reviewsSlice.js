import { createSlice } from "@reduxjs/toolkit";

import { fetchReviews, submitReview } from "./reviewsThunk";

const initialState = {
    reviews: [],
    status: "idle",
    error: null,
};

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        addReview: (state, action) => {
            state.reviews.push(action.payload);
        },
        removeReview: (state, action) => {
            state.reviews = state.reviews.filter(
                (review) => review.id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(submitReview.rejected,
                (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message;
                }

            )
            .addCase(submitReview.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.reviews.push(action.payload);
            })
            .addCase(submitReview.pending, (state) => {
                state.status = "loading";
            });
    },
});

export const { addReview, removeReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
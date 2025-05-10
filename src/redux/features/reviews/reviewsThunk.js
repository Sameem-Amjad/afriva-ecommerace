import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAllReviews, giveReview } from "./reviewsDB";
import { uploadImage } from "../auth/authDB";
export const fetchReviews = createAsyncThunk(
    "reviews/fetchReviews",
    async (thunkAPI) => {
        try {
            const reviews = await getAllReviews();
            return reviews;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);




export const submitReview = createAsyncThunk(
    "reviews/submitReview",
    async ({ rating, description, orderId, productId, images, reviewer_name, review_by }, thunkAPI) => {
        try {
            // console.log("images", images[0])


            const response = await giveReview(
                rating,
                description,
                orderId,
                productId,
                images,
                reviewer_name,
                review_by
            );

            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
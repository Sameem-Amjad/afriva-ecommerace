import { createAsyncThunk } from "@reduxjs/toolkit";
import { addReturnRequest, returnRequestDetails } from "./returnProductDB";

export const addReturnRequestThunk = createAsyncThunk(
    "returnProducts/addReturnRequest",
    async (_, { getState, rejectWithValue }) => {
        const { returnRequest } = getState().returnRequests;
        // console.log("Return Request Data:", returnRequest); // Log the return request data
        try {
            const response = await addReturnRequest(returnRequest);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const returnRequestDetailsThunk = createAsyncThunk(
    "returnProducts/returnRequestDetails",
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await returnRequestDetails(orderId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
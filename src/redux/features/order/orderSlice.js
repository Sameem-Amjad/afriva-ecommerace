import { createSlice } from "@reduxjs/toolkit";
import { fetchActiveOrders, fetchCompletedOrders, createNewOrder } from "./orderThunk";

const initialState = {
    activeOrders: [],
    completedOrders: [],
    orderDetails: {
        order_id: null,
        product_ids: [],
        status: 'pending',
        quantity: 0,
        user_delivery_address: {

        },
        payment_method: 'credit_card',
        total_amount: 0,
        delivery_charge: 0,
        subtotal: 0,
        total: 0,
        created_by: null,
        selected_size_details:{
            qty: 0,
            size: "",
            color: "", 
            color_code: ""
        },
        created_at: new Date(),
        updated_at: new Date(),
    },
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        clearOrders: (state) => {
            state.activeOrders = [];
            state.completedOrders = [];
        },
        setOrderDetails: (state, action) => {
          const { field, value } = action.payload;
          const keys = field.split(".");
          let obj = state.orderDetails;
          for (let i = 0; i < keys.length - 1; i++) {
            if (!obj[keys[i]]) obj[keys[i]] = {};
            obj = obj[keys[i]];
          }
          obj[keys[keys.length - 1]] = value;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActiveOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchActiveOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.activeOrders = action.payload;
            })
            .addCase(fetchActiveOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCompletedOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompletedOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.completedOrders = action.payload;
            })
            .addCase(fetchCompletedOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createNewOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetails = initialState.orderDetails; // Reset order details after creation
            })
            .addCase(createNewOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const { clearOrders,

    setOrderDetails

} = orderSlice.actions;

export default orderSlice.reducer;
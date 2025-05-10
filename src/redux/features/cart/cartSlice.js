import { createSlice } from "@reduxjs/toolkit";
import { addToCartThunk, getCartItemsThunk, updateCartItemThunk, removeCartItemThunk } from "./cartThunk";

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
    error: null,
    loading: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === itemId);
            if (existingItem) {
                state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.price * existingItem.quantity;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCartThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCartThunk.fulfilled, (state, action) => {
                const { productId, quantity, selectedSize, selectedColor } = action.payload;
                const existingItem = state.cartItems.find((item) => item.productId === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor);

                if (existingItem) {
                    existingItem.quantity += quantity;
                }
                else {
                    state.cartItems.push({
                        productId,
                        quantity,
                        selectedSize,
                        selectedColor,
                    });
                }
                state.totalQuantity += quantity;
                state.totalPrice += action.payload.price * quantity; // Assuming price is part of the payload

                state.loading = false;
                state.error = null;
            })
            .addCase(addToCartThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getCartItemsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCartItemsThunk.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
                state.totalPrice = action.payload.reduce((total, item) => total + item.price * item.quantity, 0);
                state.loading = false;
                state.error = null;
            })
            .addCase(getCartItemsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCartItemThunk.fulfilled, (state, action) => {
                const updatedItem = action.payload;
                const existingItem = state.cartItems.find((item) => item.cart_id === updatedItem.cart_id);

                if (existingItem) {
                    existingItem.quantity = updatedItem.quantity;
                }

                state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
                state.totalPrice = state.cartItems.reduce((total, item) => total + item.products.price * item.quantity, 0);
            })
            .addCase(removeCartItemThunk.fulfilled, (state, action) => {
                const cartId = action.payload;
                state.cartItems = state.cartItems.filter((item) => item.cart_id !== cartId);

                state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
                state.totalPrice = state.cartItems.reduce((total, item) => total + item.products.price * item.quantity, 0);
            });
    },
});

export const { clearCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;

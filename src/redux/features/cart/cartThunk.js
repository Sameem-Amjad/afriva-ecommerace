import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart, getCartItems, removeCartItem, updateCartItem, checkQuantity } from "./cartDB";

export const addToCartThunk = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, productId, quantity, selectedSize, selectedColor }, { rejectWithValue }) => {
        try {
            const cartItem = await addToCart(userId, productId, quantity, selectedSize, selectedColor);
            return cartItem;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getCartItemsThunk = createAsyncThunk(
    "cart/getCartItems",
    async (userId, { rejectWithValue }) => {
        try {
            const cartItems = await getCartItems(userId);
            return cartItems;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateCartItemThunk = createAsyncThunk(
    "cart/updateCartItem",
    async ({ cartId, quantity }, { rejectWithValue }) => {
        try {
            const updatedItem = await updateCartItem(cartId, quantity);
            return updatedItem;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeCartItemThunk = createAsyncThunk(
    "cart/removeCartItem",
    async (cartId, { rejectWithValue }) => {
        try {
            await removeCartItem(cartId);
            return cartId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const checkQuantityThunk = createAsyncThunk(
    "cart/checkQuantity",
    async ({ productId, selectedSize, selectedColor, quantity }, { rejectWithValue }) => {
        try {
            const availableQuantity = await checkQuantity(productId, selectedSize, selectedColor, quantity);
            return availableQuantity;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
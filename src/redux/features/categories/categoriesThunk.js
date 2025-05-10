import { createAsyncThunk } from "@reduxjs/toolkit";

import { getCategories } from "./categoriesDB";

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
        try {
            const data = await getCategories();
            return data;
        } catch (error) {
            throw new Error("Failed to fetch categories: " + error.message);
        }
    }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    signUp,
    signIn,
    signOut,
    addUser,
    getBuyerById,
    updateUser,
    uploadImage,
    reAuthenticateUser,
    updatePassword,
    logoutUser,
    deleteUser,
    signUpVerifyOtp,
    forgotPassword,
    verifyCode
} from "./authDB";
import { supabase } from "../../../../supabase";


export const signUpConfirmOtp = createAsyncThunk(
    "auth/signUpConfirmOtp",
    async (_, {getState, rejectWithValue }) => {
        try {
            const {users}= getState();
            const {registerFormData} = users;
            const response = await signUp(registerFormData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const verifyOtp = createAsyncThunk(
    "auth/verifyOtp",
    async (_, {getState, rejectWithValue }) => {
        try {
            const {users}= getState();
            const {registerFormData} = users;
            const {email,otp} = registerFormData
            const response = await signUpVerifyOtp(email, otp);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


// Thunk to sign up a new user
export const signUpUser = createAsyncThunk(
    "auth/signUpUser",
    async (_, {getState, rejectWithValue }) => {
        try {
            const {users}= getState();
            const {registerFormData} = users;
            const newUser = await addUser(registerFormData);
            return newUser;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to sign in an existing user
export const signInUser = createAsyncThunk(
    "auth/signInUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const user = await signIn(email, password);
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to sign out the current user
export const signOutUser = createAsyncThunk(
    "auth/signOutUser",
    async (_, { rejectWithValue }) => {
        try {
            await signOut();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchBuyerById = createAsyncThunk(
    "user/fetchBuyerById",
    async (userId, { rejectWithValue }) => {
        try {
            // console.log("sameem")
            const user = await getBuyerById(userId);
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    "auth/updateUserProfile",
    async ({ userId, userData, profilePicture }, { rejectWithValue }) => {
        try {
            let imageUrl = userData.imageUrl;
            if (profilePicture) {
                const imagePath = `${userId}_${new Date().toISOString()}.jpg`;
                imageUrl = await uploadImage(profilePicture, "profile_images", imagePath);
            }

            let updatedUser = await updateUser(userId, { ...userData, imageUrl });
            let buyer = {}
            if (userId) {
                // console.log("sameem1")
                buyer = await getBuyerById(userId);
            }
            return { updatedUser, buyer };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const reAuthenticate = createAsyncThunk(
    "auth/reAuthenticate",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const user = await reAuthenticateUser(email, password);
            // console.log("user", user)
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserPassword = createAsyncThunk(
    "auth/updateUserPassword",
    async ({ email, newPassword }, { rejectWithValue }) => {
        try {
            let { success, user, buyer } = await updatePassword(email, newPassword);

            return { success, user, buyer };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await logoutUser();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteAccount = createAsyncThunk(
    "auth/deleteAccount",
    async (userId, { rejectWithValue }) => {
        try {
            await deleteUser(userId);
            await supabase.auth.signOut();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const sendForgotPasswordEmail = createAsyncThunk(
    "auth/sendForgotPasswordEmail",
    async ({email}, { rejectWithValue }) => {
        try {
            const response = await forgotPassword(email);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);  

export const verifyCodeForForgotPassword = createAsyncThunk(
    "auth/verifyCodeForForgotPassword",
    async ({email, code}, { rejectWithValue }) => {
        try {
            const response = await verifyCode(email, code);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
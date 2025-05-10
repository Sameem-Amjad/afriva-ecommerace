import { createSlice } from "@reduxjs/toolkit";
import {
    signUpUser,
    signInUser,
    signOutUser,
    fetchBuyerById,
    updateUserProfile,
    reAuthenticate,
    updateUserPassword,
    logout,
    deleteAccount,
    verifyOtp,
    signUpConfirmOtp
} from "./authThunk";
import { signUp } from "./authDB";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        buyers: null,
        loading: false,
        error: null,
        userData: {
            name: null,
            imageUrl: null,
            phoneNumber: null
        },
        registerFormData:{
            uid: null,
            name: null,
            email: null,
            profile_image: null,
            address: null,
            latitude: null,
            longitude: null,
            provider:"non-social",
            password: null,
            confirmPassword: null,
            otp: null,
            accounttype: null,
            country: null,
            countryid: null,
            username: null,
            phonenumber: null,
            isactive:true,
            authid: null,
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;

        },
        setRegisterFormData: (state, action) => {
            const { field, value } = action.payload;
            state.registerFormData[field] = value;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signOutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signOutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(signOutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchBuyerById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBuyerById.fulfilled, (state, action) => {
                state.loading = false;
                state.buyers = action.payload;
            })
            .addCase(fetchBuyerById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload.updatedUser;
                state.buyers = action.payload.buyer;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(reAuthenticate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(reAuthenticate.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(reAuthenticate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action?.payload?.user;
                state.buyers = action?.payload?.buyer
            })
            .addCase(updateUserPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.buyers = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAccount.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.buyers = null;
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signUpConfirmOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUpConfirmOtp.fulfilled, (state, action) => {
                state.loading = false;
             })
            .addCase(signUpConfirmOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const { setUser, clearUser, setLoading, setUserData ,setRegisterFormData} = authSlice.actions;
export default authSlice.reducer;

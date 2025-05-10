import { supabase } from "../../../../supabase";

export const signUp = async (registerFormData) => {
    try {
        const { email, password } = registerFormData;
        console.log(email, password);
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/email-verification`,
            }
        });
        if (error) {
            console.error("Error signing up: ", error);
            throw error;
        }
        // return user;
    } catch (error) {
        console.error("Error signing up: ", error);
        throw error;
    }
};

export const signUpVerifyOtp = async (email, otp) => {
    try {
        const { data, error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: "signup",
        });
        if (error) {
            console.error("Error verifying OTP: ", error);
            throw error;
        }
        if (data?.user?.id) {
            await supabase.auth.signOut();
        }
        return data;
    } catch (error) {

        console.error("Error verifying OTP: ", error);
        throw error;
    }
};


export const signIn = async (email, password) => {
    try {
        // console.log(email, password);

        const response = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        // console.log("User: ", response);
        if (response.error) {
            throw response.error;
        }
        // console.log("User: ", response.data.user);
        return response.data.user;
    } catch (error) {
        console.error("Error signing in: ", error.message);
        throw error;
    }
};

// Function to sign out the current user
export const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    } catch (error) {
        console.error("Error signing out: ", error);
        throw error;
    }
};


function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

export const addUser = async (registerFormData) => {
    try {
        let { uid, name, email, profile_image, address, latitude, longitude, provider, password,  accounttype, country, countryid, username, phonenumber } = registerFormData;
        const { data: userData, error: userError } = await supabase.auth.signUp({
            email,
            password
        })
        if (userError) {
            console.error("Error signing in: ", userError.message);
            throw userError;
        }
        uid = userData?.user?.id;
        const { data, error } = await supabase.from("users").insert([
            {
                uid,
                name,
                email,
                profile_image,
                address: address || "",
                latitude: latitude ?? null,
                longitude: longitude ?? null,
                provider,
                accounttype,
                country,
                countryid,
                username,
                authid: uid,
                phonenumber,
                isactive: true,
                createdby: uid,
                updatedby: uid,
                createdat: new Date().toISOString(),
                updatedat: new Date().toISOString(),
                device_token: null,
                full_address: {},
                favorite_products: []
            }
        ]);
        if (error) {
            console.error("Error adding user to 'users' table: ", error.message);
            throw error;
        }

        const { data: addressData, error: addressError } = await supabase
            .from("address")
            .insert([
                {
                    user_id: uid,
                    address: address || "",
                    country: country || "",
                    city: "", // or registerFormData.city if available
                    name: name,
                    phone_number: phonenumber,
                    is_primary: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            ]);
        if (addressError) {
            console.error("Error adding address to 'address' table: ", addressError.message);
            throw addressError;
        }

        return data;
    } catch (error) {
        console.error("Error adding user: ", error);
        throw error;
    }
};

export const getBuyerById = async (userId) => {
    try {

        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("uid", userId)
            .single();

        const { data: addressData, error: addressError } = await supabase
            .from("address")
            .select("*")
            .eq("user_id", userId).single();

        if (addressError) {
            throw addressError;
        }

        data["addressData"] = addressData;
        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        // console.error("Error getting user: ", error);
        throw error;
    }
};

export const uploadImage = async (file, bucketName, path) => {
    try {
        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(path, file, { upsert: true });

        if (error) {
            throw error;
        }

        const { data: imageData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(path);
        return imageData?.publicUrl;
    } catch (error) {
        console.error("Error uploading image: ", error);
        throw error;
    }
};

export const updateUser = async (userId, userData) => {
    try {
        // console.log(userData)
        const { data, error } = await supabase
            .from("users")
            .update({
                name: userData?.name, username: userData?.name, profile_image: userData?.imageUrl,
                phonenumber: userData?.phoneNumber
            })
            .eq("uid", userId);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Error updating user: ", error);
        throw error;
    }
}

export const reAuthenticateUser = async (email, oldPassword) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: oldPassword
    });
    if (error) {
        console.error('Old password incorrect:', error.message);
        return { success: false, error };
    }

    return { success: true, session: data.session };
};

export const updatePassword = async (email, newPassword) => {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
        console.error('Error updating password:', error.message);
        return { success: false, error };
    }
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: newPassword,
    });
    let buyer = await getBuyerById(signInData?.user?.id);
    if (signInError) {
        return { success: false, error: signInError };
    }
    return { success: true, user: signInData, buyer };
}

export const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error signing out:', error.message);
        return { success: false, error };
    }
    return { success: true };
}

export const deleteUser = async (userId) => {
    try {
        const { error } = await supabase.auth.admin.deleteUser(userId);
        if (error) {
            throw error;
        }
        const { error: updateError } = await supabase
            .from("users")
            .update({ isactive: false })
            .eq("uid", userId);

        if (updateError) {
            throw updateError;
        }

        return true;
    } catch (error) {
        console.error("Error deleting user: ", error);
        throw error;
    }
}
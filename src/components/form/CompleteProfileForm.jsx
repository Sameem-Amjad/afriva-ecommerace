"use client";

import React from "react";
import TextField from "../fields/TextField";
import CommonButton from "../buttons/CommonButton";
import { useRouter } from "next/navigation";
import ProfilePicker from "../fields/ProfilePicker";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterFormData } from "@/redux/features/auth/authSlice";
import { signUpUser } from "@/redux/features/auth/authThunk";
import { toast } from "sonner";

const CompleteProfileForm = () => {
  const dispatch = useDispatch();
  const {registerFormData,loading} = useSelector((state) => state.users);
  const router = useRouter();
  const [profile, setProfile] = React.useState(null);
  const [name, setName] = React.useState(registerFormData?.name || "");
  const [number, setNumber] = React.useState(registerFormData?.phonenumber || "");
  const [profileUrl,setProfileUrl] = React.useState(registerFormData?.profile_image || "");
  const [address, setAddress] = React.useState(registerFormData?.address || "");
  
  const handleComplete =async () => {
    if(name && number && profileUrl && address){
      dispatch(setRegisterFormData({field:"username", value: name}));
      dispatch(setRegisterFormData({field:"name", value: name}));
      dispatch(setRegisterFormData({field:"phonenumber", value: number}));
      dispatch(setRegisterFormData({field:"profile_image", value: profileUrl}));
      dispatch(setRegisterFormData({field:"address", value: address}));
      const response=await dispatch(signUpUser())
      if(response?.error){
        toast.error("Error completing profile, please try again later")
        return;
      }
      toast.success("Profile completed successfully");
      // router.push("/success");
      return;
    }else{
      toast.error("Please fill in all fields");
      router.push("/signup");
    }

  };

  return (
    <div className="flex flex-col mt-5 gap-y-5">
      <div className="w-full justify-center flex">
        <ProfilePicker setProfile={setProfile} profile={profile}  setProfileUrl={setProfileUrl}/>
      </div>
      <TextField
        label="User name"
        name="User name"
        placeholder="Enter user name"
        text={name}
        setText={(e) => setName(e.target.value)}
      />

      <TextField
        label="Phone number"
        name="Phone number"
        placeholder="Enter phone number"
        text={number}
        setText={(e) => setNumber(e.target.value)}
      />
      
      <TextField
        label="Address"
        name="Address"
        placeholder="Enter Address"
        text={address}
        type="location"
        setText={(e) => setAddress(e.target.value)}
      />

      <CommonButton
        type="submit"
        label="Complete"
        className="py-3 mt-6 text-base "
        disabled={loading}
        onClick={handleComplete}
      />
    </div>
  );
};

export default CompleteProfileForm;

"use client";
import React from "react";
import EmailField from "../fields/EmailField";
import PasswordField from "../fields/PasswordField";
import Link from "next/link";
import CommonButton from "../buttons/CommonButton";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterFormData } from "@/redux/features/auth/authSlice";
import { signUpConfirmOtp } from "@/redux/features/auth/authThunk";
import { toast } from "sonner";
const SignupForm = () => {
  const router = useRouter();
  const dispatch = useDispatch(); 
  const {registerFormData,loading} = useSelector((state) => state.users);

  const onSubmit = () => {
    if( registerFormData?.email === "" || registerFormData?.email === null || registerFormData?.password === "" || registerFormData?.password === null || registerFormData?.confirmPassword === "" || registerFormData?.confirmPassword === null){
      toast.error("Please fill all the fields")
      return;
    }

    if(registerFormData?.password !== registerFormData?.confirmPassword){
      toast.error("Password and Confirm Password do not match")
      return;
      }
    // dispatch(signUpConfirmOtp())
    // toast.success("Check your email for the verification Otp" )
    router.push("/setup-profile");
  };

  const handleInputChange = (field,value) => {
    dispatch(setRegisterFormData({ field, value }));
  };


  return (
    <div className="flex flex-col mt-5 gap-y-4">
      <EmailField
        label="Email"
        name="email"
        placeholder="Enter email"
        email={registerFormData?.email || ""}
        setEmail={(e) => handleInputChange("email", e.target.value)}
      />

      <PasswordField
        label="Password"
        name="password"
        placeholder="Enter password"
        password={registerFormData?.password || ""}
        setPassword={(e) => handleInputChange("password", e.target.value)}
      />

      <PasswordField
        label="Confirm Password"
        name="password"
        placeholder="Enter password"
        password={registerFormData?.confirmPassword || ""}
        setPassword={(e) => handleInputChange("confirmPassword", e.target.value)}
      />

      <CommonButton
        onClick={onSubmit}
        type="submit"
        label="Continue"
        className="py-3 text-base "
        disabled={loading}
      />

      <div className="flex flex-row justify-center gap-x-2">
        <p className="text-secondaryText">
          I already have an account!
          <Link
            href="/login"
            className="cursor-pointer font-medium transition-opacity duration-300 ease-in hover:opacity-75 ml-1"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;

"use client";
import React, { useState } from "react";
import EmailField from "../fields/EmailField";
import PasswordField from "../fields/PasswordField";
import Link from "next/link";
import CommonButton from "../buttons/CommonButton";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterFormData } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import axios from "axios";
const SignupForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { registerFormData } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    if (!registerFormData?.email || !registerFormData?.password || !registerFormData?.confirmPassword) {
      toast.error("Please fill all the fields")
      return;
    }
    if (registerFormData.password.length < 8) {
      toast.error("Use at least 8 characters for your password")
      return;
    }
    if (registerFormData?.password !== registerFormData?.confirmPassword) {
      toast.error("Password and Confirm Password do not match")
      return;
    }
    setLoading(true);
    axios.post(`/api/send-otp`, { email: registerFormData?.email, purpose: "signup" }).then((res) => {
      setLoading(false);
      dispatch(setRegisterFormData({ field: "demoCode", value: res.data.demoCode || "" }));
      toast.success(res.data.demoCode ? `Demo mode: your code is ${res.data.demoCode}` : "We sent a code to your email", { duration: 8000 });
      router.push("/email-verification");
    })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Couldn't send a code, try again");
        setLoading(false);
      });
  };

  const handleInputChange = (field, value) => {
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
        label={loading ? "loading..." : "Continue"}
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

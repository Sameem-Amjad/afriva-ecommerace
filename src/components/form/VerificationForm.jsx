"use client";
import React, { useState } from "react";
import EmailField from "../fields/EmailField";
import Link from "next/link";
import CommonButton from "../buttons/CommonButton";
import { useRouter } from "next/navigation";
import EnterCode from "../fields/EnterCode";
import { backArrow } from "@/utils/Svgs";
import { useDispatch, useSelector } from "react-redux";
import { signUpConfirmOtp, verifyOtp } from "@/redux/features/auth/authThunk";
import { toast } from "sonner";
import { setRegisterFormData } from "@/redux/features/auth/authSlice";
import axios from "axios";

const VerificationForm = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const { registerFormData } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [reset, setReset] = useState(false);
  const onSubmit = (code) => {
    if (!registerFormData?.email || !code) {
      toast.error("Please enter your email and OTP");
      return;
    }
    axios.post(`/api/verify-otp`, { email: registerFormData?.email, otp: registerFormData?.otp || code }, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.data.success) {
          toast.success("OTP verified successfully");
          setLoading(false);
          router.push("/setup-profile");

        } else {
          setLoading(false);
          toast.error("Invalid OTP, please try again");
        }
      })
      .catch((err) => {
        console.error(err); // log for debugging
        setLoading(false);
        toast.error(err?.response?.data?.message || err?.response?.data?.error || "Something went wrong");
      });
  };

  const handleResend = () => {
    dispatch(signUpConfirmOtp())
    toast.success("Otp resent successfully")
    setReset((prev) => !prev);
  };

  const handleCodeSubmit = () => {
    setLoading(true);
    dispatch(setRegisterFormData(
      { ...registerFormData, otp: code }
    ))
    if (!registerFormData?.email || !code) {
      toast.error("Please enter your email and OTP");
      return;
    }
    // axios.post(`/api/verify-otp`, { email: registerFormData?.email, otp: code }, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     if (res.data.success) {
    //       toast.success("OTP verified successfully");
    //       router.push("/setup-profile");
    //     } else {
    //       toast.error("Invalid OTP, please try again");
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err); // log for debugging
    //     toast.error(err?.response?.data?.message || err?.response?.data?.error || "Something went wrong");
    //   });
    onSubmit(code);
  };

  return (
    <div className="flex flex-col mt-5 gap-y-8">
      <p className="text-base text-secondaryText">
        We sent a verification codes to{" "}
        <span className="font-medium">{registerFormData?.email || "your email"}</span>
      </p>
      <EnterCode callback={handleCodeSubmit} reset={reset} code={code} setCode={
        setCode
      } />
      <CommonButton
        onClick={handleCodeSubmit}
        type="submit"
        label={loading ? "loading..." : "Continue"}
        className="py-3 text-base "
        disabled={loading}
      />

      <div className="flex flex-row justify-center gap-x-2">
        <p className="text-secondaryText">
          Didn’t receive the email?
          <span
            onClick={handleResend}
            className="cursor-pointer font-medium transition-opacity duration-300 ease-in hover:opacity-75 ml-1"
          >
            Click to resend
          </span>
        </p>
      </div>
      <div className="flex flex-row justify-center gap-x-2">
        <Link
          href="/login"
          className="cursor-pointer font-medium transition-opacity duration-300 ease-in hover:opacity-75 ml-1 text-secondaryText flex flex-row items-center gap-x-3"
        >
          {backArrow}
          Back to log in
        </Link>
      </div>
    </div>
  );
};

export default VerificationForm;

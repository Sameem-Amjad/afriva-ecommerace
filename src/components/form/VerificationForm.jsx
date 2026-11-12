"use client";
import React, { useState } from "react";
import EmailField from "../fields/EmailField";
import Link from "next/link";
import CommonButton from "../buttons/CommonButton";
import { useRouter } from "next/navigation";
import EnterCode from "../fields/EnterCode";
import { backArrow } from "@/utils/Svgs";
import { useDispatch, useSelector } from "react-redux";
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
    axios.post(`/api/verify-otp`, { email: registerFormData?.email, otp: code || registerFormData?.otp, purpose: "signup" }, {
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
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  };

  const handleResend = () => {
    axios.post(`/api/send-otp`, { email: registerFormData?.email, purpose: "signup" })
      .then((res) => {
        dispatch(setRegisterFormData({ field: "demoCode", value: res.data.demoCode || "" }));
        toast.success(res.data.demoCode ? `Demo mode: your new code is ${res.data.demoCode}` : "We sent a new code");
        setReset((prev) => !prev);
      })
      .catch((err) => toast.error(err?.response?.data?.message || "Couldn't send a new code"));
  };

  const handleCodeSubmit = () => {
    if (!registerFormData?.email || !code) {
      toast.error("Please enter your email and OTP");
      return;
    }
    setLoading(true);
    dispatch(setRegisterFormData({ field: "otp", value: code }));
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
      {registerFormData?.demoCode ? (
        <p role="status" className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
          Demo mode: no email is sent. Your code is <span className="font-semibold tracking-widest">{registerFormData.demoCode}</span>
        </p>
      ) : null}
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
          <button
            type="button"
            onClick={handleResend}
            className="cursor-pointer font-medium transition-opacity duration-300 ease-in hover:opacity-75 ml-1"
          >
            Click to resend
          </button>
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

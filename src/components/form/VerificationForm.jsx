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

const VerificationForm = () => {
  const router = useRouter();
  const {registerFormData,loading} = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [reset, setReset] = useState(false);
  const onSubmit = () => {
    router.push("/setup-profile");
  };

  const handleResend = () => {
    dispatch(signUpConfirmOtp())
    toast.success("Otp resent successfully")
    setReset((prev) => !prev);
  };

  const handleCodeSubmit =async (code) => {
    dispatch(setRegisterFormData({field:"otp",value:code}));
    const response = await dispatch(verifyOtp());
    if(response.error){
      toast.error("Invalid Otp")
      return;
    }
    toast.success("Otp verified successfully")
    router.push("/setup-profile");
  };

  return (
    <div className="flex flex-col mt-5 gap-y-8">
      <p className="text-base text-secondaryText">
        We sent a verification codes to{" "}
        <span className="font-medium">{registerFormData?.email || "your email"}</span>
      </p>
      <EnterCode callback={handleCodeSubmit} reset={reset} />
      <CommonButton
        onClick={onSubmit}
        type="submit"
        label="Continue"
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

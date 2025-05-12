import CommonButton from "@/components/buttons/CommonButton";
import { verifyCodeForForgotPassword } from "@/redux/features/auth/authThunk";
import { backArrow, emailIcon } from "@/utils/Svgs";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Step2 = ({ step, setStep ,email}) => {
  const {loading} = useSelector((state) => state.users);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const dispatch = useDispatch();

  const handleNext =async  () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      toast.error("Please enter a valid OTP");
      return;
    }
    const response = await dispatch(verifyCodeForForgotPassword({ email,code:otpValue }));
    if (response.error) {
      toast.error(response.error);
    } else {
        toast.success("OTP verified successfully");
        toast.success(step);
        setStep(step + 1);
      }
  };

  const handleResend = () => {
    console.log("Resend email");
  };

  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (value && idx < 5) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 flex justify-center items-center rounded-full border-successButton border bg-white shadow-successShadow mb-6">
        {emailIcon}
      </div>
      <h1 className="font-semibold text-4xl pb-3 text-center">
        Check your email
      </h1>
      <p className="text-base text-text text-center">
        Enter the OTP below to verify your email {email}.
      </p>

      {/* OTP Input */}
      <div className="flex gap-2 mt-8 mb-2">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={el => (inputsRef.current[idx] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(e, idx)}
            onKeyDown={e => handleKeyDown(e, idx)}
            className="w-12 h-12 text-center border rounded text-2xl outline-none focus:border-primary"
          />
        ))}
      </div>

      <div className="w-full mt-4">
        <CommonButton
          type="submit"
          label="Got it"
          className="py-3 mt-6 text-base "
          disabled={loading }
          onClick={handleNext}
        />
      </div>

      <div className="flex flex-row justify-center gap-x-2 mt-8">
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

      <div className="flex flex-row justify-center gap-x-2 mt-8">
        <Link
          href="/login"
          className="cursor-pointer transition-opacity duration-300 ease-in hover:opacity-75 ml-1 text-secondaryText flex flex-row items-center gap-x-3 font-semibold"
        >
          {backArrow}
          Back to log in
        </Link>
      </div>

      <div className="flex flex-row gap-x-4 mt-20">
        <div className="w-3 h-3 rounded-full bg-grayColor"></div>
        <div className="w-3 h-3 rounded-full bg-forgot-gradient"></div>
        <div className="w-3 h-3 rounded-full bg-grayColor"></div>
        <div className="w-3 h-3 rounded-full bg-grayColor"></div>
      </div>
    </div>
  );
};

export default Step2;

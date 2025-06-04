import CommonButton from "@/components/buttons/CommonButton";
import { backArrow, emailIcon, successIcon } from "@/utils/Svgs";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const Step2 = ({ step, setStep, email }) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const handleNext = () => {
    if (otp.length < 4) {
      toast.warning("Please enter a valid OTP");
      setLoading(false)
      return;
    }
    if (!email || !otp) {
      toast.error("Please enter your email and OTP");
      setLoading(false)
      return;
    }
    setLoading(true);
    axios.post(`/api/verify-otp`, { email: email, otp: otp }, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          toast.success("OTP verified successfully");
          setStep(step + 1);
        } else {
          toast.error("Invalid OTP, please try again");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(email, otp)
        console.error(err); // log for debugging
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  };

  const handleResend = () => {
    console.log("Resend email");
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
        Enter otp which is send to {email}
      </p>
      <div className="flex justify-center gap-3 mt-8">
        {[0, 1, 2, 3].map((i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="w-12 h-12 text-center border border-gray-300 rounded text-2xl focus:outline-none focus:border-primary"
            value={otp[i] || ""}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, "");
              if (!val) return;
              const newOtp = otp.split("");
              newOtp[i] = val;
              setOtp(newOtp.join("").slice(0, 4));
              // Move to next input if exists
              const next = document.getElementById(`otp-input-${i + 1}`);
              if (next && val) next.focus();
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                const newOtp = otp.split("");
                if (otp[i]) {
                  // Remove current character
                  newOtp[i] = "";
                  setOtp(newOtp.join(""));
                } else if (i > 0) {
                  // Move focus to previous input
                  const prev = document.getElementById(`otp-input-${i - 1}`);
                  if (prev) {
                    prev.focus();
                    newOtp[i - 1] = "";
                    setOtp(newOtp.join(""));
                  }
                }
              }
            }}

            id={`otp-input-${i}`}
            autoFocus={i === 0}
          />
        ))}
      </div>


      <div className="w-full mt-8">
        <CommonButton
          type="submit"
          label="Got it"
          className="py-3 mt-6 text-base "
          disabled={loading}
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

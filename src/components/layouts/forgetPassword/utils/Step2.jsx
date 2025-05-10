import CommonButton from "@/components/buttons/CommonButton";
import EmailField from "@/components/fields/EmailField";
import { backArrow, emailIcon, successIcon } from "@/utils/Svgs";
import Link from "next/link";
import React, { useState } from "react";

const Step2 = ({ step, setStep }) => {
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setStep(step + 1);
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
        We sent a password reset link to olivia@smartdelivery.com
      </p>

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

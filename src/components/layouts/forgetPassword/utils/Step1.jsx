import CommonButton from "@/components/buttons/CommonButton";
import EmailField from "@/components/fields/EmailField";
import { backArrow, successIcon } from "@/utils/Svgs";
import Link from "next/link";
import React, { useState } from "react";

const Step1 = ({ step, setStep }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 flex justify-center items-center rounded-full border-successButton border bg-white shadow-successShadow mb-6">
        {successIcon}
      </div>
      <h1 className="font-semibold text-4xl pb-3 text-center">
        Forgot password?
      </h1>
      <p className="text-base text-text text-center">
        No worries, we’ll send you reset instructions.
      </p>

      <div className="w-full mt-8">
        <EmailField
          label="Email"
          name="email"
          placeholder="Enter email"
          email={email}
          setEmail={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="w-full mt-8">
        <CommonButton
          type="submit"
          label="Reset password"
          className="py-3 mt-6 text-base "
          disabled={loading}
          onClick={handleNext}
        />
      </div>

      <div className="flex flex-row justify-center gap-x-2 mt-8">
        <Link
          href="/login"
          className="cursor-pointer font-semibold transition-opacity duration-300 ease-in hover:opacity-75 ml-1 text-secondaryText flex flex-row items-center gap-x-3"
        >
          {backArrow}
          Back to log in
        </Link>
      </div>

      <div className="flex flex-row gap-x-4 mt-20">
        <div className="w-3 h-3 rounded-full bg-forgot-gradient"></div>
        <div className="w-3 h-3 rounded-full bg-grayColor"></div>
        <div className="w-3 h-3 rounded-full bg-grayColor"></div>
        <div className="w-3 h-3 rounded-full bg-grayColor"></div>
      </div>
    </div>
  );
};

export default Step1;

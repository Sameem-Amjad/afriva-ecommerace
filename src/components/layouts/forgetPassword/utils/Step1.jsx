import CommonButton from "@/components/buttons/CommonButton";
import EmailField from "@/components/fields/EmailField";
import { backArrow, successIcon } from "@/utils/Svgs";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const Step1 = ({ step, setStep, email, setEmail }) => {
  const [loading, setLoading] = useState(false);


  const handleNext = () => {
    if (!email) {
      toast.warning("Please enter your email");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.warning("Please enter a valid email address");
      return;
    }
    setLoading(true);
    axios.post(`/api/send-otp`, { email })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          console.log(res.data);
          toast.success(`Otp sent to your email`);
          setStep(step + 1);
        } else {
          toast.error("Failed to send reset instructions");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("An error occurred while sending reset instructions");
      });

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
        <div className="flex w-full flex-col gap-y-2">
          <label className="text-base font-medium text-black" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`flex w-full rounded-md border focus:outline-placeholder px-4 py-3 text-xs text-black placeholder:text-placeholder font-medium`}
            type="email"
            placeholder="Enter email"
          />
        </div>
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

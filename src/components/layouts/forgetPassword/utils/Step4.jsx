import CommonButton from "@/components/buttons/CommonButton";
import EmailField from "@/components/fields/EmailField";
import { backArrow, emailIcon, successIcon, successIcon1 } from "@/utils/Svgs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Step4 = ({ step, setStep }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 flex justify-center items-center rounded-full border-successButton border bg-white shadow-successShadow mb-6">
        {successIcon1}
      </div>
      <h1 className="font-semibold text-4xl pb-3 text-center">Successfully</h1>
      <p className="text-base text-text text-center">
        Your password has been successfully reset. Click below to log in
        magically.
      </p>

      <div className="w-full mt-8">
        <CommonButton
          type="submit"
          label="Back to log In"
          className="py-3 mt-6 text-base "
          disabled={loading}
          onClick={handleNext}
        />
      </div>

      <div className="flex flex-row gap-x-4 mt-20">
        <div className="w-3 h-3 rounded-full bg-grayColor"></div>
        <div className="w-3 h-3 rounded-full bg-grayColor"></div>
        <div className="w-3 h-3 rounded-full bg-grayColor"></div>
        <div className="w-3 h-3 rounded-full bg-forgot-gradient"></div>
      </div>
    </div>
  );
};

export default Step4;

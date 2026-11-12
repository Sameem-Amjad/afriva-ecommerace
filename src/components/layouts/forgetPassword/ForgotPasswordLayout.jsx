"use client";
import { forgetSteps } from "@/utils/Constants";
import { lineSvg } from "@/utils/Svgs";
import Image from "next/image";
import React, { useState } from "react";
import ForgotOverview from "./ForgotOverview";
import ForgotDetails from "./ForgotDetails";

const ForgotPasswordLayout = () => {
  const [step, setStep] = useState(0);
  return (
    <div className="flex flex-row w-full md:h-svh flex-wrap">
      <ForgotOverview step={step} />

      <ForgotDetails step={step} setStep={setStep} />
    </div>
  );
};

export default ForgotPasswordLayout;

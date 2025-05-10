import { forgetSteps } from "@/utils/Constants";
import { lineSvg } from "@/utils/Svgs";
import Image from "next/image";
import React from "react";

const ForgotOverview = ({ step }) => {
  return (
    <div className="flex flex-col h-full justify-center lg:px-14 md:px-8 px-7 lg:w-[30%] md:w-[45%] w-full bg-secondaryBg">
      <div className="flex flex-col gap-y-14 pb-8 h-full py-11">
        <Image
          src="/images/logo.png"
          style={{
            width: "161px",
            height: "auto",
          }}
          width={161}
          height={59}
          alt="Afriva-logo"
        />

        <div className="flex flex-col">
          {forgetSteps.map((forgetStep, index) => (
            <div className="flex-row flex gap-x-4" key={index}>
              <div className="flex-col items-center justify-center flex gap-y-1">
                <div
                  className={`w-11 h-11 rounded-full shadow-successShadow bg-white stroke-successButton flex justify-center items-center ${
                    step >= index ? "text-black" : "text-grayColor"
                  }`}
                >
                  {forgetStep.icon}
                </div>
                <div>{lineSvg}</div>
              </div>

              <div className="flex flex-col gap-y-0.5">
                <h1
                  className={`font-semibold text-xl ${
                    step >= index ? "opacity-100" : "opacity-50"
                  }`}
                >
                  {forgetStep.title}
                </h1>
                <p
                  className={`text-xl ${
                    step >= index ? "opacity-100" : "opacity-50"
                  }`}
                >
                  {forgetStep.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForgotOverview;

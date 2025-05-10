import SignupForm from "@/components/form/SignupForm";
import { backArrow, successIcon } from "@/utils/Svgs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-row w-full h-svh overflow-hidden relative">
      <div className="flex flex-col h-full justify-center lg:px-14 md:px-8 px-7 w-full overflow-hidden">
        <div className="flex">
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
        </div>
        <div className="w-full flex justify-center mt-[250px]">
          <div className="lg:w-1/2 md:w-[70%] w-full text-center flex flex-col items-center">
            <div className="w-20 h-20 flex justify-center items-center rounded-full border-successButton border bg-white shadow-successShadow mb-6">
              {successIcon}
            </div>

            <h1 className="font-semibold text-4xl pb-3">Successfully</h1>
            <p className="text-xl text-text">
              Your account has been successfully created and activated. Please
              check your email for confirmation
            </p>

            <div className="flex flex-row justify-center gap-x-2 mt-20">
              <Link
                href="/"
                className="cursor-pointer font-medium transition-opacity duration-300 ease-in hover:opacity-75 ml-1 text-secondaryText flex flex-row items-center gap-x-3"
              >
                {backArrow}
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

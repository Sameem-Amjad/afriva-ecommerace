import VerificationForm from "@/components/form/VerificationForm";
import Image from "next/image";
import React from "react";
import { DEMO_MODE } from "@/utils/demo";

const page = () => {
  return (
    <div className="flex flex-row w-full h-svh">
      <div className="flex flex-col h-full justify-center lg:px-14 md:px-8 px-7 w-full">
        <div className="flex flex-col gap-y-14 pb-8">
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

          <div className="flex flex-col gap-y-4">
            <h1 className="font-semibold text-4xl">{DEMO_MODE ? "Enter your code" : "Check your mailbox"}</h1>
            <p className="text-xl text-text">
              {DEMO_MODE ? "This demo shows the code on screen instead of emailing it." : "Enter the code we sent to your inbox."}
            </p>
          </div>
        </div>

        <div className="w-full border-b-divider border-b"></div>

        <VerificationForm />
      </div>
    </div>
  );
};

export default page;

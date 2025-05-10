import LoginForm from "@/components/form/LoginForm";
import Image from "next/image";
import React from "react";

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
            <h1 className="font-semibold text-4xl">Login</h1>
            <p className="text-xl text-text">
              Welcome to Afriva - Login to your account
            </p>
          </div>
        </div>

        <div className="w-full border-b-divider border-b"></div>

        <LoginForm />
      </div>
    </div>
  );
};

export default page;

import RoundedButton from "@/components/buttons/RoundedButton";
import SubscribeField from "@/components/fields/SubscribeField";
import React from "react";

const FloatingFooter = () => {
  return (
    <div className="w-full lg:px-[100px] md:px-8 px-4 bg-transparent absolute left-0 right-0 -top-[100px]">
      <div className=" w-full bg-footerBg flex-wrap flex flex-row justify-between sm:py-10 py-7 sm:px-16 px-6 rounded-[20px] gap-y-8">
        <div className="sm:w-[60%] w-full">
          <h2 className="text-white md:text-[40px] text-3xl font-bold">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
        </div>

        <div className="flex flex-col lg:w-[30%] sm:w-[40%] w-full gap-y-3.5">
          <SubscribeField />

          <RoundedButton
            label="Subscribe to Newsletter"
            className="py-3 bg-white text- border-black border-opacity-10 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingFooter;

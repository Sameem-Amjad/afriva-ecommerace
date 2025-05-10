import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React, { useState } from "react";
import DrawerHeader from "./DrawerHeader";
import { removePaymentMethodIcon } from "@/svgs";
import Image from "next/image";

const RemovePaymentMethodDrawer = ({ setDrawerOpen, open }) => {
  const handleClose = () => {
    setDrawerOpen((state) => !state);
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-[999999]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 overflow-hidden rounded-md">
        <div className="overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 flex w-full max-w-full items-center justify-center">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-[90%] transform transition duration-500 ease-in-out data-[closed]:opacity-0 sm:duration-700 md:w-[586px]"
            >
              <div className="flex flex-col items-center justify-between gap-[30px] rounded-[8px] bg-white px-[40px] py-[40px] text-center shadow-xl">
                <DrawerHeader handleClose={handleClose} />
                <div className="flex flex-col items-center">
                  {removePaymentMethodIcon}
                  <div className="leading-[30px]">
                    <p>Are you sure you want to remove this card?</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="rounded-[6px] p-1 bg-whiteDark">
                    <Image
                      src="/images/visa-logo.png"
                      className="md:w-[40px] w-[30px] h-auto"
                      width={40}
                      height={40}
                      alt="Visa"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="font-semibold">
                      Mastercard **** **** **** 1290
                    </p>
                    <p className="text-grayDark font-semibold">Mohan Singh</p>
                  </div>
                </div>
                <div className="flex w-full items-center gap-[19px]">
                  <button
                    className={`w-full rounded-[5px] disabled:bg-grayLight1 bg-whiteLightest px-[22px] py-[10px] font-semibold text-grayDark`}
                  >
                    No
                  </button>
                  <button
                    className={`w-full rounded-[5px] disabled:bg-grayLight1 bg-danger px-[22px] py-[10px] font-semibold text-white`}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default RemovePaymentMethodDrawer;

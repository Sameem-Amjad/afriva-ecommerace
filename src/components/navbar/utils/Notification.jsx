import {
  logoutIcon,
  markAsReadIcon,
  NotificationIcon,
  reviewArrowIcon,
} from "@/utils/Svgs";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import React, { Fragment } from "react";

const Notification = () => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <div className="overflow-hidden">
            <PopoverButton
              className={`relative w-8 h-8 flex justify-center items-center focus-visible:outline-none`}
            >
              {NotificationIcon}

              <div className="absolute top-1 right-2 bg-red-500 text-white w-1.5 h-1.5 flex justify-center items-center rounded-full"></div>
            </PopoverButton>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              anchor="bottom end"
              className="relative mt-2 w-full bg-white drop-shadow-lg p-5 rounded-lg md:w-[437px] flex flex-col gap-y-3 z-50 h-[408px]"
            >
              {/* header */}
              <div className="sticky top-0 bg-white flex-row items-center border-b border-b-black border-opacity-10 pb-[18px] justify-between">
                <div className="flex flex-row items-center gap-x-2 flex-nowrap">
                  <p className="text-lg font-semibold">Notifications </p>

                  <div className="w-5 h-5 rounded-full bg-primary flex justify-center items-center">
                    <p className="text-white text-xs font-semibold">3</p>
                  </div>
                </div>

                <div className="flex flex-row gap-x-1.5 cursor-pointer items-center">
                  <p className="text-sm">Mark all as read</p>
                  {markAsReadIcon}
                </div>
              </div>

              {/* body */}

              <div className="flex flex-col gap-y-2.5">
                <div className="flex flex-row gap-x-3 flex-nowrap bg-greenLight py-4 px-3.5 rounded-md">
                  <Image
                    src="/images/noti_image.png"
                    style={{
                      width: "48px",
                      height: "auto",
                    }}
                    width={48}
                    height={57}
                    alt="Afriva-notification"
                  />

                  <div className="flex flex-col gap-y-1">
                    <p className="text-sm font-medium">
                      You’ve received your product 😍 We’d love to get a review
                    </p>

                    <p className="text-xs font-medium opacity-60">
                      2 Jan, 10:55am
                    </p>
                  </div>

                  <div className="flex flex-row items-center gap-x-1">
                    <p className="text-primary text-xs font-semibold">Review</p>
                    {reviewArrowIcon}
                  </div>
                </div>

                <div className="flex flex-row gap-x-3 flex-nowrap py-4 px-3.5 rounded-md">
                  <div className="flex flex-col gap-y-1">
                    <p className="text-sm font-medium">
                      Officiis magni et est odit in aperiam est.
                    </p>

                    <p className="text-xs font-medium opacity-60">2 mins ago</p>
                  </div>
                </div>

                <div className="flex flex-row gap-x-3 flex-nowrap py-4 px-3.5 rounded-md">
                  <div className="flex flex-col gap-y-1">
                    <p className="text-sm font-medium">
                      Officiis magni et est odit in aperiam est.
                    </p>

                    <p className="text-xs font-medium opacity-60">2 mins ago</p>
                  </div>
                </div>

                <div className="flex flex-row gap-x-3 flex-nowrap py-4 px-3.5 rounded-md">
                  <div className="flex flex-col gap-y-1">
                    <p className="text-sm font-medium">
                      Officiis magni et est odit in aperiam est.
                    </p>

                    <p className="text-xs font-medium opacity-60">2 mins ago</p>
                  </div>

                  {/* <div className="flex flex-row items-center gap-x-1">
                    <p className="text-primary text-xs font-semibold">Review</p>
                    {reviewArrowIcon}
                  </div> */}
                </div>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Notification;

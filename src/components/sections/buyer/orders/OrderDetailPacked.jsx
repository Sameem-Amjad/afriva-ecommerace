"use client";
import GiveReview from "@/components/layouts/product/utils/GiveReview";
import { chevronRightBlack, downloadIcon, progressBar } from "@/svgs";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const OrderDetailsPacked = ({ setState, orderDetail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { buyers } = useSelector((state) => state.users);
  const handleOpenReview = () => {
    setIsOpen((state) => !state);
  };
  const getProgressPercentage = () => {

    switch (order?.status?.toLowerCase()) {
      case "pending":
        return 0;
      case "packed":
        return 33;
      case "shipped":
        return 66;
      case "delivered":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full p-5">
      <div className="flex flex-col gap-5 p-8">
        <h1 className="text-2xl font-bold">Orders Details</h1>
        <hr />
        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 lg:w-[100%]">
          <div className="flex justify-between items-center w-full h-[90px]">
            <div className="flex gap-3 items-center">
              <div>
                <Image
                  alt="Product Image"
                  width={90}
                  height={90}

                  className="object-cover rounded-[10px]"
                  src="/images/order-avatar.jpeg"
                />
              </div>
              <div className="flex flex-col gap-1 items-start">
                <p className="font-medium">Order # {orderDetail?.order_id}</p>
                {
                  orderDetail?.products?.map((item, index) => (
                    <p key={index} className="text-sm">
                      {orderDetail?.quantity} {item?.name}
                    </p>
                  ))
                }
              </div>
            </div>
            <div className="flex flex-col items-center justify-between">
              {chevronRightBlack}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-col gap-5 px-10 py-5 border mx-auto w-full lg:w-[80%] border-primary rounded-[12px] bg-greenLight">
            <div className="flex justify-between items-center gap-3">
              <div className="flex items-center gap-3">
                <Image
                  width={50}
                  height={50}
                  className="rounded-full"
                  src={buyers?.profile_image || "/images/order-avatar.jpeg"}
                  alt="User Profile Avatar"
                />
                <p className="font-semibold text-2xl">{orderDetail?.user_delivery_address?.name}</p>
              </div>
              <div>{downloadIcon}</div>
            </div>
            <div className="flex justify-between flex-wrap gap-5">
              <div>
                <p className="text-lg font-bold">Country</p>
                <p>{orderDetail?.user_delivery_address?.country}</p>
              </div>
              <div>
                <p className="text-lg font-bold">City</p>
                <p>{orderDetail?.user_delivery_address?.city}</p>
              </div>
              <div>
                <p className="text-lg font-bold">Phone Number</p>
                <p>{orderDetail?.user_delivery_address?.phone_number}</p>
              </div>
              <div className="w-full">
                <p className="text-lg font-bold">Address</p>
                <p>{orderDetail?.user_delivery_address?.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col items-center justify-center space-y-6 py-2">
        <div className="w-full lg:w-3/4 bg-[#E5EBFC]  border-[5px] border-[#E5EBFC] rounded-full relative">
          <div
            className="h-full bg-primary p-[3px] shadow-lg border-2 rounded-lg border-white transition-all duration-500"
            style={{ width: `${getProgressPercentage()}%` }}
          />

          <div className="absolute  top-1/2 -left-2 w-[102%] transform -translate-y-1/2 flex justify-between">
            <div
              className={`w-10 h-10 rounded-full border-2 border-[#E5EBFC] transition-all duration-500 ${
                getProgressPercentage() >= 33 ? "bg-primary" : "bg-[#E5EBFC]"
              }`}
              style={{ left: "0%" }}
            ></div>

            <div
              className={`w-10 h-10 rounded-full border-2 border-[#E5EBFC] transition-all duration-500 ${
                getProgressPercentage() >= 66 ? "bg-primary" : "bg-[#E5EBFC]"
              }`}
              style={{ left: "50%" }}
            ></div>

            <div
              className={`w-10 h-10 rounded-full border-2 border-[#E5EBFC] transition-all duration-500 ${
                getProgressPercentage() >= 100 ? "bg-primary" : "bg-[#E5EBFC]"
              }`}
              style={{ left: "100%" }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between w-3/4 text-xs font-semibold text-gray-600">
          <span
            className={
              getProgressPercentage() >= 33 ? "text-primary" : "text-gray-600"
            }
          >
            Packed
          </span>
          <span
            className={
              getProgressPercentage() >= 66 ? "text-primary" : "text-gray-600"
            }
          >
            Shipped
          </span>
          <span
            className={
              getProgressPercentage() === 100
                ? "text-primary"
                : "text-gray-600"
            }
          >
            Delivered
          </span>
        </div>
      </div> */}
        {/* <div className="flex justify-center">{progressBar}</div>
         */}

        <div className="flex flex-col items-center">
          {/* Dynamic Progress Bar */}
          <div className="relative w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-green-400 transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>

          {/* Status Indicator */}
          <div className="flex justify-between mt-2 w-full text-sm">
            <span className={status >= 0 ? "text-green-500 font-bold" : ""}>
              Packed
            </span>
            <span className={status >= 1 ? "text-green-500 font-bold" : ""}>
              Shipped
            </span>
            <span className={status >= 2 ? "text-green-500 font-bold" : ""}>
              Delivered
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-2 flex-col items-start">
            <h4 className="text-lg font-medium">Packed</h4>
            <p className="text-sm">
              Your parcel is packed and will be handed over to our delivery
              partner.
            </p>
          </div>
          <div className="bg-whiteDark text-xs px-4 text-black/70 py-2 rounded-[4px]">
            16 April, 12:31
          </div>
        </div>
        <div className="flex gap-2 flex-col items-start">
          <h4 className="text-lg font-medium">Shipped</h4>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore.
          </p>
        </div>
        <div className="flex gap-2 flex-col items-start">
          <h4 className="text-lg font-medium">Delivered</h4>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPacked;

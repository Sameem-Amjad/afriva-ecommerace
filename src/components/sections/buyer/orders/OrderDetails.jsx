"use client";
import GiveReview from "@/components/layouts/product/utils/GiveReview";
import { chevronRightBlack, downloadIcon, progressBar } from "@/svgs";
import { productTabs } from "@/utils/Constants";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const OrderDetails = ({ setState, orderDetail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { buyers } = useSelector((state) => state.users);
  let [productId, setProductId] = useState(null);
  let [sellerName, setSellerName] = useState(null);
  const handleOpenReview = (id, name) => {
    setProductId(id);
    setSellerName(name)
    setIsOpen((state) => !state);
  };
  const getProgressPercentage = () => {

    switch (orderDetail?.status?.toLowerCase()) {
      case "pending":
        return 0;
      case "packed":
        return 33;
      // case "paid":
      //   return 33;
      case "shipped":
        return 66;
      case "delivered":
        return 100;
      case "completed":
        return 100;
      case "return requested":
        return 100;
      case "return accepted":
        return 100;
      case "return rejected":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full p-5">
      <div className="flex flex-col gap-5 p-8">
        <div className="flex items-center ">
          <h1 className="rotate-180 hover:cursor-pointer mr-5" onClick={() => setState("list")}>{chevronRightBlack}</h1>
          <h1 className="text-2xl font-bold">Orders Details</h1>
        </div>
        <hr />
        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 lg:w-[100%]">
          <div className="flex justify-between items-center w-full h-[90px]">
            <div className="flex gap-3 items-center">
              {
                orderDetail?.products?.map((product, index) => (
                  <div key={index} className="flex gap-3  items-center">
                    <Image
                      alt="Product Image"
                      width={90}
                      height={90}
                      className="object-cover rounded-[10px]"
                      src={product?.product_image?.[0] || "/images/order-avatar.jpeg"}
                    />
                    <div className="flex flex-col gap-1 items-start">
                      <p className="font-medium">Order # {`${orderDetail?.order_id} `}</p>
                      <div className="flex gap-2 items-center">
                        <p className="text-sm">
                          {orderDetail?.quantity} {" "}{product?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              }
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
                  style={{
                    height: 50
                  }}
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
          <div className="flex gap-2 flex-col items-start w-full">
            <h4 className="text-lg font-medium">Packed</h4>
            <div className="flex justify-between w-full">
              <p className="text-sm">
                Your parcel is packed and will be handed over to our delivery
                partner.
              </p>
              {(orderDetail?.status?.toLowerCase() === "packed" || orderDetail?.status?.toLowerCase() === "shipped" || orderDetail?.status?.toLowerCase() === "return requested" ||
                orderDetail?.status?.toLowerCase() === "return accepted" || orderDetail?.status?.toLowerCase() === "return rejected" || orderDetail?.status?.toLowerCase() === "delivered" || orderDetail?.status?.toLowerCase() === "completed") && (
                  <div className="bg-whiteDark text-xs px-4 text-black/70 py-2 rounded-[4px]">
                    {new Date(orderDetail?.packing_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-col items-start">
          <h4 className="text-lg font-medium">Shipped</h4>
          <div className="flex justify-between w-full">
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore.
            </p>
            {(orderDetail?.status?.toLowerCase() === "shipped" || orderDetail?.status?.toLowerCase() === "return requested" ||
              orderDetail?.status?.toLowerCase() === "return accepted" || orderDetail?.status?.toLowerCase() === "return rejected" || orderDetail?.status?.toLowerCase() === "delivered" || orderDetail?.status?.toLowerCase() === "completed") && (
                <div className="bg-whiteDark text-xs px-4 text-black/70 py-2 rounded-[4px]">
                  {new Date(orderDetail?.shipping_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              )}
          </div>
        </div>
        <div className="flex gap-2 flex-col items-start">
          <h4 className="text-lg font-medium">Delivered</h4>
          <div className="flex justify-between w-full">
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore.
            </p>
            {(orderDetail?.status?.toLowerCase() === "completed" || orderDetail?.status?.toLowerCase() === "return requested" ||
              orderDetail?.status?.toLowerCase() === "return accepted" || orderDetail?.status?.toLowerCase() === "return rejected" || orderDetail?.status?.toLowerCase() === "delivered") && (
                <div className="bg-whiteDark text-xs px-4 text-black/70 py-2 rounded-[4px]">
                  {new Date(orderDetail?.delivery_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              )}
          </div>
        </div>
        {(orderDetail?.status?.toLowerCase() === "completed" || orderDetail?.status?.toLowerCase() === "delivered") && (
          <div className="flex w-full justify-end items-center gap-[19px]">
            <button
              onClick={() => setState("return")}
              className="rounded-[44px] w-[160px] text-danger border border-danger px-[22px] py-[10px] font-semibold"
            >
              Return
            </button>
            {
              orderDetail?.products?.map(
                (item, index) => (
                  <button
                    key={index}
                    onClick={() => handleOpenReview(item?.id, item?.sellers?.name)}
                    className="rounded-[44px] w-[160px] bg-buttonGradient px-[22px] py-[10px] font-semibold text-white"
                  >
                    Review
                  </button>
                )
              )
            }

          </div>
        )}
        {(orderDetail?.status?.toLowerCase() === "return requested" ||
          orderDetail?.status?.toLowerCase() === "return accepted" || orderDetail?.status?.toLowerCase() === "return rejected") && (
            <div className="flex w-full justify-end items-center gap-[19px]">
              <button
                onClick={() => setState("reverse")}
                className="rounded-[44px]  hover:bg-buttonGradient text-gray-600 hover:text-white border-4 px-[22px] py-[10px] font-semibold "
              >
                Reverse Details
              </button>
              {
                orderDetail?.products?.map(
                  (item, index) => (
                    <button
                      key={index}
                      onClick={() => handleOpenReview(item?.id, item?.sellers?.name)}
                      className="rounded-[44px] w-[160px] bg-buttonGradient px-[22px] py-[10px] font-semibold text-white"
                    >
                      Review
                    </button>
                  )
                )
              }

            </div>
          )}
      </div>
      <GiveReview isOpen={isOpen} closeModal={handleOpenReview} orderId={orderDetail?.order_id} productId={productId} sellerName={sellerName} />
    </div>
  );
};

export default OrderDetails;

"use client";
import DelieveryProgress from "@/components/progress/DelieveryProgress";
import { returnRequestDetailsThunk } from "@/redux/features/return_products/returnThunk";
import { chevronRightBlack, packageDelieveryProgress } from "@/svgs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ReverseDetails = ({ setState, orderDetail }) => {
  const dispatch = useDispatch();
  const { returnRequest } = useSelector((state => state?.returnRequests))
  useEffect(() => {
    dispatch(returnRequestDetailsThunk(orderDetail?.order_id));
  }, [dispatch, orderDetail?.order_id])
  return (
    <div className="flex flex-col gap-5 w-full p-5">
      <div className="flex flex-col gap-5 p-8">
        <div className="flex items-center ">
          <h1 className="rotate-180 hover:cursor-pointer mr-5" onClick={() => setState("details")}>{chevronRightBlack}</h1>
          <h1 className="text-2xl font-bold">Reverse Details</h1>
          <hr /></div>

        <div className="flex flex-col shadow-md gap-5 px-10 py-5 mx-auto w-full lg:w-[80%] rounded-[12px]">
          {/* <div className="flex justify-center">{packageDelieveryProgress}</div> */}
          <DelieveryProgress />
        </div>

        <h3 className="text-lg font-semibold">
          Your refund is being processed
        </h3>

        <div className="flex flex-col text-sm font-semibold mt-5 gap-5">
          <div className="flex justify-between">
            <p>Refund Reason</p>
            <p>{returnRequest?.reason}</p>
          </div>
          <div className="flex justify-between">
            <p>Refund to</p>
            <p>{returnRequest?.refund_to}</p>
          </div>
          <div className="flex justify-between">
            <p>Refund Time</p>
            <p>Jan 05,2024</p>
          </div>
          <div className="flex justify-between">
            <p>Refund Amount</p>
            <p>{returnRequest?.refund_amount}$</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold">Return/Refund Product</h3>

        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 lg:w-[100%]">
          <div className="flex justify-between items-center w-full h-[90px]">
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
        </div>

        <div className="flex flex-col text-sm font-semibold mt-5 gap-5">
          <div className="flex justify-between">
            <p>Request Time</p>
            <p>{new Date(returnRequest?.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</p>
          </div>
          <div className="flex justify-between">
            <p>Order Number</p>
            <p>{orderDetail?.order_id}</p>
          </div>
          <div className="flex justify-between">
            <p>Seller</p>
            <p>{orderDetail?.products?.[0]?.sellers?.name}</p>
          </div>
        </div>

        <div className="flex w-full justify-end items-center gap-[19px]">
          <Link
            href="/profile"
            className="rounded-[44px] w-[160px] text-grayDark border border-grayDark px-[22px] py-[10px] font-semibold"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReverseDetails;

"use client";
import { fetchPaymentHistoryThunk } from "@/redux/features/payment/paymentThunk";

import { paypalIcon } from "@/svgs";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TrasactionHistory = ({ handleShowAllTransactions }) => {
  const { user } = useSelector((state) => state.users);
  const { paymentHistoryList } = useSelector((state) => state.payment);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPaymentHistoryThunk(user?.id));
  }
    , [user?.id, dispatch]);
  return (
    <div className="flex flex-col mt-4 p-3">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl text-blackTwo mb-2">
          Transaction History
        </h1>
        <button
          onClick={handleShowAllTransactions}
          className="text-footerBg font-medium mr-3"
        >
          View All
        </button>
      </div>
      {
        paymentHistoryList.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 mt-10">
            <Image
              src="/images/empty-image.jpg"
              width={100}
              height={100}
              alt="No Transaction History"
            />
            <p className="text-grayDark font-semibold text-lg">
              No transaction history found
            </p>
          </div>
        ) : paymentHistoryList.slice(0, 3).map((transaction, index) => (
          <div key={index} className="flex justify-between px-6 py-4 items-center bg-white shadow-lg transform translate-y-[-5px] p-2 rounded-lg mt-2 w-full">
            <div className="flex gap-2">
              <span className="mt-2">{paypalIcon}</span>
              <div className="flex flex-col">
                <p className="text-cardNumber text-[16px] font-semibold">
                  {transaction?.type}
                </p>
                <p className="text-grayDark text-[14px] font-medium">
                  {new Date(transaction.created_at).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })} - {new Date(transaction.created_at).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <div className="text-amount text-[20px] font-semibold">$ {transaction?.amount || "N/A"}</div>
            </div>
          </div>
        ))
      }

    </div>
  );
};

export default TrasactionHistory;

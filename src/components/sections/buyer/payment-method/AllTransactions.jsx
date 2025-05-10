"use client";
import { paypalIcon } from "@/svgs";
import { useDispatch, useSelector } from "react-redux";

const AllTransactions = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.users);
  const { paymentHistoryList } = useSelector((state) => state.payment);

  return (
    <div className="flex flex-col mt-4 p-3">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl text-blackTwo mb-2">
          Transaction History
        </h1>
      </div>
      {
        paymentHistoryList.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 mt-10">
            <p className="text-grayDark font-semibold text-lg">
              No transaction history found
            </p>
          </div>
        ) : paymentHistoryList.map((transaction, index) => (

      <div key={index} className="flex justify-between px-6 py-4 items-center bg-white shadow-lg transform translate-y-[-5px] p-2 rounded-lg mt-2 w-full">
        <div className="flex gap-2">
          <span className="mt-2">{paypalIcon}</span>
          <div className="flex flex-col">
            <p className="text-cardNumber text-[16px] font-semibold">
             {transaction.type}
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
        <div className="flex gap-5 items-center"></div>
          <div className="text-amount text-[20px] font-semibold">$ {transaction?.amount || "N/A"}</div>
        </div>
      
        ))
      }
      
    </div>
  );
};

export default AllTransactions;

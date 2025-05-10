import React, { useState } from "react";
import TransactionHistory from "./TransactionHistory";
import PaymentMethod from "./PaymentMethod";
import AllTransactions from "./AllTransactions";

const PaymentAndTrasaction = () => {
  const [showTransactions, setShowTransactions] = useState(false);

  const handleShowAllTransactions = () => {
    setShowTransactions(true);
  };

  return (
    <div className="flex w-full flex-col border shadow-md rounded-[12px] px-5 py-5 md:pb-20 gap-[30px]">
      {!showTransactions && (
        <>
          <PaymentMethod />
          <TransactionHistory
            handleShowAllTransactions={handleShowAllTransactions}
          />
        </>
      )}
      {showTransactions && <AllTransactions />}
    </div>
  );
};

export default PaymentAndTrasaction;

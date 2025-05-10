import BagsPerDay from "@/components/BagsPerDay";
import { chevronRightBlack, shoppingBagActiveIcon } from "@/svgs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReturnRequestField } from "@/redux/features/return_products/returnSlice";
import Image from "next/image";
const RefundBill = ({ setState, orderDetail }) => {
  const [numberOfBags, setNumberOfBags] = useState(1);
  const [reason, setReason] = useState("damaged");
  const [refund_to, setRefundTo] = useState("debit_card");
  const dispatch = useDispatch();
  const { returnRequest } = useSelector((state) => state.returnRequests);

  const handleNext = () => {

    const refundAmount = (orderDetail?.subtotal / orderDetail?.quantity) * returnRequest.quantity;

    dispatch(setReturnRequestField({ field: "refund_amount", value: refundAmount }));
    dispatch(setReturnRequestField({ field: "quantity", value: numberOfBags }));
    dispatch(setReturnRequestField({ field: "reason", value: reason }));
    dispatch(setReturnRequestField({ field: "refund_to", value: refund_to }));
    setState("refundDetails");
  };

  return (
    <div className="flex flex-col gap-5 p-8">
      <div className="flex items-center ">
        <h1 className="rotate-180 hover:cursor-pointer mr-5" onClick={() => setState("return")}>{chevronRightBlack}</h1>
        <h1 className="text-2xl font-bold">Return & Refund</h1>
        <hr />
      </div>
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

      <div className="flex flex-col text-sm font-semibold mt-5 gap-5">
        <div className="flex justify-between">
          <p>
            Adjust Quantity <span className="text-danger">*</span>
          </p>
          <BagsPerDay maxQuantity={orderDetail?.quantity} numberOfBags={numberOfBags} setNumberOfBags={setNumberOfBags} />
        </div>
        <div className="flex justify-between">
          <p>
            Refund Reason <span className="text-danger">*</span>
          </p>
          <select className="border border-gray-300 rounded px-3 py-2"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="damaged">Damaged/Defective Item</option>
            <option value="wrong">Wrong Item</option>
            <option value="not_as_advertised">Item Not as Advertised</option>
            <option value="missing_accessories">Missing Accessories/Freebies</option>
            <option value="counterfeit">Counterfeit Item</option>
            <option value="change_of_mind">Change of Mind</option>
          </select>
        </div>
        <div className="flex justify-between">
          <p>
            Refund to <span className="text-danger">*</span>
          </p>
          <select className="border border-gray-300 rounded px-3 py-2"
            value={refund_to}

            onChange={(e) => setRefundTo(e.target.value)}
          >
            <option value="debit_card">Debit Card</option>
            <option value="credit_card">Credit Card</option>
          </select>
        </div>
        <div className="flex justify-between">
          <p>
            Refund Amount <span className="text-danger">*</span>
          </p>
          <p>{(orderDetail?.subtotal / orderDetail?.quantity) * numberOfBags}$</p>
        </div>
      </div>

      <div className="flex w-full justify-end items-center gap-[19px]">
        <button
          onClick={() => setState("list")}
          className="rounded-[44px] w-[160px] text-grayDark border border-grayDark px-[22px] py-[10px] font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={handleNext}
          className="rounded-[44px] w-[160px] bg-buttonGradient px-[22px] py-[10px] font-semibold text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RefundBill;

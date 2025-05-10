import { chevronRightBlack, shoppingBagActiveIcon } from "@/svgs";
import React from "react";
import { useDispatch } from "react-redux";
import { setReturnRequestField } from "@/redux/features/return_products/returnSlice";
import Image from "next/image";
const ReturnAndRefund = ({ setState, orderDetail }) => {

  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(setReturnRequestField({ field: "order_id", value: orderDetail?.order_id }));
    dispatch(setReturnRequestField({ field: "created_by", value: orderDetail?.created_by }));
    setState("bill");
  };

  return (
    <div className="flex flex-col gap-5 p-8">
      <div className="flex items-center ">
        <h1 className="rotate-180 hover:cursor-pointer mr-5" onClick={() => setState("details")}>{chevronRightBlack}</h1>
        <h1 className="text-2xl font-bold">Return & Refund</h1>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 lg:w-[100%]">
        <div className="flex justify-between items-center w-full h-[90px]">
          <div className="flex gap-3 items-center">
            {
              orderDetail?.products?.map((product, index) => (
                <div key={index} className="flex gap-3 items-center ">
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

      <p className="text-lg font-medium">Select a service:</p>

      <div className="flex flex-col gap-5 px-10 py-5 border mx-auto w-full border-primary rounded-[12px]">
        <div className="flex gap-3 items-center">
          <h1>{shoppingBagActiveIcon}</h1>
          <p className="font-semibold text-lg">
            I have a problem with the item received
          </p>
        </div>
        <div className="rounded-[4px] px-3 py-1 font-medium text-primary self-start bg-greenSideMenu">
          Free shipping fee
        </div>
        <p className="text-grayDark">
          Select this if you received a damaged/defective item, wrong item, an
          item not as advertised, missing accessories/freebies, counterfeit
          itern or a change of mind (if applicable).
        </p>
      </div>

      <div className="flex w-full justify-end items-center gap-[19px]">
        <button
          onClick={() => setState("list")}
          className="rounded-[44px] w-[160px] text-grayDark border border-grayDark px-[22px] py-[10px] font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="rounded-[44px] w-[160px] bg-buttonGradient px-[22px] py-[10px] font-semibold text-white"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ReturnAndRefund;

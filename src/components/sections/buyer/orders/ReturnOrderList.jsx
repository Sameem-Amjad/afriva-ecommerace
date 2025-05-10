import OrderField from "@/components/dropdowns/OrderField";
import Image from "next/image";
import React from "react";

const ReturnOrderList = () => {
  return (
    <div className="flex flex-col gap-5 w-[100%] p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold my-5">My Orders</h1>
        <div className="flex items-center gap-3">
          <p className="text-grayDark">Status</p>
          <OrderField />
        </div>
      </div>
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
              <p className="font-medium">Order # 9254345</p>
              <p className="text-sm">1 Skirt, 1 Gucci Bag, 1 Glasses</p>
              <div className="px-5 py-1 bg-tagGray border rounded-[30px] border-borderTag">
                Packed
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between h-full">
            <div className="rounded-full border border-primary px-5 py-1 bg-whiteLight">
              View Return
            </div>
            <button
              // onClick={navigateToOrderPage}
              className="rounded-[4px] bg-buttonGradient px-8 py-2 text-white"
            >
              Buy again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnOrderList;

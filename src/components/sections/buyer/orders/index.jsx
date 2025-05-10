import React, { useState } from "react";
import OrderList from "./OrderList";
import ReturnOrderList from "./ReturnOrderList";
import OrderDetails from "./OrderDetails";
import ReturnAndRefund from "./ReturnAndRefund";
import RefundBill from "./RefundBill";
import RefundDetails from "./RefundDetails";
import RefundFileUpload from "./RefundFileUpload";
import ReverseDetails from "./ReverseDetails";
import OrderDetailPacked from "./OrderDetailPacked";
import LoadMoreButton from "@/components/buttons/LoadMoreButton";

const Orders = () => {
  const [state, setState] = useState("list");
  const [orderDetail, setOrderDetail] = useState({});
  return (
    <div>
      <div className="flex w-full flex-col my-10 border shadow-md rounded-[12px] px-5 py-5 md:pb-20 gap-[30px]">
        {state === "list" && <OrderList setState={setState} setOrderDetail={setOrderDetail} />}
        {state === "detailsPacked" && <OrderDetailPacked setState={setState} orderDetail={orderDetail} />}
        {/* <ReturnOrderList /> */}
        {state === "details" && <OrderDetails setState={setState} orderDetail={orderDetail} />}
        {state === "return" && <ReturnAndRefund setState={setState} orderDetail={orderDetail} />}
        {state === "bill" && <RefundBill setState={setState} orderDetail={orderDetail} />}
        {state === "refundDetails" && <RefundDetails setState={setState} orderDetail={orderDetail} />}
        {state === "upload" && <RefundFileUpload setState={setState} orderDetail={orderDetail} />}
        {state === "reverse" && <ReverseDetails setState={setState} orderDetail={orderDetail} />}
      </div>
      {/* <LoadMoreButton /> */}
    </div>
  );
};

export default Orders;

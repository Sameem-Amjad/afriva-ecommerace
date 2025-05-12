"use client";
import EmailField from "@/components/fields/EmailField";
import TextField from "@/components/fields/TextField";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderDetails } from "@/redux/features/order/orderSlice";

const CartInformation = () => {
  const dispatch = useDispatch();
  const { orderDetails } = useSelector((state) => state.orders);

  const { addressData } = useSelector((state) => state.users.buyers);
  return (
    <div className="flex flex-col py-5 px-6 md:w-[53%] w-full gap-y-8">
      <TextField
        label="Full Name"
        name="Full Name"
        placeholder="Enter your name"
        text={orderDetails?.user_delivery_address?.name}
        setText={(e) => dispatch(setOrderDetails({ field: "user_delivery_address.name", value: e.target.value }))}
      />

      <TextField
        label="Company Name"
        name="Company Name"
        placeholder="Enter company name"
        text={orderDetails?.user_delivery_address?.company}
        setText={(e) => dispatch(setOrderDetails({ field: "user_delivery_address.company", value: e.target.value }))}
      />

      <TextField
        label="Street Address"
        name="Street Address"
        placeholder="Enter street address"
        text={orderDetails?.user_delivery_address?.address }
        setText={(e) => dispatch(setOrderDetails({ field: "user_delivery_address.address", value: e.target.value }))}
      />

      <TextField
        label="Apartment, floor, etc. (optional)"
        name="Apartment, floor, etc. (optional)"
        placeholder="Enter apartment, floor, etc."
        text={orderDetails?.user_delivery_address?.apartment}
        setText={(e) => dispatch(setOrderDetails({ field: "user_delivery_address.apartment", value: e.target.value }))}
      />

      <TextField
        label="Town/City"
        name="City"
        placeholder="Enter city"
        text={orderDetails?.user_delivery_address?.city }
        // setText={(e) => setCity(e.target.value)}
        setText={(e) => dispatch(setOrderDetails({ field: "user_delivery_address.city", value: e.target.value }))}
      />

      <TextField
        label="Phone number"
        name="Phone number"
        placeholder="Enter number"
        text={orderDetails?.user_delivery_address?.phone_number }
        setText={(e) => dispatch(setOrderDetails({ field: "user_delivery_address.phone_number", value: e.target.value }))}
      />

      <EmailField
        label="Email Address"
        name="Email Address"
        placeholder="Enter email address"
        text={orderDetails?.user_delivery_address?.email}
        setText={(e) => dispatch(setOrderDetails({ field: "user_delivery_address.email", value: e.target.value }))}
      />
    </div>
  );
};

export default CartInformation;


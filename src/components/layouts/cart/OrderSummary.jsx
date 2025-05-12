"use client";
import RoundedButton from "@/components/buttons/RoundedButton";
import PromoField from "@/components/fields/PromoField";
import StripeForm from "@/components/payment/StripeForm";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderDetails } from "@/redux/features/order/orderSlice";
import { createNewOrder } from "@/redux/features/order/orderThunk";
import { toast } from "sonner";
import { removeCartItemThunk } from "@/redux/features/cart/cartThunk";
import { fetchPromoCodeDiscount } from "@/redux/features/promocode/promocodeThunk";
const OrderSummary = ({ step, setStep }) => {
  const [payment, setPayment] = React.useState(1);
  const {user} = useSelector((state) => state.users);
  const {promoCode}= useSelector((state) => state.promoCode);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { orderDetails } = useSelector((state) => state.orders);
  const { subtotal, discount, deliveryFee } = cartItems.reduce(
    (acc, item) => {
      const sizeDetail = item?.products?.size_details?.find(
        (size) =>
          size?.size === item?.selected_size &&
          (size?.color.startsWith("#") ? size?.color : `#${size?.color}`) ===
          (item?.selected_color.startsWith("#") ? item?.selected_color : `#${item?.selected_color}`)
      );
      if (sizeDetail) {
        const price = parseFloat(sizeDetail.price) || 0;
        const itemDiscount = (parseFloat(sizeDetail?.discount) || 0) / 100;
        const itemDeliveryFee = parseFloat(sizeDetail?.delivery_fee) || 0;
        acc.subtotal += price * item.quantity;
        acc.discount += price * item.quantity * itemDiscount;
        acc.deliveryFee += itemDeliveryFee;
      }
      return acc;
    },
    { subtotal: 0, discount: 0, deliveryFee: 0 }
  );
  const total = subtotal - discount + deliveryFee;


  const handleButton = () => {
    const hasZeroQuantity = cartItems?.some((item) => item.quantity === 0);
    if (hasZeroQuantity) {
      const zeroItem = cartItems.find((item) => item.quantity === 0);
      toast.error(`Please remove ${zeroItem?.products?.name} from cart to proceed furthur. Because it is out of stock.`);
      return;
    }

    if (step === 1) {
      setStep(2);
    } else {
      setStep(1);
    }
  };

  const handleOrder = () => {
    if (!orderDetails?.user_delivery_address ||
      !orderDetails.user_delivery_address.name ||
      !orderDetails.user_delivery_address.address ||
      !orderDetails.user_delivery_address.city ||
      !orderDetails.user_delivery_address.phone_number) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    cartItems?.forEach((item) => {
      dispatch(setOrderDetails({ field: "product_ids", value: [item?.products.id] }));
      dispatch(setOrderDetails({ field: "quantity", value: item.quantity }));
      dispatch(setOrderDetails({ field: "payment_method", value: "cash" }));
      const sizeDetail = item?.products?.size_details?.find(
        (size) =>
          size?.size === item?.selected_size &&
          (size?.color.startsWith("#") ? size?.color : `#${size?.color}`) ===
          (item?.selected_color.startsWith("#") ? item?.selected_color : `#${item?.selected_color}`)
      );
      if (sizeDetail) {
        const price = parseFloat(sizeDetail.price) || 0;
        const itemDiscount = (parseFloat(sizeDetail?.discount) || 0) / 100;
        const itemDeliveryFee = parseFloat(sizeDetail?.delivery_fee) || 0;
        dispatch(setOrderDetails({ field: "order_id", value: [...Array(5)].map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]).join('').toLowerCase() }));
        dispatch(setOrderDetails({ field: "user_delivery_address.userId", value: item?.created_by }));
        dispatch(setOrderDetails({ field: "user_delivery_address.created_at", value: new Date() }));
        dispatch(setOrderDetails({ field: "subtotal", value: price }));
        dispatch(setOrderDetails({ field: "delivery_charge", value: itemDeliveryFee }));
        dispatch(setOrderDetails({ field: "total", value: (price - itemDiscount) + itemDeliveryFee }));
        dispatch(setOrderDetails({ field: "total_amount", value: (price - itemDiscount) + itemDeliveryFee }));
        dispatch(setOrderDetails({ field: "created_by", value: item?.created_by }));
        dispatch(setOrderDetails({ field: "selected_size_details", value: { qty: item.quantity, size: item.selected_size, color: sizeDetail?.colorName, color_code: "#"+item.selected_color } }));
        dispatch(createNewOrder());
        dispatch(removeCartItemThunk(item?.cart_id));
      }
    })
    toast.success("Order placed successfully!");
    handleButton()

  }

  return (
    <div className="flex flex-col py-5 px-6 md:w-[43%] w-full rounded-[20px] border border-black border-opacity-10 gap-y-6 h-fit">
      <h2 className="font-bold text-2xl">Order Summary</h2>

      <div className="flex flex-col gap-y-5 w-full">
        <div className="flex flex-row items-center justify-between">
          <p className="opacity-60 text-lg">Subtotal</p>
          <p className="font-bold text-lg">${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <p className="opacity-60 text-lg">Discount </p>
          <p className="font-bold text-lg text-redColor">-${discount.toFixed(2)}</p>
        </div>
        <div className="flex flex-row items-center justify-between border-b border-b-black border-opacity-10 pb-5">
          <p className="opacity-60 text-lg">Delivery Fee</p>
          <p className="font-bold text-lg">${deliveryFee.toFixed(2)}</p>
        </div>
        <div className="flex flex-row items-center justify-between ">
          <p className="text-xl">Total</p>
          <p className="font-bold text-2xl">${total.toFixed(2)}</p>
        </div>
      </div>
      {step == 1 ? <></> :
        <div className="flex flex-row gap-x-3">
          {/* <PromoField />

          <div className="w-[30%]">
            <RoundedButton
              label="Apply"
              onClick={()=>dispatch(fetchPromoCodeDiscount({ promoCode: promoCode, id: user.id}))}
              className=" bg-black border-black text-white font-medium px-6 py-3.5"
            />
          </div> */}
        </div>
      }

      {step === 2 && (
        <div className="flex flex-col gap-y-6">
          <p>Choose Payment Method</p>
          <div
            onClick={() => setPayment(0)}
            className="flex flex-col items-left justify-between cursor-pointer"
          >
            <div className=" flex flex-row items-center gap-x-4">
              <div className="w-6 h-6 bgtra rounded-full border-2 border-black flex justify-center items-center">
                {payment == 0 && (
                  <div className="min-w-3.5 min-h-3.5 rounded-full bg-black"></div>
                )}
              </div>

              <p>Bank</p>
            </div>

            <div className="flex flex-row gap-x-2 ">
              {
                payment == 0 && (
                  <StripeForm amount={total} handleButton={handleButton} />
                )
              }
            </div>
          </div>
          <div
            onClick={() => setPayment(1)}
            className="flex flex-row items-center justify-between cursor-pointer"
          >
            <div className=" flex flex-row items-center gap-x-4">
              <div className="w-6 h-6 bgtra rounded-full border-2 border-black flex justify-center items-center">
                {payment == 1 && (
                  <div className="min-w-3.5 min-h-3.5 rounded-full bg-black"></div>
                )}
              </div>

              <p>Cash on delivery</p>
            </div>
          </div>
        </div>
      )}
      {
        step === 1 && (
          <RoundedButton
            onClick={handleButton}
            // label="Go to Checkout"
            label={"Go to Checkout"}
            className=" bg-primary border-primary text-white font-medium px-6 py-3.5"
          />
        )


      }
      {
        payment == 1 && step === 2 && (
          <RoundedButton
            onClick={handleOrder}
            // label="Go to Checkout"
            label={"Place an Order"}
            className=" bg-primary border-primary text-white font-medium px-6 py-3.5"
          />)
      }
    </div>
  );
};

export default OrderSummary;

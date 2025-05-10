"use client"
import AddPaymentMethodDrawer from "@/components/drawers/buyer/add-payment-method/AddPaymentMethodDrawer";
import RemovePaymentMethodDrawer from "@/components/drawers/buyer/remove-payment-method/RemovePaymentMethodDrawer";
import { fetchPaymentMethodsThunk } from "@/redux/features/payment/paymentThunk";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const { paymentMethods } = useSelector((state) => state.payment);
  const { user } = useSelector((state) => state.users);
  const [openRemoveMethod, setOpenRemoveMethod] = useState(false);
  const [openAddCard, setOpenAddCard] = useState(false);

  const removePaymentMethod = () => {
    setOpenRemoveMethod(true);
  };

  const addPaymentMethod = () => {
    setOpenAddCard(true);
  };

  useEffect(() => {
    dispatch(fetchPaymentMethodsThunk(user?.id))
  }, [user?.id, dispatch]);

  return (
    <div className="flex flex-col mt-4 p-3">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl text-blackTwo mb-2">
          Payment Methods
        </h1>
        <button
          onClick={addPaymentMethod}
          className="rounded-[44px] bg-primary text-white px-[15px] py-[10px] text-base font-semibold md:px-[36.5px] md:py-[14px]"
        >
          New Payment Method
        </button>
      </div>
      <hr className="my-6" />
      {
        paymentMethods.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 mt-10">
            <Image
              src="/images/empty-image.jpg"
              width={100}
              height={100}
              alt="No Payment Method"
            />
            <p className="text-grayDark font-semibold text-lg">
              No payment method added yet
            </p>
          </div>
        ) : null
      }
      {paymentMethods.length > 0 && (

        <div className="flex flex-col gap-6">
          {paymentMethods.map((method, index) => (

            <div key={index} className="flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-lg">{method?.card_holder_name}</p>
                  <div
                    className={`bg-whiteLightest font-semibold ${method?.isPrimary ? 'text-greenText' : 'text-grayDark'} rounded-[6px] text-xs px-4 py-1`}
                  >
                    {method?.isPrimary ? 'Primary' : 'Secondary'}
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="rounded-[6px] p-1 bg-whiteDark">
                    <Image
                      src="/images/visa-logo.png"
                      className="md:w-[40px] w-[30px] h-auto"
                      width={40}
                      height={40}
                      alt="Visa"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{method?.type} {method?.card_no}</p>
                    <p className="text-grayDark font-semibold">
                      Card expires at {method?.expiry}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={removePaymentMethod}
                  className="bg-whiteLightest font-bold rounded-[6px] text-xs px-3 py-2"
                >
                  Remove
                </button>
              </div>
            </div>

          ))
          }
        </div>
      )}

      <hr className="my-6" />

      <AddPaymentMethodDrawer
        setDrawerOpen={setOpenAddCard}
        open={openAddCard}
      />
      <RemovePaymentMethodDrawer
        setDrawerOpen={setOpenRemoveMethod}
        open={openRemoveMethod}
      />
    </div>
  );
};

export default PaymentMethod;

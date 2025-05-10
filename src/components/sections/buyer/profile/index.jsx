"use client"
import React, { useEffect } from "react";
import SetupProfile from "./SetupProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuyerById } from "@/redux/features/auth/authThunk";

const Settings = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(fetchBuyerById(user?.id))
  }, [dispatch, user?.id])

  return (
    <div className="flex w-full flex-col gap-[30px]">
      <SetupProfile />
      <UpdatePassword />
      <DeleteAccount />
    </div>
  );
};

export default Settings;

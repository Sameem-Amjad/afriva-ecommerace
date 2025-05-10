import DeleteAccountPopup from "@/components/drawers/buyer/DeleteAccountPopup";
import React, { useState } from "react";

const DeleteAccount = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const deleteAccount = () => {
    setDrawerOpen(true);
  };

  return (
    <div className="w-full rounded-[12px] bg-white px-[24px] py-[40px] shadow-md">
      <div className="flex flex-col gap-[10px]">
        <h1 className="text-2xl font-semibold">Delete Account</h1>
        <div className="flex w-full items-center justify-between">
          <div className="font-semibold">
            It’ll permanently delete your account from Afriva.
          </div>

          <button
            onClick={deleteAccount}
            className="h-[50px] w-[142px] rounded-[5px] border border-danger px-[5px] py-[3px] text-danger"
          >
            Delete
          </button>
        </div>
      </div>
      <DeleteAccountPopup setDrawerOpen={setDrawerOpen} open={drawerOpen} />
    </div>
  );
};

export default DeleteAccount;

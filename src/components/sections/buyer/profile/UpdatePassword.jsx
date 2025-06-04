import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { reAuthenticate, updateUserPassword } from "@/redux/features/auth/authThunk";
import { useRouter } from "next/navigation";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [updatePassword, setUpdatePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useSelector((state) => state.users);

  const handleReauthenticateAndUpdate = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Reauthenticate the user
      const response = await dispatch(
        reAuthenticate({
          email: user?.email,
          password: oldPassword,
        })
      ).unwrap();
      // console.log("response", response)
      if (response.success) {
        await dispatch(
          updateUserPassword({
            email: user?.email,
            newPassword,
          })
        ).unwrap();
        toast.success("Password updated successfully!");
        setUpdatePassword(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error("Old password is incorrect. Please login again.");
        setUpdatePassword(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        router.push("/login")

      }
    } catch (error) {
      toast.error("Failed to update password. Please check your old password and try again.");
      console.error("Error updating password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-[12px] bg-white px-[24px] py-[40px] shadow-md">
      <div className="flex flex-col gap-[10px]">
        <h1 className="text-2xl font-semibold">Update Password</h1>
        <p className="my-3 font-semibold">
          {updatePassword
            ? "Enter your new password below."
            : "Please enter your old password to proceed."}
        </p>
        {!updatePassword && (
          <div className="flex w-full flex-col gap-1">
            <div className="relative flex w-full items-center md:w-1/2">
              <input
                type="password"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="h-[38px] w-full rounded-[5px] border border-[#B9B9C3] bg-backgroundSecondary py-[8px] pl-[15px] pr-[10px] disabled:bg-grayOne"
              />
              <button
                onClick={() => setUpdatePassword(true)}
                className="absolute right-2 top-1/2 -translate-y-1/2 transform text-base font-semibold underline"
              >
                Change Password
              </button>
            </div>
          </div>
        )}
      </div>
      {updatePassword && (
        <form className="flex flex-col gap-[20px]" onSubmit={handleReauthenticateAndUpdate}>
          <div className="flex w-full flex-col gap-1">
            <div className="flex w-1/2 items-center">
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-[38px] w-full rounded-[5px] border border-[#B9B9C3] bg-backgroundSecondary py-[8px] pl-[15px] pr-[10px] disabled:bg-grayOne"
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-1">
            <div className="flex w-1/2 items-center">
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-[38px] w-full rounded-[5px] border border-[#B9B9C3] bg-backgroundSecondary py-[8px] pl-[15px] pr-[10px] disabled:bg-grayOne"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-[172px] rounded-[5px] text-white bg-primary px-[10px] py-[10px] disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdatePassword;
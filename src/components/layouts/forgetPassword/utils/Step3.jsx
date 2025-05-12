import CommonButton from "@/components/buttons/CommonButton";
import EmailField from "@/components/fields/EmailField";
import PasswordField from "@/components/fields/PasswordField";
import { logout, updateUserPassword } from "@/redux/features/auth/authThunk";
import { backArrow, passwordIcon, successIcon, tickIcon } from "@/utils/Svgs";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Step3 = ({ step, setStep, email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [condition, setCondition] = useState({
    length: false,
    specialChar: true,
  });
  const {user} = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const handleNext = () => {
    if (password.length < 8) {
      setCondition({ ...condition, length: false });
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setCondition({ ...condition, specialChar: false });
      toast.error("Password must contain at least one special character");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(
      updateUserPassword({
        email:email || user.email,
        newPassword:password
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Password reset successfully");
        setStep(step + 1);
      })
      .catch((error) => {
        toast.error(error);
        
      });
      dispatch(logout());
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 flex justify-center items-center rounded-full border-successButton border bg-white shadow-successShadow mb-6">
        {passwordIcon}
      </div>
      <h1 className="font-semibold text-4xl pb-3 text-center">
        Set new password
      </h1>
      <p className="text-base text-text text-center">
        Your new password must be different to previously used passwords.
      </p>

      <div className="w-full mt-8">
        <PasswordField
          label="Password"
          name="password"
          placeholder="Enter password"
          password={password}
          setPassword={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="w-full mt-8">
        <PasswordField
          label="Confirm Password"
          name="Confirm Password"
          placeholder="Enter password"
          password={confirmPassword}
          setPassword={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-full gap-x-2 mt-8 gap-y-3">
        <div
          className={`flex flex-row gap-x-2 ${condition.length ? "text-primary font-medium" : "text-grayIcon"
            }`}
        >
          {tickIcon}
          <p className="text-black">Must be at least 8 characters</p>
        </div>
        <div
          className={`flex flex-row gap-x-2 ${condition.specialChar ? "text-primary font-medium" : "text-grayIcon"
            }`}
        >
          {tickIcon}
          <p className="text-black">Must contain one special character</p>
        </div>
      </div>

      <div className="w-full mt-8">
        <CommonButton
          type="submit"
          label="Reset password"
          className="py-3 mt-6 text-base "
          disabled={loading}
          onClick={handleNext}
        />
      </div>

      <div className="flex flex-row justify-center gap-x-2 mt-8">
        <Link
          href="/login"
          className="cursor-pointer font-semibold transition-opacity duration-300 ease-in hover:opacity-75 ml-1 text-secondaryText flex flex-row items-center gap-x-3"
        >
          {backArrow}
          Back to log in
        </Link>
      </div>

      <div className="flex flex-row gap-x-4 mt-20">
        <div className="w-3 h-3 rounded-full bg-grayColor"></div>
        <div className="w-3 h-3 rounded-full bg-grayColor"></div>
        <div className="w-3 h-3 rounded-full bg-forgot-gradient"></div>
        <div className="w-3 h-3 rounded-full bg-grayColor"></div>
      </div>
    </div>
  );
};

export default Step3;

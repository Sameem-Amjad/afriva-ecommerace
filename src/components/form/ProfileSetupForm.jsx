"use client";
import React from "react";
import EmailField from "../fields/EmailField";
import PasswordField from "../fields/PasswordField";
import Link from "next/link";
import CommonButton from "../buttons/CommonButton";
import DropdownField from "../fields/DropdownField";
import CountryField from "../fields/CountryField";
import TextField from "../fields/TextField";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterFormData } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
const ProfileSetupForm = () => {
  const router = useRouter();
  const [type, setType] = React.useState("");
  const [value, setValue] = React.useState("");
  const [id, setId] = React.useState("");
  const dispatch = useDispatch();
  const {loading,registerFormData} = useSelector((state) => state.users);

  const handleVerify = () => {
    if(value === "" || id === "" || type === "") {
      toast.error("Please fill all the fields")
      return;
    }
    dispatch(setRegisterFormData({ field: "country", value: value }));
    dispatch(setRegisterFormData({ field: "countryid", value: id }));
    dispatch(setRegisterFormData({ field: "accounttype", value: type.toUpperCase()+" countries" }));
    router.push("/complete-profile");
  };

  return (
    <div className="flex flex-col mt-5 gap-y-5">
      <DropdownField
         label="Continent"
         name="continent"
         value={type}
         setValue={setType}
      />

      <CountryField
        label="Country"
        value={value}
        setValue={setValue}
        continent={type}
        setCountryId={setId}
      />

      <TextField
        label="Country ID"
        name="Country ID"
        placeholder="Enter Country ID"
        text={id}
        setText={(e) => setId(e.target.value)}
      />

      <CommonButton
        type="submit"
        label="Verify"
        className="py-3 mt-6 text-base "
        disabled={loading}
        onClick={handleVerify}
      />
    </div>
  );
};

export default ProfileSetupForm;

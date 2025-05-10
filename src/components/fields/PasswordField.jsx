import { disabledEyeIcon, eyeIcon } from "@/utils/Svgs";
import React, { useState } from "react";

const PasswordField = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex w-full flex-col gap-y-0.5">
      <label className="text-base font-medium text-black" htmlFor="password">
        {props.label}
      </label>
      <div
        className={`flex w-full flex-row items-center border-fieldBorder focus-within:outline-placeholder justify-between rounded-md border px-4 py-3 text-black focus-within:border-transparent focus-within:outline focus-within:outline-2`}
      >
        <input
          name={props.name}
          value={props.password}
          onChange={props.setPassword}
          className="w-[90%] text-xs placeholder:text-placeholder focus:outline-none font-medium"
          type={showPassword ? "text" : "password"}
          placeholder={props.placeholder}
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? disabledEyeIcon : eyeIcon}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;

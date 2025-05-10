import React from "react";

const EmailField = (props) => {
  return (
    <div className="flex w-full flex-col gap-y-2">
      <label className="text-base font-medium text-black" htmlFor="email">
        {props.label}
      </label>
      <input
        name={props.name}
        defaultValue={props.email}
        onChange={props.setEmail}
        className={`flex w-full rounded-md border focus:outline-placeholder px-4 py-3 text-xs text-black placeholder:text-placeholder font-medium`}
        type="email"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default EmailField;

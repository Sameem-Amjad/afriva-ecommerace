import React from "react";

const TextField = (props) => {
  return (
    <div className="flex w-full flex-col gap-y-2">
      <label className="text-base font-medium text-black" htmlFor="text">
        {props.label}
      </label>
      <input
        name={props.name}
        defaultValue={props.text}
        onChange={props.setText}
        className={`flex w-full rounded-md border focus:outline-placeholder px-4 py-3 text-xs text-black placeholder:text-placeholder font-medium`}
        type={props?.type || "text"}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default TextField;

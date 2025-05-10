import React from "react";

const ReviewBox = (props) => {
  return (
    <div className="flex w-full flex-col gap-y-2">
      <label className="text-base font-medium text-black" htmlFor="text">
        {props.label}
      </label>
      <textarea
        rows={4}
        name={props.name}
        value={props.text}
        onChange={props.setText}
        className={`resize-none flex w-full rounded-md border focus:outline-placeholder px-4 py-3 text-xs text-black placeholder:text-placeholder font-medium`}
        type="text"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default ReviewBox;

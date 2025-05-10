"use client";
import useRipple from "@/hooks/useRipple";
import { whiteLoader } from "@/utils/Svgs";
import React, { useRef } from "react";

const RoundedButton = (props) => {
  const ref = useRef();
  const ripple = useRipple(ref);
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      ref={ref}
      className={`relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full border transition-opacity duration-300 ease-in hover:opacity-85 ${props.className} shadow-buttonShadow`}
    >
      {ripple}

      {!props.disabled && (
        <p className="font-medium tracking-wider">{props.label}</p>
      )}
      {props.disabled && <div className="animate-spin">{whiteLoader}</div>}
    </button>
  );
};

export default RoundedButton;

"use client";
import React, { useRef, useEffect } from "react";
import { setRegisterFormData } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";

export default function EnterCode({
  callback,
  reset,
  code, setCode
}) {
  const DIGIT_COUNT = 4;
  const { registerFormData, loading } = useSelector((state) => state.users);
  const inputRefs = useRef([]);

  // Reset all inputs and clear state
  const resetCode = () => {
    setCode("");
    inputRefs.current.forEach((ref) => {
      if (ref) ref.value = "";
    });
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  };

  useEffect(() => {
    if (code.length === DIGIT_COUNT) {
      setRegisterFormData({ ...registerFormData, otp: code });
    }
  }, [code]); //eslint-disable-line

  useEffect(() => {
    resetCode();
  }, [reset]); //eslint-disable-line

  // Keep input values in sync with code state
  useEffect(() => {
    for (let i = 0; i < DIGIT_COUNT; i++) {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = code[i] || "";
      }
    }
  }, [code]);

  function handleInput(e, idx) {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;
    const newCode = code.split("");
    newCode[idx] = val[0];
    setCode(newCode.join("").padEnd(DIGIT_COUNT, ""));
    // Move to next input
    if (idx < DIGIT_COUNT - 1) {
      inputRefs.current[idx + 1].focus();
    }
  }

  function handleKeyDown(e, idx) {
    if (e.key === "Backspace") {
      if (code[idx]) {
        // Remove current digit
        const newCode = code.split("");
        newCode[idx] = "";
        setCode(newCode.join(""));
      } else if (idx > 0) {
        // Move to previous input
        inputRefs.current[idx - 1].focus();
        const newCode = code.split("");
        newCode[idx - 1] = "";
        setCode(newCode.join(""));
      }
      e.preventDefault();
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputRefs.current[idx - 1].focus();
    } else if (e.key === "ArrowRight" && idx < DIGIT_COUNT - 1) {
      inputRefs.current[idx + 1].focus();
    }
  }

  function handlePaste(e) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, DIGIT_COUNT);
    if (pasted) {
      setCode(pasted.padEnd(DIGIT_COUNT, ""));
      setTimeout(() => {
        if (inputRefs.current[pasted.length - 1]) {
          inputRefs.current[pasted.length - 1].focus();
        }
      }, 0);
    }
    e.preventDefault();
  }

  return (
    <div className="flex justify-between relative">
      {Array.from({ length: DIGIT_COUNT }).map((_, idx) => (
        <input
          key={idx}
          ref={el => inputRefs.current[idx] = el}
          className="text-5xl bg-transparent w-14 h-20 flex text-center border border-fieldBorder rounded-full focus:outline-none focus:border-primary text-primary placeholder:placeholder"
          placeholder="0"
          type="text"
          maxLength={1}
          autoFocus={idx === 0}
          onChange={e => handleInput(e, idx)}
          onKeyDown={e => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          disabled={loading}
        />
      ))}
    </div>
  );
}

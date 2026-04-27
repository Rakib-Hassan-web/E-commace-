"use client";

import React from "react";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  disabled = false,
  className = "",
  inputClassName = "",
  prefix,
  suffix,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label ? (
        <label className="text-sm font-semibold text-[#0D0E43]">{label}</label>
      ) : null}
      <div
        className={`flex items-center rounded-lg border border-[#E7E6EF] bg-white ${prefix || suffix ? "overflow-hidden" : ""}`}
      >
        {prefix ? <span className="px-3 text-[#0D0E43]">{prefix}</span> : null}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`flex-1 bg-transparent px-4 py-3 text-base text-[#0D0E43] outline-none transition disabled:cursor-not-allowed disabled:bg-[#F5F4FA] ${inputClassName}`}
          {...props}
        />
        {suffix ? <span className="px-3">{suffix}</span> : null}
      </div>
    </div>
  );
};

export default Input;

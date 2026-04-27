"use client";

import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-lg bg-[#FB2E86] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e01f73] disabled:cursor-not-allowed disabled:bg-[#f7a8c7] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

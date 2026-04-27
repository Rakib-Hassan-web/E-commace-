"use client";

import { useState, useRef, useEffect } from "react";

export default function OTPVerifyPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef([]);

  // ⏳ Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const finalOtp = otp.join("");
    if (finalOtp.length < 6) {
      alert("Please enter full OTP");
      return;
    }

    console.log("OTP:", finalOtp);
    // 👉 Verify API call here
  };

  const handleResend = () => {
    if (!canResend) return;

    console.log("Resend OTP called");
    // 👉 Resend API call here

    setTimer(30);
    setCanResend(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px] text-center">
        <h1 className="text-2xl font-bold mb-2">Verify OTP</h1>
        <p className="text-gray-500 mb-6">Enter the 6-digit code sent to your email</p>

        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Verify
        </button>

        <div className="mt-4 text-sm">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-blue-600 hover:underline"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-500">Resend OTP in {timer}s</p>
          )}
        </div>
      </div>
    </div>
  );
}

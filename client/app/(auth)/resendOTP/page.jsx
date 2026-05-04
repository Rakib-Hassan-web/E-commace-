"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiMail } from "react-icons/fi";
import fetchWithRefresh from "@/utils/fetchWithRefresh";

const ResendOTPPage = () => {
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  // countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // resend OTP
  const handleResend = async () => {
    if (!email) {
      return toast.error("Email is required");
    }

    try {
      const res = await fetchWithRefresh("/api/auth/resendotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Failed to resend OTP");
      }

      toast.success("OTP sent successfully!");

      // start timer (60 sec)
      setTimeLeft(60);

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300">

      <Toaster position="top-right" />

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Resend OTP
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Enter your email to receive a new OTP
        </p>

        {/* Email Input */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-4 focus-within:ring-2 focus-within:ring-yellow-400">
          <FiMail className="text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full outline-none bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleResend}
          disabled={timeLeft > 0}
          className={`w-full font-semibold py-2 rounded-lg transition ${
            timeLeft > 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
          }`}
        >
          {timeLeft > 0 ? `Wait ${timeLeft}s` : "Resend OTP"}
        </button>

        {/* Info */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Didn’t receive OTP? Check spam folder
        </p>

      </div>
    </section>
  );
};

export default ResendOTPPage;
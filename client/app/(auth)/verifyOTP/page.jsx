'use client';

import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { verifyOtp, resendOtp } from "@/lib/authApi";

const OTPPage = () => {
  const router = useRouter();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);
  const inputsRef = useRef([]);

  // Handle input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // move to next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Submit OTP
  const handleSubmit = () => {
    const finalOtp = otp.join("");

    if (finalOtp.length < 6) {
      return toast.error("Enter complete OTP");
    }

    // 🔥 API call here
    const email = window.localStorage.getItem("verifyEmail");
    if (!email) return toast.error("Email not found. Please register again.");

    (async () => {
      try {
        const { ok, status, body } = await verifyOtp({ email, otp: finalOtp });
        const data = body;
        if (!ok) return toast.error(data.message || "OTP verification failed");
        toast.success(data.message || "OTP Verified Successfully");
        setTimeout(() => {
          router.push("/Login");
        }, 1200);
      } catch (err) {
        console.error(err);
        toast.error("Server error. Try again later.");
      }
    })();
  };

  // Resend OTP
  const handleResend = () => {
    const email = window.localStorage.getItem("verifyEmail");
    if (!email) return toast.error("Email not found. Please register again.");

    (async () => {
      try {
        const { ok, status, body } = await resendOtp({ email });
        const data = body;
        if (!ok) return toast.error(data.message || "Failed to resend OTP");
        toast.success(data.message || "OTP Resent!");
        setTimeLeft(60);
      } catch (err) {
        console.error(err);
        toast.error("Server error. Try again later.");
      }
    })();
  };

  // read email from storage for display
  const [email, setEmail] = useState("");
  useEffect(() => {
    try {
      const e = window.localStorage.getItem("verifyEmail");
      if (e) setEmail(e);
    } catch (e) {}
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300">

      <Toaster position="top-right" />

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Verify OTP
        </h2>
        <p className="text-gray-500 mb-6">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-2 mb-6">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
        >
          Verify OTP
        </button>

        {/* Timer & Resend */}
        <div className="mt-4 text-sm text-gray-600">
          {timeLeft > 0 ? (
            <p>Resend OTP in {timeLeft}s</p>
          ) : (
            <button
              onClick={handleResend}
              className="text-yellow-600 font-semibold hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default OTPPage;
'use client';

import React, { useState } from "react";
import { FiMail, FiUser, FiLock } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import Input from "@/utils/Input";
import Button from "@/utils/Button";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/authApi";

const Page = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    nameErr: "",
    emailErr: "",
    passwordErr: "",
  });

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();

    console.log("📤 Sending data:", userData); // 🔥 DEBUG

    // frontend validation
    if (!userData.fullName || !userData.email || !userData.password) {
      console.log("❌ Frontend validation failed");

      setErrors({
        nameErr: !userData.fullName ? "Full Name is required" : "",
        emailErr: !userData.email ? "Email is required" : "",
        passwordErr: !userData.password ? "Password is required" : "",
      });

      return;
    }

    try {
      const { ok, status, body } = await registerUser(userData);
      const data = body;

      console.log("📩 Backend response:", data);
      console.log("📡 Status:", status);

      if (!ok) {
        toast.error(data.message || "Registration failed");
        setErrors({ nameErr: "", emailErr: "", passwordErr: "" });
        if (data.message?.toLowerCase().includes("name")) setErrors((prev) => ({ ...prev, nameErr: data.message }));
        if (data.message?.toLowerCase().includes("email")) setErrors((prev) => ({ ...prev, emailErr: data.message }));
        if (data.message?.toLowerCase().includes("password")) setErrors((prev) => ({ ...prev, passwordErr: data.message }));
        return;
      }

      // ✅ SUCCESS
      try { window.localStorage.setItem("verifyEmail", userData.email); } catch (e) {}

      const respData = data?.data || {};
      if (respData.previewUrl) {
        console.log("Preview URL:", respData.previewUrl);
        toast.success("Verification email preview available (check console)");
      }
      // do NOT store OTP in localStorage — show once for dev convenience
      if (respData.otp) {
        console.log("Dev OTP:", respData.otp);
        toast.success(`Dev OTP: ${respData.otp}`);
      }
      toast.success(data.message || "Registration Successful");

      setUserData({ fullName: "", email: "", password: "" });
      setErrors({ nameErr: "", emailErr: "", passwordErr: "" });

      setTimeout(() => {
        router.push("/verifyOTP");
      }, 1200);
    } catch (error) {
      console.log("🔥 CATCH ERROR:", error);
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FBEBB5] to-[#F5D491]">

      <Toaster position="top-right" />

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <form onSubmit={handelSubmit} className="space-y-5">

          <Input
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, fullName: e.target.value }));
              setErrors((prev) => ({ ...prev, nameErr: "" }));
            }}
            value={userData.fullName}
            label="Username"
            placeholder="Enter your username"
            error={errors?.nameErr}
            prefix={<FiUser className="text-gray-500" />}
          />

          <Input
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, email: e.target.value }));
              setErrors((prev) => ({ ...prev, emailErr: "" }));
            }}
            value={userData.email}
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            error={errors?.emailErr}
            prefix={<FiMail className="text-gray-500" />}
          />

          <Input
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, password: e.target.value }));
              setErrors((prev) => ({ ...prev, passwordErr: "" }));
            }}
            value={userData.password}
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            error={errors?.passwordErr}
            prefix={<FiLock className="text-gray-500" />}
            suffix={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            }
          />

          <Button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-xl hover:bg-yellow-500 transition"
          >
            Register
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/Login" className="font-semibold text-yellow-500 hover:underline">
              Login
            </Link>
          </p>

        </form>
      </div>
    </section>
  );
};

export default Page;
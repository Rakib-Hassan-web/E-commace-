'use client';
import React, { useState } from "react";
import { FiMail, FiUser, FiLock } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import Input from "@/utils/Input";
import Button from "@/utils/Button";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation"; // ✅ add this

const page = () => {

  const router = useRouter(); // ✅ add this

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

    // ✅ frontend validation (important)
    if (!userData.fullName || !userData.email || !userData.password) {
      setErrors({
        nameErr: !userData.fullName ? "Full Name is required" : "",
        emailErr: !userData.email ? "Email is required" : "",
        passwordErr: !userData.password ? "Password is required" : "",
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/auth/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        // ✅ reset errors first
        setErrors({
          nameErr: "",
          emailErr: "",
          passwordErr: "",
        });

        if (data.message === "Full Name is required")
          setErrors((prev) => ({ ...prev, nameErr: data.message }));

        if (
          data.message === "Email is required" ||
          data.message === "Enter a valid email address" ||
          data.message === "Email already exist"
        )
          setErrors((prev) => ({ ...prev, emailErr: data.message }));

        if (data.message === "Password is required")
          setErrors((prev) => ({ ...prev, passwordErr: data.message }));

        return;
      }

      // ✅ success
      toast.success(data.message);

      setTimeout(() => {
        router.push("/otp"); // 👉 OTP page redirect
      }, 2000);

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FBEBB5] to-[#F5D491]">
      <Toaster />
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

export default page;
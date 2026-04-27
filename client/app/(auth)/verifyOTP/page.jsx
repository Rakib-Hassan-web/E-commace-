'use client';
import React, { useState } from "react";
import { FiMail, FiUser, FiLock } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import Input from "@/utils/Input";
import Button from "@/utils/Button";
import toast, { Toaster } from "react-hot-toast";

const page = () => {

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

  const [showPassword, setShowPassword] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();

    // -------------------Frontend validation
    if (!userData.fullName || !userData.email || !userData.password) {
      setErrors({
        nameErr: !userData.fullName ? "Full Name is required" : "",
        emailErr: !userData.email ? "Email is required" : "",
        passwordErr: !userData.password ? "Password is required" : "",
      });

      toast.error("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/auth/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      console.log("STATUS:", res.status);
      console.log("DATA:", data);

      // --------------------SUCCESS
      if (res.ok) {
        toast.success(data?.message || "Registration Successful");

        setTimeout(() => {
          window.location.href = "/otp"; // redirect
        }, 2000);
      } 
      //--------------- ERROR
      else {
        toast.error(data?.message || "Registration failed");

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
      }

    } catch (error) {
      console.log("FETCH ERROR:", error);
      toast.error("Server connection failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FBEBB5] to-[#F5D491]">
      
      {/* ---------------Toaster must be here */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account 
        </h2>

        <form onSubmit={handelSubmit} className="space-y-5">

          {/* ---------Username ---------*/}
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

          {/* -------------Email -------------*/}
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

          {/*--------------- Password ----------*/}
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
                className="text-gray-500"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-xl" />
                ) : (
                  <AiOutlineEye className="text-xl" />
                )}
              </button>
            }
          />

          {/* Button */}
          <Button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-xl hover:bg-yellow-500 transition"
          >
            Register
          </Button>

          {/* Login Link */}
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
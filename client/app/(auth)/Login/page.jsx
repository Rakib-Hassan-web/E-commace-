'use client';
import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ important
import Input from "@/utils/Input";
import Button from "@/utils/Button";
import toast, { Toaster } from 'react-hot-toast';

const Page = () => {
  const router = useRouter(); // ✅ router init

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    emailErr: "",
    passwordErr: "",
    credientailErr: "",
  });

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        // ✅ toast for error
        toast.error(data.message);

        if (
          data.message === "Email is required" ||
          data.message === "Enter a valid email address" ||
          data.message === "Email is not verified"
        ) {
          setErrors((prev) => ({ ...prev, emailErr: data.message }));
        }

        if (data.message === "Password is required") {
          setErrors((prev) => ({ ...prev, passwordErr: data.message }));
        }

        if (data.message === "Invalid Crediential") {
          setErrors((prev) => ({ ...prev, credientailErr: data.message }));
        }

        return;
      }

      // handle success + role-aware redirect
      const userRole = data?.data?.role;
      if (userRole && userRole !== "admin") {
        toast.error("You are not authorized to access the admin panel");
         setTimeout(() => {
          router.push("/");
        }, 1200);
        return;
      }

      toast.success(data.message || "Login Successful");
      // redirect to dashboard only for admin
      if (userRole === "admin") {
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FBEBB5] to-[#F5D491]">
      
      {/* ✅ Toaster top level */}
      <Toaster position="top-right" />

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login Here
        </h2>

        <form onSubmit={handelSubmit} className="space-y-5">
          
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
            inputClassName="bg-transparent outline-none"
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
                className="text-gray-500 focus:outline-none"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-xl" />
                ) : (
                  <AiOutlineEye className="text-xl" />
                )}
              </button>
            }
            inputClassName="bg-transparent outline-none"
          />

          <div className="flex justify-between items-center text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-yellow-400" />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:text-yellow-500">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-xl hover:bg-yellow-500 transition"
          >
            Login
          </Button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/Register" className="font-semibold text-yellow-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Page;
'use client';
import React from "react";
import Image from "next/image";
import Input from "@/utils/Input";
import Button from "@/utils/Button";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaShippingFast } from "react-icons/fa";
import { MdForum } from "react-icons/md";
// import contactImg from "@/public/contact-illustration.jpg"; // নিচে নোট দেখো

const page = () => {
  return (
    <main className="bg-white text-gray-800 mt-[143px]">
      {/* ---------- Top Info Section ---------- */}
      <section className="container mx-auto px-6 py-16 flex flex-col md:flex-row  justify-around gap-10">
        {/* Left Side: Info About Us */}
        <div className="">
          <h2 className=" font-normal font-adaminaaa text-[36px] mb-4 text-blumain">Information About Us</h2>
          <p className="text-[16px] font-lato font-medium    text-[#8a8fb9b9] mb-6 leading-relaxed w-[550px]"> 
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam, malesuada diam est. Malesuada sem tristique amet erat vitae eget dolor lobortis. Accumsan faucibus vitae lobortis quis bibendum quam.
          </p>

          {/* Dots */}
          <div className="flex gap-3">
            <span className="w-4 h-4 rounded-full bg-pink-500"></span>
            <span className="w-4 h-4 rounded-full bg-purple-500"></span>
            <span className="w-4 h-4 rounded-full bg-blue-500"></span>
          </div>
        </div>

        {/* Right Side: Contact Way */}
        <div className=" flex flex-col gap-3">
          <h2 className="text-2xl  font-adaminaaa text-blumain text-[36px] font-normal  mb-4 ">Contact Way</h2>

          <div className="flex items-start gap-3 text-gray-700">
            <FaPhoneAlt className="text-pink-600 mt-1 text-2xl" />
            <div>
              <p className="text-[16px] font-lato font-medium    text-[#8a8fb9b9]"> Tel: 877-67-88-99</p>
              <p className="text-[16px] font-lato font-medium    text-[#8a8fb9b9]">E-Mail: shop@store.com</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-gray-700">
            <MdForum className="text-pink-600 mt-1 text-2xl" />
            <p className="text-[16px] font-lato font-medium    text-[#8a8fb9b9]">Support Forum <br /> For over 24hr</p>
          </div>

          <div className="flex items-start gap-3 text-gray-700">
            <FaMapMarkerAlt className="text-orange-400 mt-1 text-2xl" />
            <p className="text-[16px] font-lato font-medium    text-[#8a8fb9b9]">
              20 Margaret st, London <br />
              Great Britain, 3NM98-LK
            </p>
          </div>

          <div className="flex items-start gap-3 text-gray-700">
            <FaShippingFast className="text-green-500 mt-1 text-2xl" />
            <p className="text-[16px] font-lato font-medium    text-[#8a8fb9b9]">Free standard shipping on all orders.</p>
          </div>
        </div>
      </section>

      {/* ---------- Get In Touch Section ---------- */}
      <section className="container mx-auto px-6 py-20  mt-10 mb-20 flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Left Side: Form */}
        <div className="">
          <h2 className="text-3xl  font-normal font-adaminaaa text-[36px] mb-4 text-blumain">Get In Touch</h2>
          <p className="text-[16px] font-lato font-medium    text-[#8a8fb9b9] mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices tristique amet erat vitae eget dolor.
          </p>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Your Name*"
                className="w-full"
                inputClassName="rounded-md"
              />
              <Input
                type="email"
                placeholder="Your E-mail*"
                className="w-full"
                inputClassName="rounded-md"
              />
            </div>

            <Input
              placeholder="Subject*"
              className="w-full"
              inputClassName="rounded-md"
            />
            <textarea
              placeholder="Type Your Message*"
              rows="5"
              className="border border-gray-300 p-3 rounded-md w-full focus:outline-pink-600 resize-none"
            ></textarea>

            <Button type="submit" className="w-fit">
              Send
            </Button>
          </form>
        </div>

        {/* Right Side: Illustration */}
        <div className="md:w-1/2 w-full flex justify-center">
 
        </div>
      </section>
    </main>
  );
};

export default page;

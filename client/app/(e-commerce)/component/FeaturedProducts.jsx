"use client";

import React from "react";
import Image from "next/image";

const FeaturedProducts = () => {
  return (
    <section id="products" className="mt-[100px] md:mt-[140px] lg:mt-[160px]">
      <div className="container mx-auto px-4">
        {/* ------- Title ------- */}
        <h1 className="font-aby font-normal text-[28px] sm:text-[36px] md:text-[42px] text-[#1A0B5B] text-center">
          Featured Products
        </h1>

        {/* ------- Product Grid ------- */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
          {/* ------- Single Card ------- */}
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="w-[90%] sm:w-[250px] md:w-[270px] h-auto shadow-[0px_4px_30px_0px_rgba(31,_38,_135,_0.15)] 
              rounded-md hover:bg-[#2F1AC4] hover:text-white duration-300 group p-3 sm:p-4"
            >
              <div className="w-full h-[200px] sm:h-[214px] bg-gray-100 flex items-center justify-center rounded-md">
                <Image
                  src="/placeholder.png"
                  width={200}
                  height={200}
                  alt="product image"
                  className="object-contain"
                />
              </div>

              <h2 className="text-[16px] sm:text-[18px] font-bold text-pink text-center mt-4 font-lato group-hover:text-white">
                Cantilever Chair
              </h2>

              <div className="flex justify-center items-center gap-2 mt-4">
                <button className="w-4 h-1.5 bg-red-500 rounded-full cursor-pointer"></button>
                <button className="w-4 h-1.5 bg-blue-500 rounded-full cursor-pointer"></button>
                <button className="w-4 h-1.5 bg-green-500 rounded-full cursor-pointer"></button>
              </div>

              <p className="text-[13px] sm:text-[14px] font-semibold text-[#151875] text-center mt-3 font-lato group-hover:text-white">
                Code - Y523201
              </p>
              <p className="text-[13px] sm:text-[14px] font-semibold text-[#151875] text-center mt-2 font-lato group-hover:text-white">
                $42.00
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

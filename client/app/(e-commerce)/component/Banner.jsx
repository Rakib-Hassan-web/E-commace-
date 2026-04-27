"use client";

import Link from 'next/link';
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <section className="relative bg-[#F2F0FF] overflow-hidden py-[100px] md:py-[150px] lg:py-[200px]">
      {/* Background decorative image */}
      <div className="absolute top-0 left-[-100px] hidden md:block">
        <Image
          src="/bannerDesign.png"
          width={387}
          height={387}
          alt="design"
          className="opacity-80"
        />
      </div>

      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between">
        
        {/* ---- Left Content ---- */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 text-center md:text-left">
          <h2 className="font-lato text-sm md:text-base font-bold text-pink tracking-wide">
            Best Furniture For Your Castle....
          </h2>

          <h1 className="mt-3 font-lato text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-[#1A0B5B] leading-tight md:leading-[64px]">
            New Furniture Collection <br className="hidden md:block" /> Trends In 2020
          </h1>

          <p className="font-lato text-sm sm:text-base text-[#8A8FB9] mt-3 md:mt-4 max-w-[560px] mx-auto md:mx-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
          </p>

          <div className="mt-6 md:mt-[43px] flex justify-center md:justify-start">
            <Link
              href="#"
              className="py-[12px] sm:py-[15px] px-[30px] sm:px-[43px] bg-pink rounded-[5px] text-white font-lato font-medium text-sm sm:text-base hover:bg-[#2F1AC4] duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* ---- Right Image ---- */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src="/bannerSofa.png"
            width={706}
            height={689}
            alt="sofa"
            className="w-[80%] sm:w-[70%] md:w-[90%] lg:w-auto h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;

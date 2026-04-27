'use client';
import React from "react";
import Image from "next/image";
import Button from "@/utils/Button";
import { FaTruck, FaMoneyCheckAlt, FaHeadset } from "react-icons/fa";
import { MdHighQuality } from "react-icons/md";


const AboutPage = () => {
return (
<main className="bg-white text-gray-800 mt-34">
  {/* ---------- Hero Section ---------- */}
  <div className="container   flex  md:flex-row items-center   justify-center gap-8">
    {/* Left Image */}
    <div className="">
      <Image src='/Group 73.png' width={570} height={490} alt="Image"></Image>
    </div>

    {/* Right Text */}
    <div className=" w-[550px] ">
      <h2 className="text-[36px] font-normal text-[#151875] font-adaminaaa mb-4">
        Know About Our Ecommerce Business, History
      </h2>
      <p className="text-[#8a8fb9a9]  text-base font-medium font-lato leading-relaxed mb-10 ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam, malesuada diam
        est. Malesuada sem tristique amet erat vitae eget dolor lobortis. Accumsan faucibus vitae lobortis quis bibendum
        quam.
      </p>
      <Button className="text-[18px] px-6 py-3">
        Contact Us
      </Button>
    </div>
  </div>
{/* -------middle prt------ */}
 <section id='prodects' className='mt-[135px]   '>
        <div className="container">
            <div>
                <h1 className=' font-aby font-normal text-[42px] text-[#1A0B5B] text-center'>Our Features</h1>
            </div>

            {/* ------------all carts------- */}
            <div className='flex items-center justify-around mt-15'>

                {/* ----------single cart---------- */}
                <div className='w-[290px] pb-20 shadow-[0px_4px_30px_0px_rgba(31,_38,_135,_0.15)] rounded-md  '>
                  
                  <div className='flex justify-center mt-14'>
                        <Image  
                        src={'/free-delivery 1.png'}
                        width={65}
                        height={43}
                        alt='logo'
                        
                          />
                        </div>
                    <h2 className='text-[22px] font-medium text-[#151875] text-center  font-adaminaaa mt-[27px] '>24/7 Support</h2>
                   
                    <p className='text-[16px] font-bold text-[#1a0b5b4e]  text-center  font-lato  px-6 mt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.</p>
                
                </div>

                   {/* ----------single cart---------- */}
                <div className='w-[290px] pb-20 shadow-[0px_4px_30px_0px_rgba(31,_38,_135,_0.15)] rounded-md  '>
                  
                  <div className='flex justify-center mt-14'>
                        <Image  
                        src={'/cashback 1.png'}
                        width={65}
                        height={43}
                        alt='logo' 
                        />
                        </div>

                    <h2 className='text-[22px] font-medium text-[#151875] text-center  font-adaminaaa mt-[27px] '>24/7 Support</h2>
                   
                    <p className='text-[16px] font-bold text-[#1a0b5b4e]  text-center  font-lato  px-6 mt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.</p>
                 
                </div>

                  {/* ----------single cart---------- */}
                <div className='w-[290px] pb-20 shadow-[0px_4px_30px_0px_rgba(31,_38,_135,_0.15)] rounded-md  '>
                  
                  <div className='flex justify-center mt-14'>
                        <Image  
                        src={'/premium-quality 1.png'}
                        width={65}
                        height={43}
                        alt='logo'
                        
                        
                        />
                        </div>


                    <h2 className='text-[22px] font-medium text-[#151875] text-center  font-adaminaaa mt-[27px] '>24/7 Support</h2>
                   
                    <p className='text-[16px] font-bold text-[#1a0b5b4e]  text-center  font-lato  px-6 mt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.</p>
                 
                </div>




                   {/* ----------single cart---------- */}
                <div className='w-[290px] pb-20 shadow-[0px_4px_30px_0px_rgba(31,_38,_135,_0.15)] rounded-md  '>
                  
                  <div className='flex justify-center mt-14'>
                        <Image  
                        src={'/24-hours-support 1.png'}
                        width={65}
                        height={43}
                        alt='logo'
                                        
                        />
                        </div>


                    <h2 className='text-[22px] font-medium text-[#151875] text-center  font-adaminaaa mt-[27px] '>24/7 Support</h2>
                   
                    <p className='text-[16px] font-bold text-[#1a0b5b4e]  text-center  font-lato  px-6 mt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.</p>
                 
                </div>
            </div>
        </div>
    </section>

  {/* ---------- Client Testimonial Section ---------- */}
  <section className="py-20 bg-[#FBFBFF] text-center mt-30 mb-40">
    <div className="container mx-auto px-6">
      <h3 className="text-[42px]  font-normal mb-12 font-adaminaaa ">Our Client Say!</h3>

      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Client Images */}
        <div className="flex justify-center gap-4 mb-6">
          <Image src="/user1.png" alt="Client 1" width={80} height={80} className="rounded-full bg-amber-100 "  />
          <Image src="/user2.png" alt="Client 2" width={80} height={80} className="rounded-full bg-amber-100" />
          <Image src="/user3.png" alt="Client 3" width={80} height={80} className="rounded-full bg-amber-100" />
        </div>

        <h4 className="font-semibold text-[#151875] text-[20px] font-lato mb-2">Selina Gomez</h4>
        <p className=" text-base mb-4 max-w-md    text-[#8a8fb9ea]   font-medium font-lato ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nulla ultrices quam vel elit tincidunt aliquet ac id eros.
          Nam vitae enim metus, sed dapibus sapien ac nunc. 
        </p>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          <span className="w-3 h-3 bg-pink-600 rounded-full"></span>
          <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
          <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
        </div>
      </div>
    </div>
  </section>
</main>
);
};

export default AboutPage;
import Link from 'next/link'
import React from 'react'
import { MdDone } from "react-icons/md";
import Image from 'next/image';

const Discount = () => {
  return (
    <>
      <section id='discount' className='pt-[80px] md:pt-[126px] bg-white px-4 md:px-10'>
        <div className="container mx-auto">

          {/* ---------- Heading ---------- */}
          <h1 className='font-aby font-normal text-[32px] md:text-[42px] text-[#1A0B5B] text-center'>
            Discount Item
          </h1>

          {/* ---------- Category Links ---------- */}
          <div className='flex flex-wrap items-center justify-center gap-5 md:gap-12 mt-4'>
            <Link href={'#'}
              className='font-normal text-[16px] md:text-[18px] font-lato text-[#151875] hover:underline hover:text-pink duration-300'>
              Wood Chair
            </Link>
            <Link href={'#'}
              className='font-normal text-[16px] md:text-[18px] font-lato text-[#151875] hover:underline hover:text-pink duration-300'>
              Plastic Chair
            </Link>
            <Link href={'#'}
              className='font-normal text-[16px] md:text-[18px] font-lato text-[#151875] hover:underline hover:text-pink duration-300'>
              Sofa Collection
            </Link>
          </div>

          {/* ---------- Bottom Content ---------- */}
          <div className='flex flex-col-reverse lg:flex-row justify-between items-center mt-12 lg:mt-16 gap-10'>

            {/* ---------- Left Text Section ---------- */}
            <div className='w-full lg:w-1/2 text-center lg:text-left'>
              <h2 className='text-[#1A0B5B] text-[28px] md:text-[35px] font-medium font-adaminaaa'>
                20% Discount Of All Products
              </h2>
              <p className='text-[18px] md:text-[21px] font-adaminaaa font-medium text-pink mt-2'>
                Eams Sofa Compact
              </p>

              <p className='max-w-[523px] mx-auto lg:mx-0 font-lato font-normal text-base text-[#B7BACB] mt-5'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget feugiat habitasse nec,
                bibendum condimentum.
              </p>

              {/* ---------- Feature List ---------- */}
              <div className='mt-7 flex flex-col gap-3'>
                <div className='flex flex-col sm:flex-row justify-center lg:justify-start items-start sm:items-center gap-4'>
                  <div className='flex items-center gap-2'>
                    <MdDone className='text-xl text-[#7569B2]' />
                    <p className='font-lato text-base text-[#B8B8DC]'>Material expose like metals</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <MdDone className='text-xl text-[#7569B2]' />
                    <p className='font-lato text-base text-[#B8B8DC]'>Clear lines and geometric figures</p>
                  </div>
                </div>

                <div className='flex flex-col sm:flex-row justify-center lg:justify-start items-start sm:items-center gap-4'>
                  <div className='flex items-center gap-2'>
                    <MdDone className='text-xl text-[#7569B2]' />
                    <p className='font-lato text-base text-[#B8B8DC]'>Simple neutral colours</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <MdDone className='text-xl text-[#7569B2]' />
                    <p className='font-lato text-base text-[#B8B8DC]'>Material expose like metals</p>
                  </div>
                </div>
              </div>

              {/* ---------- Button ---------- */}
              <div className='mt-8'>
                <Link href={'about'}
                  className='inline-block py-[12px] md:py-[15px] px-[35px] md:px-[43px] bg-pink rounded-[5px] text-white font-lato font-medium text-base hover:bg-[#2F1AC4] duration-300'>
                  Shop Now
                </Link>
              </div>
            </div>

            {/* ---------- Right Image Section ---------- */}
            <div className='w-full lg:w-1/2 flex justify-center'>
              <Image
                src={'/Group 154.png'}
                width={699}
                height={599}
                alt='product'
                className='w-[80%] md:w-[70%] lg:w-[100%] h-auto'
                priority
              />
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default Discount

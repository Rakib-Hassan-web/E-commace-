import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const UniqueProduct = () => {
  return (
    <>
      <section id='unique' className='mt-[100px] bg-[#F1F0FF] py-10 px-4'>
        <div className="container mx-auto">
          {/* flex layout for image + text */}
          <div className='flex flex-col lg:flex-row justify-between items-center gap-10'>

            {/* ----------image---------- */}
            <div className='flex justify-center w-full lg:w-1/2'>
              <Image
                src={"/Group 153.png"}
                width={558}
                height={550}
                alt='Product'
                className='w-full max-w-[450px] md:max-w-[500px] lg:max-w-[558px] h-auto object-contain'
              />
            </div>

            {/* ----------text section---------- */}
            <div className='w-full lg:w-1/2'>
              <h2 className='text-[#151875] text-[26px] sm:text-[30px] lg:text-[35px] font-medium font-adaminaaa leading-snug'>
                Unique Features Of leatest & Trending Products
              </h2>

              {/* bullet points */}
              <div className='mt-6 space-y-5'>
                <div className='flex gap-3 items-start'>
                  <span className='w-2 h-2 rounded-full bg-red-500 mt-2'></span>
                  <p className='font-lato font-medium text-[#6d6b7e] text-sm sm:text-base leading-relaxed'>
                    All frames constructed with hardwood solids and laminates
                  </p>
                </div>

                <div className='flex gap-3 items-start'>
                  <span className='w-2 h-2 rounded-full bg-blue-500 mt-2'></span>
                  <p className='font-lato font-medium text-[#6d6b7e] text-sm sm:text-base leading-relaxed'>
                    Reinforced with double wood dowels, glue, screw-nails corner blocks and machine nails
                  </p>
                </div>

                <div className='flex gap-3 items-start'>
                  <span className='w-2 h-2 rounded-full bg-green-500 mt-2'></span>
                  <p className='font-lato font-medium text-[#6d6b7e] text-sm sm:text-base leading-relaxed'>
                    Arms, backs and seats are structurally reinforced for long durability
                  </p>
                </div>
              </div>

              {/* ---------button + price section---------- */}
              <div className='flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center mt-10'>
                <Link
                  href={'#'}
                  className='py-[12px] px-[35px] sm:py-[15px] sm:px-[43px] bg-pink rounded-[5px] text-white font-adaminaaa font-medium text-sm sm:text-base hover:bg-[#2F1AC4] duration-300'
                >
                  Add To Cart
                </Link>

                <div className='flex flex-col'>
                  <h2 className='text-[#151875] text-base font-medium font-adaminaaa'>B&B Italian Sofa</h2>
                  <h2 className='text-[#151875] text-base font-medium font-adaminaaa'>$32.00</h2>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default UniqueProduct

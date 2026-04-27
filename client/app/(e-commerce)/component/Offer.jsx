import React from 'react'
import Image from 'next/image'

const Offer = () => {
  return (
    <>
      <section id='prodects' className='mt-[100px] px-4'>
        <div className="container mx-auto">
          {/* Heading */}
          <h1 className='font-aby font-normal text-[32px] md:text-[38px] lg:text-[42px] text-[#1A0B5B] text-center'>
            What Shopex Offer!
          </h1>

          {/* Cards Grid */}
          <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 justify-items-center'>
            {/* Single Card */}
            {[
              { img: '/free-delivery 1.png', title: 'Free Delivery' },
              { img: '/cashback 1.png', title: 'Cashback Offer' },
              { img: '/premium-quality 1.png', title: 'Premium Quality' },
              { img: '/24-hours-support 1.png', title: '24/7 Support' },
            ].map((item, index) => (
              <div
                key={index}
                className='w-full max-w-[290px] pb-10 md:pb-16 shadow-[0px_4px_30px_0px_rgba(31,_38,_135,_0.15)] rounded-md hover:shadow-lg transition duration-300 bg-white'
              >
                {/* Image */}
                <div className='flex justify-center mt-10'>
                  <Image
                    src={item.img}
                    width={65}
                    height={43}
                    alt={item.title}
                    className='object-contain'
                  />
                </div>

                {/* Title */}
                <h2 className='text-[20px] md:text-[22px] font-medium text-[#151875] text-center font-adaminaaa mt-[24px]'>
                  {item.title}
                </h2>

                {/* Description */}
                <p className='text-[14px] md:text-[16px] font-bold text-[#1a0b5b4e] text-center font-lato px-6 mt-3'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Offer

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Subscribe = () => {
  return (
    <section id='subscribe' className='relative py-40 sm:py-32'>
      {/* Background Image */}
      <div className='absolute inset-0 -z-10'>
        <Image
          src='/Group 162.png'
          alt='bg'
          fill
          className='object-cover w-full h-full'
          priority
        />
      </div>

      <div className='container mx-auto px-4 flex flex-col items-center justify-center text-center'>
        {/* Heading */}
        <h2 className='font-adaminaaa font-medium text-2xl sm:text-3xl md:text-4xl text-primany max-w-xl sm:max-w-2xl'>
          Get Latest Update By Subscribe Our Newsletter
        </h2>

        {/* Button */}
        <div className='mt-7'>
          <Link
            href='#'
            className='py-3 px-8 sm:py-4 sm:px-12 bg-pink rounded-md text-white font-lato font-medium text-base sm:text-lg hover:bg-[#2F1AC4] transition-colors duration-300'
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Subscribe

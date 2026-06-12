"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductImageSlider({ images = [], title }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const gallery = Array.from(new Set((images || []).filter(Boolean)));

  if (!gallery.length) return null;

  return (
    <div className="space-y-4">
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        spaceBetween={10}
        slidesPerView={1}
        className="rounded-2xl border border-gray-200 bg-gray-100 p-3 shadow-sm"
      >
        {gallery.map((img, index) => (
          <SwiperSlide key={`${img}-${index}`}>
            <div className="flex h-[320px] items-center justify-center rounded-xl bg-white md:h-[420px]">
              <img
                src={img}
                alt={`${title || "Product image"} ${index + 1}`}
                className="h-full w-full object-contain p-4"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        watchSlidesProgress
        spaceBetween={8}
        slidesPerView={4}
        className="thumbs-slider"
      >
        {gallery.map((img, index) => (
          <SwiperSlide key={`thumb-${img}-${index}`}>
            <div className="cursor-pointer rounded-xl border border-gray-200 bg-white p-1 transition hover:border-pink-400 hover:shadow-sm">
              <img
                src={img}
                alt={`${title || "Product thumbnail"} ${index + 1}`}
                className="h-20 w-full rounded-lg object-cover md:h-24"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

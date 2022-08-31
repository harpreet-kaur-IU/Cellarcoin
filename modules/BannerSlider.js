import React from 'react'
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import HomePageBanner from './HomePageBanner';

const BannerSlider = () => {
  return (
    <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}

        modules={[Pagination]}
        className={`home-banner-page-bars`}
    >
      <SwiperSlide className='swiper-slide'><HomePageBanner></HomePageBanner></SwiperSlide>
      <SwiperSlide className='swiper-slide'><HomePageBanner></HomePageBanner></SwiperSlide>
      <SwiperSlide className='swiper-slide'><HomePageBanner></HomePageBanner></SwiperSlide>
    </Swiper>
  )
}

export default BannerSlider
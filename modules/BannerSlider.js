import React from "react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import HomePageBanner from "./HomePageBanner";

const BannerSlider = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      pagination={{
        clickable: true,
      }}
      className={`home-banner-page-bars mySwiper`}
    >
      <SwiperSlide>
        <HomePageBanner></HomePageBanner>
      </SwiperSlide>
      <SwiperSlide>
        <HomePageBanner></HomePageBanner>
      </SwiperSlide>
      <SwiperSlide>
        <HomePageBanner></HomePageBanner>
      </SwiperSlide>
    </Swiper>
    // <div>swiper</div>
  );
};

export default BannerSlider;

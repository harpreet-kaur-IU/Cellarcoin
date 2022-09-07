import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode} from "swiper";
import 'swiper/css';
import WineCard from './WineCard';
import WineBottleHeader from './WineBottleHeader'
import style from './css/WineCard.module.css'
const WineCardSlider = () => {
  const [data,setData] = useState("")
  useEffect(()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getPremiumNft`, requestOptions)
    .then(response => response.json())
    .then(result =>{
      setData(result.data)
    })
    .catch(error => console.log('error', error));
  },[])
  return (
    <div className={`container ${style["wine-card-slider-container"]}`}>
      <WineBottleHeader></WineBottleHeader>
      <Swiper
        slidesPerView="auto"
        spaceBetween={24}
        grabCursor={true}
        loop={true}
        modules={[FreeMode]}
        // breakpoints={{
        //   768: {
        //     slidesPerView:2,
        //   },
        //   1024: {
        //     slidesPerView:3,
        //   },
        // }}
      >
        
        <SwiperSlide>
        <div className={`d-flex ${style["wine-card-container"]}`}>
        {data && data.map((item)=>(
          
            <WineCard
              price={item.price}
              favourites={item.favourites}
              views={item.views}
              imageUrl={item.imageUrl}
            ></WineCard>
            
         ))}
         </div>
        </SwiperSlide>
        
      </Swiper>
    </div>
  )
}

export default WineCardSlider
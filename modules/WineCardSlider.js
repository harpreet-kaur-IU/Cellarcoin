import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode} from "swiper";
import 'swiper/css';
import WineCard from './WineCard';
import WineBottleHeader from './WineBottleHeader'
import style from './css/WineCard.module.css'
import Loader from './Vendors Panel/Loader';
const WineCardSlider = () => {
  const [data,setData] = useState("")
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getPremiumNft`, requestOptions)
    .then(response => response.json())
    .then(result =>{
      setData(result.data)
      setLoading(false)
    })
    .catch(error => console.log('error', error));
  },[])
  return (
    <>  
      {loading && <Loader></Loader>}
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
            <div className={`d-grid grid-col-3 gap-3 ${style["wine-card-container"]}`}>
            {data && data.map((item)=>(
              <WineCard
                key = {item.key}
                id= {item._id}
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
    </>
  )
}

export default WineCardSlider
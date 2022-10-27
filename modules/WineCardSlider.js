import React, { useEffect, useState } from 'react';
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import WineCard from './WineCard';
import WineBottleHeader from './WineBottleHeader';
import style from './css/WineCard.module.css';
import Loader from './Vendors Panel/Loader';
import Modal from './Modal';
import SignUp from './SignUp';
const WineCardSlider = () => {
  const [data,setData] = useState("")
  const [loading,setLoading] = useState(false)
  const [toggle,setToggle] = useState(false)
  const handleClick = () =>{
    setToggle(prev => !prev)
  }
 
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
    .catch(error => {
      setLoading(false)
      console.log('error', error)
    });
  },[])
  return (
    <>  
      {loading && <Loader></Loader>}
      <div className={`container ${style["wine-card-slider-container"]}`}>
        <WineBottleHeader></WineBottleHeader>
        <Swiper
          spaceBetween={24}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
           breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="mySwiper"
        >
          {data && data.map((item)=>(
            <SwiperSlide>
              <WineCard
                handler ={handleClick}
                data = {item}
              ></WineCard>
            </SwiperSlide>
           ))}
          {/* <SwiperSlide>slide 2</SwiperSlide>
          <SwiperSlide>slide 3</SwiperSlide>
          <SwiperSlide>slide 4</SwiperSlide>
          <SwiperSlide>slide 5</SwiperSlide> */}
        </Swiper>
      </div>
      {toggle &&
        <Modal modalClass="modal-verify">
          <SignUp handler={handleClick}></SignUp>
        </Modal>
      }
    </>
  )
}

export default WineCardSlider
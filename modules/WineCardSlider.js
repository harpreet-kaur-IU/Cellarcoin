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
import { getUserOnBoardFromCookie } from '../auth/userCookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const WineCardSlider = () => {

  const [data,setData] = useState("")
  const [loading,setLoading] = useState(false)
  const JWTToken = getUserOnBoardFromCookie();
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

  const favoriteHandler = (value,id) =>{
    if(JWTToken){
      function parseJwt() {
        if(!JWTToken){
          return
        }
        const base64Url = JWTToken.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
      }
      var user = parseJwt();
      var userId = (user.user._id)

      //add favourite
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+JWTToken);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "favourite":value
      });
      
      var requestOptions = {
        method:'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      if(value){
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/updateFavourites/${id}`, requestOptions)
        .then(response => response.json())
        .then(result =>{
          console.log("before API call")
          getPremiumNft(userId);
          console.log("after API call")

          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
        });
      }else{
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/removeItem/${id}`, requestOptions)
        .then(response => response.json())
        .then(result =>{
          getPremiumNft(userId)
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);

        });
      }
    }else{
      toast.warning("Please sign in",{
          toastId:"2"
      });
    }
  }

  const getPremiumNft = (userId) =>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+JWTToken);
    myHeaders.append("Content-Type","application/json");
    
    var raw = JSON.stringify({
      "user": userId
    });
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw
    };
    
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getPremiumNft`, requestOptions)
    .then(response => response.json())
    .then(result =>{
      setData(result.data)
      setLoading(false)
    })
    .catch(error => {    
      console.log(error)  
      setLoading(false)
    });
  }
  return (
    <>  
      <ToastContainer></ToastContainer>
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
                handler = {favoriteHandler}
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
    </>
  )
}

export default WineCardSlider
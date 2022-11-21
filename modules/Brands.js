import React, { useEffect, useState } from 'react'
import style from './css/Brands.module.css'
const Brands = () => {
  const [brand1,setBrand1] = useState("")
  const [brand2,setBrand2] = useState("")
  const [brand3,setBrand3] = useState("")
  useEffect(()=>{
    setBrand1(document.getElementById("brand-1").offsetTop);
    setBrand2(document.getElementById("brand-2").offsetTop);
    setBrand3(document.getElementById("brand-3").offsetTop);
  },[])

  const barndOneHandler = () =>{
    window.scrollTo({
      top: brand2,
      behavior: 'smooth',
    })
  }
  
  const barndTwoHandler = () =>{
    window.scrollTo({
      top: brand3,
      behavior: 'smooth',
    })
  }
  const barndThreeHandler = () =>{
    window.scrollTo({
      top: brand1,
      behavior: 'smooth',
    })
  }
  return (
    <>
      <div id="brand-1" style={{backgroundImage: "url(images/brands-1.png)"}} className={`brand-item ${style["brands-bg"]}`}>
        <div className={`text-white d-flex d-flex-column d-align-center d-justify-center ${style["brands-banner-padding"]}`}>
          <img className={`${style["logo"]}`} src="images/b-logo-1.png"></img>
          <h3 className='col-8 mt-32 f-700 l-137'>The wines produced at Chateau Lafite Rothschild have all the classic characteristics of a red Bordeaux! Each bottle has intense flavors of blackcurrants and aromas.</h3>
          <img onClick={barndOneHandler} className={`cursor-pointer mt-40 ${style["mouse-pointer"]}`} src="images/mouse.png"></img>
        </div>
      </div>
      <div id="brand-2" style={{backgroundImage: "url(images/brands-2.png)"}} className={`${style["brands-bg"]}`}>
        <div className={`text-white d-flex d-flex-column d-align-center d-justify-center ${style["brands-banner-padding"]}`}>
          <img className={`${style["logo"]}`} src="images/b-logo-2.png"></img>
          <h3 className='col-8 mt-32 f-700 l-137'>The wines produced at Chateau Lafite Rothschild have all the classic characteristics of a red Bordeaux! Each bottle has intense flavors of blackcurrants and aromas.</h3>
          <img onClick={barndTwoHandler} className={`cursor-pointer mt-40 ${style["mouse-pointer"]}`} src="images/mouse.png"></img>
        </div>
      </div>
      <div id="brand-3" style={{backgroundImage: "url(images/brands-3.png)"}} className={`${style["brands-bg"]}`}>
        <div className={`text-white d-flex d-flex-column d-align-center d-justify-center ${style["brands-banner-padding"]}`}>
          <img className={`${style["logo"]}`} src="images/b-logo-3.png"></img>
          <h3 className='col-8 mt-32 f-700 l-137'>The wines produced at Chateau Lafite Rothschild have all the classic characteristics of a red Bordeaux! Each bottle has intense flavors of blackcurrants and aromas.</h3>
          <img onClick={barndThreeHandler} className={`cursor-pointer mt-40 ${style["mouse-pointer"]}`} src="images/mouse-arrow-up.png"></img>
        </div>
      </div>
    </>
  )
}

export default Brands
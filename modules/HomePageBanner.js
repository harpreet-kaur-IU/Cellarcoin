import React from 'react'
import style from './css/HomePageBanner.module.css'
const HomePageBanner = () => {
  return (
    <div className={`container d-flex d-justify-space-between ${style["home-banner-container"]}`}>
      <div className={`col-7 ${style["home-banner-col-7"]}`}>
        <h1 className='f-600 l-137 text-black'>We are first organisation launching physical <span className='text-primary'>Winery to NFT Market.</span></h1>
        <h4 className={`f-400 l-137 mt-32 text-dark-gray`}>A decentralized NFT marketplace and minting platform focused on physical assets to sell on NFT Market.</h4>
        <button className={`mt-32 btn-primary b-none font-20 f-500 l-137 ${style["btn-home-explore"]}`}>Explore</button>
      </div>
      <div className={`col-3 ${style["home-banner-col-3"]}`}>
        <img className={`${style["home-banner-slider-img"]}`} src='images/com-shadow-banner.png'></img>
      </div>
    </div>
  )
}

export default HomePageBanner
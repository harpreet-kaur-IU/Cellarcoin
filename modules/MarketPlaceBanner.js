import React from 'react'
import style from './css/MarketPlaceBanner.module.css'
const MarketPlaceBanner = () => {
  return (
    <div className={`bg-pink ${style["market-banner-section"]}`}>
        <div className={`container d-grid ${style["market-grid-wrapper"]}`}>
            <div className={` ${style["marketplace-image-wrapper"]}`}>
                <img src='images/marketplace-banner.png'></img>
            </div>
            <div className={`rounded-16 bg-active text-black ${style["marketplace-card-1"]}`}>
                <div className={` ${style["marketplace-card-1-margin"]}`}>
                    <h3 className='font-31 f-500 l-137 '>Purple Malbec Wine 2016 Lorem ipsum dolor #08</h3>
                    <p className='mt-16 font-20 f-400 l-137'>Lorem ipsum dolor sit amet,consectetur adipiscing elit. Quis pretium dui, commodo sed id nunc vel pharetra. Tellus pretium egestas in massa dapibus et non commodo dui.</p>
                    <h5 className='mt-16 font-25 l-137 f-500'>Price</h5>
                    <h5 className='mt-16 font-24 l-137 f-500'>
                        <img src='images/eth.png'></img>
                        0.19 wETH($711)
                    </h5>
                    <button className='mt-32 font-20 f-500 l-137 btn-primary'>Buy Now</button>
                    <a className='f-500 font-25 l-137 mt-24 d-block text-primary a-underline' href=''>View Profile</a>
                </div>
            </div>

            <div className={` ${style["marketplace-card-2"]}`}>
                <h5 className='mt-16 f-400 l-137 text-dark-gray'>WineMaker:</h5>
                <h5 className='mt-8 font-25 f-500 l-137 text-black'>Purple Malbec</h5>
                <h5 className='mt-16 f-400 l-137 text-dark-gray'>Grape Variety:</h5>
                <h5 className='mt-8 font-25 f-500 l-137 text-black'>62% Cabernet Sauvignon, 38% Shiraz </h5>
                <h5 className='mt-16 f-400 l-137 text-dark-gray'>Wine Analysis :</h5>
                <h5 className='mt-8 font-25 f-500 l-137 text-black'>Alc/Vol:14.5%, Acidity: 6.8 g/L, pH: 3.62</h5>
                <h5 className='mt-16 f-400 l-137 text-dark-gray'>Vintage:</h5>
                <h5 className='mt-8 font-25 f-500 l-137 text-black'>2016</h5>
                 <h5 className='mt-16 f-400 l-137 text-dark-gray'>Available to Redeem:</h5>
                <h5 className='mt-8 font-25 f-500 l-137 text-black'>on Apr 2, 2022</h5>
            </div>
            
        </div>
    </div>
  )
}

export default MarketPlaceBanner
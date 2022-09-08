import React from 'react'
import style from './css/OwnedBy.module.css'
const OwnedBy = () => {
  return (
    <div className={`p-relative col-12 ${style["wine-ownedby-section"]}`}>
        <div className='container'>
            <h2 className='f-600 l-137 text-center'>Buy NFT</h2>
            <div className={`d-flex  ${style["wine-images-row"]}`}>
                <div className={`col-3 p-relative ${style["wine-images-col-1"]}`}>
                    <img className='p-relative' src='images/owned-bg.png'></img>
                    <img className={`p-absolute ${style["wine-image-top"]}`} src="images/owned-img.png"></img>
                </div> 
                <div className={`col-4 ${style["wine-images-col-2"]}`}>
                    <h3 className='f-500 l-137'>Purple Malbec Wine 2016 Lorem ipsum dolor #08</h3>
                    <h5 className='mt-16 text-dark-gray f-400'>Price</h5>
                    <div className='mt-8 d-flex d-align-center'>
                        <img src='images/eth.png'></img>
                        <h5 className='font-24 l-137 f-500'>
                            0.19 wETH
                        </h5>
                    </div>
                    <div className='mt-16'>
                        <h5 className='text-dark-gray f-400'>Includes:</h5>
                        <ul className={`mt-8 ${style["includes-ul"]}`}>
                            <li className='font-20 f-500 l-137'>Lorem ipsum dolor sit amet.</li>
                            <li className='font-20 f-500 l-137'>Hac morbi lorem quam tortor.</li>
                            <li className='font-20 f-500 l-137'>Lorem ipsum dolor sit amet.</li>
                        </ul>
                    </div>
                </div>
                <div className={`col-5 ${style["wine-images-col-3"]}`}>
                    <div className='d-flex d-justify-end'>
                        <div className={`d-flex d-align-center d-justify-center cursor-pointer font-20 f-500 l-137 btn-secondary ${style["checkout-details"]}`}>
                            Time left for checkout 10:50
                        </div>
                    </div>
                    <h3 className='mt-48 f-500 l-137'>Payment method</h3>
                    <button className={`cursor-pointer mt-32 font-20 f-500 l-137 btn-secondary ${style["meta-mask-btn"]}`}>Metamask</button>
                    <button className={`cursor-pointer mt-108 font-20 f-500 l-137 btn-secondary ${style["cancel-btn"]}`}>Cancel</button>
                    <button className={`cursor-pointer mt-24 font-20 f-500 l-137 btn-primary b-none ${style["continue-btn"]}`}>Continue</button>
                </div>
                {/* <div className={`col-3 p-relative ${style["wine-images-col-2"]}`}>
                    <img className='p-relative' src='images/owned-bg.png'></img>
                    <img className={`p-absolute ${style["wine-image-top"]}`} src="images/owned-img.png"></img>
                </div>  */}
            </div>
        </div>
    </div>
  )
}

export default OwnedBy
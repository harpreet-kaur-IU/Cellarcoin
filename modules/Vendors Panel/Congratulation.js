import React from 'react'
import Header from './Header'
import style from '../css/Vendor Panel/Verification.module.css'
const Congratulation = () => {
  return (
    <>
        <Header></Header>
        <div className={`mt-32 vendor-container d-flex d-flex-column d-align-center d-justify-center ${style["congrats-container"]}`}>
            <h3 className='text-primary'>Congratulations</h3>
            <h5>Your NFT has been successfully listed in the platform</h5>
            <img className={`${style["congrats-nft-img"]}`} src='images/wine.png' alt='Uploaded NFT Image'></img>
            <button className={`btn-primary b-none ${style["congrats-visit-btn"]}`}>Visit</button>
        </div>
    </>
  )
}

export default Congratulation
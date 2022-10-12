import React from 'react'
import Header from './Header'
import style from '../css/Vendor Panel/Verification.module.css'
import { useRouter } from 'next/router'
const Congratulation = () => {
  const router = useRouter();

  const navigationHandler = () => {
    router.push("/");
  }

  return(
    <>
      <Header></Header>
      <div className={`mt-32 vendor-container d-flex d-flex-column d-align-center d-justify-center ${style["congrats-container"]}`}>
        <h3 className='text-primary'>Congratulations</h3>
        <h5 className='f-500'>Your NFT has been successfully listed in the platform</h5>
        <img className={`${style["congrats-nft-img"]}`} src='images/wine.png' alt='Uploaded NFT Image'></img>
        <button onClick={navigationHandler} className={`cursor-pointer btn-primary b-none ${style["congrats-visit-btn"]}`}>Visit</button>
      </div>
    </>
  )
}

export default Congratulation
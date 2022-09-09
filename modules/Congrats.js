import React from 'react'
import style from './css/Congrats.module.css'
import { useRouter } from 'next/router'
const Congrats = () => {
    const router = useRouter();
    const continueHandler = () =>{
      router.push("/usernft")
    }
  return (
    <div className={`vendor-container d-flex d-flex-column d-align-center d-justify-center ${style["congrats-container"]}`}>
      <h3 className='text-primary'>Congratulations!!</h3>
      <h5>Your NFT has been successfully listed in the platform</h5>
      <div className={`bg-common ${style["congrats-nft-img-wrapper"]}`}>
        <img className={`${style["congrats-nft-img"]}`} src='images/marketplace-banner.png' alt='Uploaded NFT Image'></img>
      </div>
      <button onClick={continueHandler} className={`cursor-pointer btn-primary b-none ${style["congrats-visit-btn"]}`}>Continue</button>
    </div>
  )
}

export default Congrats
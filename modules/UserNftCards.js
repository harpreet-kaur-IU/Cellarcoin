import React from 'react'
import style from './css/UserNftCards.module.css'
const UserNftCards = () => {
  return (
    <div className={`d-flex d-flex-row ${style["user-nft-row"]}`}>
        <div className={`rounded-16 bg-box text-center ${style["nft-cards-div"]}`}>
            <h5 className='font-24 f-600 l-137 text-primary'>Volume</h5>
            <h5 className='font-24 f-600 l-137 text-black mt-24'>114.25M CRO</h5>
        </div>
        <div className={`rounded-16 bg-box text-center ${style["nft-cards-div"]}`}>
            <h5 className='font-24 f-600 l-137 text-primary'>Volume</h5>
            <h5 className='font-24 f-600 l-137 text-black mt-24'>114.25M CRO</h5>
        </div>
        <div className={`rounded-16 bg-box text-center ${style["nft-cards-div"]}`}>
            <h5 className='font-24 f-600 l-137 text-primary'>Volume</h5>
            <h5 className='font-24 f-600 l-137 text-black mt-24'>114.25M CRO</h5>
        </div>
    </div>
  )
}

export default UserNftCards
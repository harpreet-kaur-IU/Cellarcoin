import React, { useEffect, useState } from 'react'
import style from './css/UserNftCards.module.css'
import { getUserOnBoardFromCookie } from '../auth/userCookies'
import Loader from './Vendors Panel/Loader'
const UserNftCards = () => {
  const JWTToken = getUserOnBoardFromCookie();
  const [data,setData] = useState()
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+JWTToken);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/userActivity`, requestOptions)
    .then(response => response.text())
    .then(result => {
      const parseResult = JSON.parse(result)
      setData(parseResult.data)
      setLoading(false)
    })
    .catch(error => console.log('error', error));
  },[])
  return (
    <>
    {loading && <Loader></Loader>}
      <div className={`d-flex d-flex-row d-justify-end ${style["user-nft-row"]}`}>
        <div className={`rounded-16 bg-box text-center ${style["nft-cards-div"]}`}>
          <h5 className='font-24 f-600 l-137 text-primary'>Volume</h5>
          <h5 className='font-24 f-600 l-137 text-black mt-24'>{data && data.nftVolume}</h5>
        </div>
        <div className={`rounded-16 bg-box text-center ${style["nft-cards-div"]}`}>
          <h5 className='font-24 f-600 l-137 text-primary'>Sales</h5>
          <h5 className='font-24 f-600 l-137 text-black mt-24'>{data && data.saleNFT}</h5>
        </div>
        <div className={`rounded-16 bg-box text-center ${style["nft-cards-div"]}`}>
          <h5 className='font-24 f-600 l-137 text-primary'>Active</h5>
          <h5 className='font-24 f-600 l-137 text-black mt-24'>{data && data.activeNFT}</h5>
        </div>
      </div>
    </>
  )
}

export default UserNftCards
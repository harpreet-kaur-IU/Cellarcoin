import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from './css/WineCollection.module.css'
const WineCollection = () => {
  const router = useRouter();
  const nftId = router.query["id"];
  const [brandData,setbrandData] = useState();

  useEffect(()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getBrandById/${nftId}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      const parseResult = JSON.parse(result)
      console.log(parseResult.message)
    })
    .catch(error => console.log('error', error));
  },[])
  return (
    <>
      <div className={`container ${style["wine-collection-container"]}`}>
          <div className={`d-flex d-align-center d-justify-center ${style["wine-collection-bg"]}`}>
            <img src="images/wine-collection-circle.png"></img>
          </div>
         
        <div className='text-center'>
          <h1 className='font-61 f-700 l-137 mt-108'>Penfolds Wine</h1>
          <p className='mt-8 font-25 f-400 l-137 '>Premium wine company</p>
        </div>
      </div>
    </>
   
  )
}

export default WineCollection
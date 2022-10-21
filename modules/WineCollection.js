import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from './css/WineCollection.module.css'
import Loader from './Vendors Panel/Loader'
const WineCollection = () => {
  const router = useRouter();
  const nftId = router.query["id"];
  const [brandData,setbrandData] = useState();
  const [nft,setNft] = useState("")
  const [loading,setLoading] = useState(false);
  
  useEffect(()=>{
   
    if(nftId){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type","application/json");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getBrandById/${nftId}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const parseResult = JSON.parse(result);
        setbrandData(parseResult.data)
        setLoading(false)
      })
      .catch(error => console.log('error', error));
    }
  },[nftId])
  return (
    <>
    {loading && <Loader></Loader>}
      <div className={`container ${style["wine-collection-container"]}`}>
        <div className={`d-flex d-align-center d-justify-center ${style["wine-collection-bg"]}`} style={{backgroundImage:`url(${brandData && brandData.coverImageUrl})`}}>
          <img src={brandData && brandData.profileImageUrl}></img>
        </div>
        <div className='text-center'>
          <h1 className='font-61 f-700 l-137 mt-108'>{brandData && brandData.brandName}</h1>
          {/* <p className='mt-8 font-25 f-400 l-137'>Premium wine company</p> */}
        </div>
      </div>
      {/* <div className={`container mt-88 ${style["wine-card-page-container"]}`}>
        <div className={`d-grid grid-col-3 gap-3 ${style["wine-card-wrapper"]}`}>
          {nft && nft.map((item)=>(
            <WineCard
              key={item._id}
              data={item}
            >
            </WineCard>
          ))}
        </div>
      </div> */}
    </>
  )
}

export default WineCollection
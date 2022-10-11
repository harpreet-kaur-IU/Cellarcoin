import React, { useEffect, useState }  from 'react'
import Header from './Header'
import styles from '../css/Sub Vendor Panel/Dashboard.module.css'
import {getSubVendorOnBoardFromCookie} from '../../auth/userCookies';
import Loader from '../Vendors Panel/Loader';
import {useRouter} from 'next/router'
const Dashboard = () => {
  // const[data,setData] = useState('');
  const [topNft,setTopNft] = useState("");
  const[dashboard,setDashboard] = useState('');
  const[nft,setNft] = useState('')
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  var JWTtoken = getSubVendorOnBoardFromCookie();

  useEffect(()=>{
    if(JWTtoken){
      var myHeaders = new Headers();
      myHeaders.append("Authorization","Bearer "+JWTtoken);
      myHeaders.append("Content-Type","application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders
      };

      // setLoading(true)
      // fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/getNft`, requestOptions)
      // .then(response => response.json())
      // .then(result =>{
      //   setData(result.data)
      //   setLoading(false)
      // })
      // .catch(error => console.log('error', error));

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/dashboard`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        setDashboard(result)
      })
      .catch(error => console.log('error', error));

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/getLatestNft`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        setNft(result.nft)
      })
      .catch(error => console.log('error', error));
    }else{
      router.push("/vendorlogin")
    }


    // top performing nft API
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}nft/topPerformingNFT`, requestOptions)
    .then(response => response.text())
    .then(result => {
      const parseResult = JSON.parse(result)
      console.log(parseResult.data)
      setTopNft(parseResult.data)
      setLoading(false)
    })
    .catch(error => console.log('error', error));
  },[])

  const deleteHandler = (e) =>{
      var myHeaders = new Headers();
      myHeaders.append("Authorization","Bearer "+JWTtoken);
      myHeaders.append("Content-Type","application/json");

      var requestOptions = {
        method: 'PATCH',
        headers: myHeaders
      };

      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/deleteNft/${e.target.id}`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        setData(result.data);
        setLoading(false)
      })
      .catch(error => console.log('error', error));
  }
  return (
    <>
      <Header></Header>
      {loading && <Loader></Loader>}
      <div className={`vendor-container ${styles["dashboard-container"]}`}>
        <h4 className='l-50 f-600 text-primary mt-24'>Dashboard</h4>
        <div className='d-flex d-flex-wrap gap-2 mt-24'>
          <div className={`${styles["dashboard-cards-wrapper"]}`}>
            <div className='d-flex d-justify-space-between'>
              <h5 className='f-600 l-29'>{dashboard.totalNft}</h5>
              <img src="images/ic_deals.png" className={`${styles["dashboard-cards-icon"]}`}></img>
            </div>
            <h6 className={`f-400 font-13 ${styles["dashboard-cards-title"]}`}>Total NFTs</h6>
          </div>

          <div className={`${styles["dashboard-cards-wrapper"]}`}>
            <div className='d-flex d-justify-space-between'>
              <h5 className='f-600 l-29'>{dashboard.totalVolume}</h5>
              <img src="images/ic_account.png" className={`${styles["dashboard-cards-icon"]}`}></img>
            </div>
            <h6 className={`f-400 font-14 ${styles["dashboard-cards-title"]}`}>Total Volume</h6>
          </div>

          <div className={`${styles["dashboard-cards-wrapper"]}`}>
            <div className='d-flex d-justify-space-between'>
              <h5 className='f-600 l-29'>
                {/* {dashboard.visitorFrequency} */}
                0
              </h5>
              <img src="images/ic_trending_up.png" className={`${styles["dashboard-cards-icon"]}`}></img>
            </div>
            <h6 className={`f-400 font-14 ${styles["dashboard-cards-title"]}`}>Monthy Sales</h6>
          </div>

          <div className={`${styles["dashboard-cards-wrapper"]}`}>
            <div className='d-flex d-justify-space-between'>
              <h5 className='f-600 l-29'>{dashboard.totalEarnings}</h5>
              <img src="images/ic_send.png" className={`${styles["dashboard-cards-icon"]}`}></img>
            </div>
            <h6 className={`f-400 font-14 ${styles["dashboard-cards-title"]}`}>Total Earnings</h6>
          </div>
        </div>
        <div className={`d-flex ${styles["nfts-wrapper"]}`}>
          <div className={`col-8 ${styles["top-nfts-wrapper"]}`}>
            <div className={` ${styles["top-nfts"]}`}>
              <h5 className='f-500'>Top Performing NFTs</h5>
              <h6 className='font-14 f-400'>Last 2 weeks</h6>
            </div>
            <div className={`${styles["dashboard-table-scroll-nft"]}`}>
              <div className={`${styles["dashboard-table-wrapper"]}`}>
                <div className={`${styles["dashboard-table-column-top-nft"]} ${styles["dashboard-table-border-bottom"]} d-flex d-align-center`}>
                  <span className='font-16 f-600 d-flex'>No.</span>
                  <span className='font-16 f-600 d-flex'>NFTs</span>
                  <span className='font-16 f-600 d-flex'>Minted at</span>
                  <span className='font-16 f-600 d-flex'>Sold at</span>
                  <span className='font-16 f-600 d-flex'>Returns</span>
                </div>
                {topNft && topNft.map((item,index)=>(
                  <div className={`${styles["dashboard-table-column-top-nft"]} ${styles["dashboard-table-column-nft-data"]} d-flex d-align-center`}>              
                    <span className='font-14 f-500 d-flex word-break'>{index+1}.</span>
                    <span className='font-14 f-500 d-flex d-align-center'>
                      <img className={`${styles["dashboard-table-column-nft"]}`} src={item.imageUrl}></img>
                      <span className='font-14 f-500'>{item.name}</span>
                    </span> 
                    <span className='font-14 f-400 d-flex'>MATIC 2.90</span>
                    <span className='font-14 f-400 d-flex'>MATIC 2.90</span>
                    <span className='font-14 f-400 d-flex'>100%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={`col-4 ${styles["new-nfts-wrapper"]}`}>
            <h5 className='f-600'>New NFTs</h5>
            <div className={`${styles["new-nft-table-wrapper"]}`}>
              <div className={`d-flex d-justify-space-between ${styles["new-nft-wrapper"]}`}>
                <h6 className='font-14 f-500'>NFTs</h6>
                <h6 className='font-14 f-500'>Price</h6>
              </div>
              {nft && nft.map((item)=>(
                <div className={`d-flex d-justify-space-between ${styles["new-nft-inner-wrapper"]}`}>
                  <span className='font-14 f-500 d-flex'>
                    <img className={`${styles["dashboard-new-nft-img"]}`} src={item.imageUrl}></img>
                    <span className='font-14 f-500 d-flex d-align-center'>{item.name}</span>
                  </span> 
                  <span className='font-14 f-600 d-flex d-align-center gap-1'>
                    {item.price === 0?"-":<img className={`${styles["polygon-icon-img"]}`} src='images/polygon-icon.svg'></img> }
                    {item.price === 0?"-" : item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
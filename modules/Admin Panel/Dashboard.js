import React, { useEffect,useState } from 'react'
import styles from '.././css/Admin Panel/Dashboard.module.css'
import {getAdminOnBoardFromCookie} from '../../auth/userCookies';
import Header from './Header';
import Link from 'next/link';
import Loader from '../Vendors Panel/Loader';
const Dashboard = () => {
  const[dashboard,setDashboard] = useState('');
  const [loading, setLoading] = useState(false);
  var JWTtoken = getAdminOnBoardFromCookie();
  const[data,setData] = useState('')
  useEffect(()=>{
      var myHeaders = new Headers();
      myHeaders.append("Authorization","Bearer "+JWTtoken);
      myHeaders.append("Content-Type","application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

      setLoading(true)
      
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}admin/dashboard`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        setDashboard(result)
      })
      .catch(error => console.log('error', error));

      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}admin/getAllNft`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        setData(result.data)
        setLoading(false)
      })
      .catch(error => console.log('error', error));
  },[])
  return (
    <>
    {loading && <Loader></Loader>}
    <Header></Header>
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
            <h6 className={`f-400 font-13 ${styles["dashboard-cards-title"]}`}>Total Volume</h6>
          </div>

          <div className={`${styles["dashboard-cards-wrapper"]}`}>
            <div className='d-flex d-justify-space-between'>
              <h5 className='f-600 l-29'>
                {/* {dashboard.visitorFrequency} */}
                0
              </h5>
              <img src="images/ic_trending_up.png" className={`${styles["dashboard-cards-icon"]}`}></img>
            </div>
            <h6 className={`f-400 font-13 ${styles["dashboard-cards-title"]}`}>Visitor Frequency</h6>
          </div>

          <div className={`${styles["dashboard-cards-wrapper"]}`}>
            <div className='d-flex d-justify-space-between'>
              <h5 className='f-600 l-29'>{dashboard.totalEarnings}</h5>
              <img src="images/ic_send.png" className={`${styles["dashboard-cards-icon"]}`}></img>
            </div>
            <h6 className={`f-400 font-13 ${styles["dashboard-cards-title"]}`}>Total Earnings</h6>
          </div>
        </div>
        <div className='d-flex d-align-center d-justify-space-between'>
          <h4 className='f-600 text-primary mt-24 mb-24'>Listed NFTs</h4>
        </div>
        <div className={`${styles["dashboard-table-section-scroll"]}`}>
          <div className={`${styles["dashboard-table-wrapper"]}`}>
            <div className={`${styles["dashboard-table-column"]}  bg-orange d-flex d-align-center`}>
              <span className='font-16 f-600 d-flex'>NFT</span>
              <span className='font-16 f-600 d-flex'>Name</span>
              <span className='font-16 f-600 d-flex'>Brand</span>
              <span className='font-16 f-600 d-flex'>Status</span>
              <span className='font-16 f-600 d-flex'>Price</span>
              <span className='font-16 f-600 d-flex'>Created On</span>
              <span className='font-16 f-600 d-flex d-justify-space-evenly'>Action</span>
            </div>
            {data && data.map((item,index)=>(
              <div className={`${styles["dashboard-table-column"]} ${styles["dashboard-table-column-data"]} d-flex d-align-center`}>
                <span className='font-14 f-500 d-flex'>
                  <img loading='lazy' className={`${styles["dashboard-table-column-product"]}`} src={item.imageUrl}></img>
                </span>                     
                <span className='font-14 f-500 d-flex word-break'>{item.name}</span>
                <span className='font-14 f-500 d-flex'>{item.brand}</span>
                <span className={`font-14 f-500 d-flex ${styles["nft-status"]}`}>{item.status}</span>
                {item.price === 0?<span className={`p-relative font-14 f-500 d-flex d-align-center`}>
                    --
                </span>
                :<span className={`p-relative font-14 f-500 d-flex d-align-center ${styles["nft-price-wrapper"]}`}>
                    <img src='images/eth-sm.png'></img>
                    {item.price}
                    <div className={`d-flex d-align-center d-justify-center ${styles["nft-price-tool-tip"]}`}>
                      <h6 className='l-22 f-400'>ETH</h6>
                    </div>
                </span>}
                
                <span className='font-14 f-500 d-flex'>{item.createdTime}</span>
                <span className={`cusror-pointer font-14 f-500 d-flex text-primary d-align-center d-justify-center`} style={{textDecoration:"underline"}}>
                  <Link href={`/adminlisting/${item._id}`}>View</Link>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
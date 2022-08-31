import React, { useEffect, useState }  from 'react'
import styles from '.././css/Vendor Panel/Dashboard.module.css'
import Header from './Header'
import {getOnBoardFromCookie} from '../../auth/userCookies';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/router'
const Reports = () => {
    const[data,setData] = useState('')
    const[dashboard,setDashboard] = useState('')
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    var JWTtoken = getOnBoardFromCookie();
    useEffect(()=>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization","Bearer "+JWTtoken);
        myHeaders.append("Content-Type","application/json");
  
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
        };
  
        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/getNft`, requestOptions)
        .then(response => response.json())
        .then(result =>{
          setData(result.data)
          setLoading(false)
        })
        .catch(error => console.log('error', error));
  
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/dashboard`, requestOptions)
        .then(response => response.json())
        .then(result =>{
          console.log(result)
          setDashboard(result)
        })
        .catch(error => console.log('error', error));
    },[])
  return (
    <>
      <Header></Header>
      {loading && <Loader></Loader>}
        <div className='vendor-container'>
            {/* <h4 className='l-50 f-600 text-primary mt-24'>Dashboard</h4> */}
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
                        <h5 className='f-600 l-29'>{dashboard.visitorFrequency}</h5>
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
            <div>

            </div>
        </div>
    </>
  )
}

export default Reports
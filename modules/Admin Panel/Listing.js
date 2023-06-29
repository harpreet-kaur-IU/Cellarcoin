import React, { useEffect, useState } from 'react'
import styles from '.././css/Admin Panel/Listing.module.css'
import {useRouter} from 'next/router'
import {getAdminOnBoardFromCookie} from '../../auth/userCookies';
import Loader from '../Vendors Panel/Loader'
import Header from './Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'react-moment';

const Listing = () => {
    const router = useRouter();
    const nftId = router.query["id"];
    const[data,setData] = useState("");
    const[hasMount,setHasMount] = useState(false)
    const [loading, setLoading] = useState(false);
    const[activity,setActivity] = useState("");
    var JWTtoken = getAdminOnBoardFromCookie();
    if(hasMount){
        return data;
    }
    useEffect(()=>{
        if(nftId){
            var myHeaders = new Headers();
            myHeaders.append("Authorization","Bearer "+JWTtoken);
            myHeaders.append("Content-Type","application/json");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
            };
            setLoading(true)
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}admin/getNft/${nftId}`, requestOptions)
            .then(response => response.json())
            .then(result =>{
                // console.log(result.data)
                setData(result.data)
                setLoading(false)
            })
            .catch(error => console.log('error', error));

            //activity log API
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            setLoading(true)
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getTransaction?nftId=${nftId}&&status=null`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result.data)
                setActivity(result.data)
                setLoading(false)
            })
            .catch(error => console.log('error', error));
        }
    },[nftId])
  return (
    <>
        {loading && <Loader></Loader>}
        <Header></Header>
        <div className='vendor-container' style={{paddingTop:"24px",height:"100vh",overflow:"scroll"}}>
            <h4 className='l-50 f-600 text-primary'>Listings</h4>
            
                <div className={`mt-32 d-flex ${styles["listing-body-wrapper"]}`}>
                    <img  loading='lazy' className={`${styles["listing-img"]}`} src={data.imageUrl}></img>
                    <div className={`col-5 ${styles["listing-content-wrapper"]}`}>
                        <h4 className={`f-500 l-39 ${styles["listing-name"]}`}>NFT Name</h4>
                        {data.name && <h5 className={`f-400 l-39 ${styles["listing-name"]}`}>{data.name}</h5>}
                        <h5 className={`f-500 ${styles["listing-content-brands"]}`}>{data.description}</h5>
                        <div className={`d-flex d-align-center d-justify-space-between ${styles["listing-price-and-vendor-wrapper"]}`}>
                            <div className={`d-flex d-flex-column`}>
                                <h5 className={`f-500 ${styles["listing-price-h5"]}`}>Price</h5>
                                <div className={`d-flex d-align-center ${styles["listing-price-img-and-content"]}`}>
                                    <img className={`${styles["polygon-icon-img"]}`} src='images/polygon-icon.svg'></img>
                                    <h5 className='f-500'>{data.price}</h5>
                                </div>
                            </div>
                            <div className={`d-flex d-flex-column`}>
                                <h5 className={`f-500 ${styles["listing-vendor-h5"]}`}>Wallet Address</h5>
                                <div className={`${styles["listing-vendor-content"]}`}>
                                    {data.walletAddress && 
                                        <h5 className='f-400'>{data.walletAddress}</h5>
                                    }
                                    {!data.walletAddress && 
                                        <h5 className='f-400'>not added</h5>
                                    }
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            
            <div className={`${styles["table-section-scroll"]}`} style={{overflow:"hidden",paddingBottom:"100px",height:"auto"}}>
                <div className={`${styles["table-wrapper"]}`}>
                    <h3 className={`f-600 text-primary ${styles["table-heading"]}`}>Activity</h3>
                    <div className={` ${styles["table-column"]}`}>
                        <span className='font-18 f-500 d-flex'>Event</span>
                        <span className='font-18 f-500 d-flex'>Price</span>
                        <span className='font-18 f-500 d-flex'>From</span>
                        <span className='font-18 f-500 d-flex'>To</span>
                        <span className='font-18 f-500 d-flex'>Date</span>
                    </div>                    
                    {activity && activity.map((item)=>(
                        <div className={`${styles["table-column"]}`}>
                            <span className='font-18 f-500 d-flex'>{item.transactionType}</span>
                            <div className={`d-flex d-align-center gap-1 ${styles["price-column"]}`}>
                                {item.price === 0? "":<img src='images/polygon-icon.svg'></img>}
                                <span className='text-primary font-18 f-600'>{item.price === 0?" ":item.price}</span>
                            </div>
                            {/* <span className='text-primary font-18 f-500 d-flex'>{item.from && (item.from.name === null?"-":item.from.name)}</span> */}
                            <span className='text-primary font-18 f-500 d-flex'>{item.to === null?"-":item.to}</span>
                            <span className='font-18 f-500 d-flex'><Moment fromNow>{item.createdAt}</Moment></span>
                        </div> 
                    ))}  
                </div>
            </div>
        </div>  
    </>
  )
}

export default Listing
import React, { useEffect, useState } from 'react'
import Header from './Header'
import styles from '.././css/Admin Panel/Notification.module.css'
import {getAdminOnBoardFromCookie} from '../../auth/userCookies';
import Loader from '../Vendors Panel/Loader';
const Notification = () => {
    const [data,setData] = useState("")
    const[loading,setLoading] = useState(false)
    var JWTtoken = getAdminOnBoardFromCookie();
    useEffect(()=>{
        if(JWTtoken){
            var myHeaders = new Headers();
            myHeaders.append("Authorization","Bearer "+JWTtoken);
            myHeaders.append("Content-Type","application/json");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders
            };
            setLoading(true)
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}admin/getNotifications`, requestOptions)
            .then(response => response.json())
            .then(result =>{
                setData(result.data)
                console.log(result.data)
                setLoading(false)
            })
            .catch(error => console.log('error', error));
        }else{
            router.push("/vendorlogin");
        }
    },[])
  return (
    <div>
        {loading && <Loader></Loader>}
        <Header></Header>
        <div className='vendor-container'>
            <h4 className='l-50 f-600 text-primary mt-24'>Notification</h4>
            <div className={`d-flex ${styles["notification-wrapper"]}`}>
                <div className={`${styles["notification-icon"]}`}>
                    <img src='images/email-fill.svg'></img>
                </div>
                <div className={`col-11 ${styles["notification-body"]}`}>
                    <h5 className='f-600'>New NFT Added</h5>
                    <h6 className='f-500'>New nft has been added to the platform</h6>
                    <span className='f-400'>Received on 21/03/2022.   15:50hrs</span>
                </div>
                <div className={`col-1 d-flex d-align-center ${styles["delete-icon"]}`}>
                    <img className='cursor-pointer' src='images/trash-2.svg'></img>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Notification
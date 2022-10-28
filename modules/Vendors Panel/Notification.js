import React, { useEffect, useState } from 'react'
import Header from './Header'
import styles from '.././css/Vendor Panel/Notification.module.css'
import { getOnBoardFromCookie } from '../../auth/userCookies'
import Moment from 'react-moment'
const Notification = () => {
    const JWTtoken = getOnBoardFromCookie();
    const [noti,setNoti] = useState("")
    useEffect(()=>{
        if(JWTtoken){
            function parseJwt() {
                if (!JWTtoken) {return}
                const base64Url = JWTtoken.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                return JSON.parse(window.atob(base64));
            }
            var user = parseJwt();

            var myHeaders = new Headers();
            myHeaders.append("Authorization","Bearer "+JWTtoken);
            myHeaders.append("Content-Type","application/json");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}admin/getNotifications?userId=${user.user._id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                const parseResult = JSON.parse(result)
                setNoti(parseResult.notifications)
            })
            .catch(error => console.log('error', error));
        }
    },[])
  return (
    <div>
        <Header></Header>
        <div className='vendor-container'>
            <h4 className='l-50 f-600 text-primary mt-24'>Notification</h4>
            {noti && noti.map((item)=>(
                <div className={`d-flex ${styles["notification-wrapper"]}`}>
                    <div className={`${styles["notification-icon"]}`}>
                        <img src='images/email-fill.svg'></img>
                    </div>
                    <div className={`col-11 ${styles["notification-body"]}`}>
                        <h5 className='f-600'>{item.title}</h5>
                        <h6 className='f-500'>{item.desc}</h6>
                        <span className='f-400'>Created on <Moment fromNow>{item.createdAt}</Moment></span>
                    </div>
                    <div className={`col-1 d-flex d-align-center ${styles["delete-icon"]}`}>
                        <img className='cursor-pointer' src='images/trash-2.svg'></img>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Notification
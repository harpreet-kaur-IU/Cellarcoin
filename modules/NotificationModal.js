import React, { useState,useEffect } from 'react'
import style from './css/NotificationModal.module.css'
import 'react-toastify/dist/ReactToastify.css';
import { getUserOnBoardFromCookie } from '../auth/userCookies';
const NotificationModal = (props) => {
    const JWTtoken = getUserOnBoardFromCookie();
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
            
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}admin/getAllNotifications?userId=${user.user._id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                const parseResult = JSON.parse(result)
                setNoti(parseResult.notifications)
            })
            .catch(error => console.log('error', error));
        }
    },[])
  return (
    <div className={`p-absolute bg-pink rounded-16 ${style["modal-wrapper"]}`}>
        <div className='d-flex d-justify-end'>
            <img onClick={props.handler} className={`d-block ${style["modal-cross-btn"]}`} src='images/cross.png'></img>
        </div>
        {noti && noti.map((item)=>(
            <div className={`d-flex d-align-center ${style["notification-item-wrapper"]}`}>
                <div className={`${style["noti-img-wrapper"]}`}>
                    <img src='images/our-pillars-1.png'></img>
                </div>
                <h5 className='font-16 f-400 l-137'>{item.desc}</h5>
            </div>
        ))}
        {noti.length === 0 &&
            <div className='d-flex d-align-center d-justify-center'>
                <h5 className='f-400 l-137'>there is no notification</h5>
            </div>
        }
    </div>
  )
}

export default NotificationModal
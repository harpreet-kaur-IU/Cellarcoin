import React, { useEffect, useState } from 'react'
import Header from './Header'
import styles from '.././css/Admin Panel/Notification.module.css'
import {getAdminOnBoardFromCookie} from '../../auth/userCookies';
import Loader from '../Vendors Panel/Loader';
import Moment from 'react-moment';
import Modal from '../Admin Panel/Modal';
import Delete from './Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Notification = () => {
    const [data,setData] = useState("")
    const [loading,setLoading] = useState(false)
    const [del,setDelete] = useState(false)
    const [delId,setDelId] = useState("")
    const deleteIdHandler = (e)=>{
        setDelId(e.currentTarget.id)
        setDelete(prev=>!prev)
    }
    const modalHandler = () =>{
        setDelete(prev=>!prev)
    }

    const deleteHandler = (data) =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization","Bearer "+JWTtoken);
        myHeaders.append("Content-Type","application/json");

        var raw = JSON.stringify({
            "status":data
        })
        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body : raw
        };

        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}admin/updateNotificationStatus/${delId}`, requestOptions)
        .then(response => response.json())
        .then(result =>{
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}admin/getNotifications`,{
                method: 'GET', 
                headers: myHeaders,
            })
            .then(response => response.json())
            .then(results =>{
                setData(results.data)
                toast.success("Notification deleted Successfully",{
                    toastId:"2"
                });
            })
            setLoading(false)
        })
        .catch(error => console.log('error', error));
    }
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
        <div className={`vendor-container ${styles["notification-container"]}`}>
            <h4 className='l-50 f-600 text-primary mt-24'>Notification</h4>
            {data && data.map((item)=>(
                <div className={`d-flex ${styles["notification-wrapper"]}`}>
                    <div className={`${styles["notification-icon"]}`}>
                        <img src='images/email-fill.svg'></img>
                    </div>
                    {item.vendorId===null?
                        <>
                            <div className={`col-11 ${styles["notification-body"]}`}>
                                <h5 className='f-600'>Brand Added</h5>
                                <h6 className='f-500'>{item.brandId.brandName} has been added to the platform</h6>
                                <span className='f-400'>Received <Moment fromNow>{item.brandId.createdAt}</Moment></span>
                            </div>
                            <div onClick={deleteIdHandler} id={item._id} className={`col-1 d-flex d-align-center ${styles["delete-icon"]}`}>
                                <img className='cursor-pointer' src='images/trash-2.svg'></img>
                            </div>
                        </>
                        :
                        <>
                            <div className={`col-11 ${styles["notification-body"]}`}>
                                <h5 className='f-600'>New Vendors Added</h5>
                                <h6 className='f-500'>New {item.vendorId.name} has been added to the platform</h6>
                                <span className='f-400'>Received <Moment fromNow>{item.vendorId.createdAt}</Moment></span>
                            </div>
                            <div onClick={deleteIdHandler} id={item._id} className={`col-1 d-flex d-align-center ${styles["delete-icon"]}`}>
                                <img className='cursor-pointer' src='images/trash-2.svg'></img>
                            </div>
                        </>
                    }      
                </div>
            ))}
        </div>
        {del && <Modal modalClass="modal-verify">
            <Delete deleteHandler={deleteHandler} handler={modalHandler}></Delete>
        </Modal>
        }
        <ToastContainer></ToastContainer>
    </div>
  )
}

export default Notification
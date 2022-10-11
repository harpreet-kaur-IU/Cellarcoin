import React, { useState } from 'react'
import styles from './css/GetInTouch.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GetInTouch = (props) => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
    const nameHandler = (e) =>{
        setName(e.target.value)
    }

    const emailHandler = (e) =>{
        setEmail(e.target.value)
    }

    const messageHandler = (e) =>{
        setMessage(e.target.value)
    }

    const formSubmit = (e) =>{
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type","application/json");
        var raw = JSON.stringify({
            "email":email,
            "message":message,
            "name":name
        })

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw
        };

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getInTouch`, requestOptions)
        .then(response => response.text())
        .then(result => {
            props.handler();
        })
        .then(()=>toast.success("Thank you for your interest, please check your mail"),{
            toastId:"1"
        })
        .catch(error => console.log('error', error));
    }
  return (
    <div className={`${styles["GIT-wrapper"]}`}>
        <div className={`d-flex d-flex-wrap`}>
            <div className={`col-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 ${styles["get-in-touch-left"]}`}></div>
            <div className={`col-d-none col-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 d-flex d-flex-column ${styles["get-in-touch-right"]}`}>
                <div onClick={props.handler} className={`cursor-pointer d-flex d-justify-end ${styles["cross-wrapper"]}`}>
                    <img src='images/cross.png'></img>
                </div>
                <div className={`d-flex d-flex-column ${styles["get-in-touch-form"]}`}>
                    <h2 className='f-600'>Get In Touch</h2>
                    <form onSubmit={formSubmit} className='d-flex d-flex-wrap'>
                        <div className={`d-flex d-flex-column col-12 ${styles["name-wrapper"]}`}>
                            <h6 className='col-12 f-600'>Name</h6>
                            <input className='col-12' type="text" placeholder="Name" onChange={nameHandler} value={name} required></input>  
                        </div> 
                        <div className={`d-flex d-flex-column col-12 ${styles["email-wrapper"]}`}>
                            <h6 className='col-12 f-600'>Email</h6>
                            <input className='col-12' type="email" placeholder="Email" onChange={emailHandler} value={email} required></input>  
                        </div> 
                        <div className={`d-flex d-flex-column col-12 ${styles["message-wrapper"]}`}>
                            <h6 className='col-12 f-600'>Write your message</h6>
                            <input className='col-12' type="text" placeholder="Write text here" onChange={messageHandler} value={message} required></input>  
                        </div>
                        <button className={`cursor-pointer btn-secondary ${styles["btn-submit"]}`}>Submit</button>
                    </form>
                </div>
            </div>
        </div> 
        <ToastContainer />
    </div>
  )
}

export default GetInTouch
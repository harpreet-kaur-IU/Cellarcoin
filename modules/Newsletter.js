import React, { useState } from 'react'
import Discord from '../icons/Discord'
import Facebook from '../icons/Facebook'
import Instagram from '../icons/Instagram'
import Telegram from '../icons/Telegram'
import Twitter from '../icons/Twitter'
import Youtube from '../icons/Youtube'
import styles from  './css/Newsletter.module.css'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Newsletter = () => {
    const [email,setEmail] = useState("");
    const emailHandler = (e) =>{
        setEmail(e.target.value);
    }
    const formSubmit = (e) =>{
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": email
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/newsletter`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            toast.success("Successfully Subscribed for Newsletter",{
                toastId:"2"
            });
        })
        .catch(error => console.log('error', error));
    }
  return (
    <div className={`mt-80 ${styles["newsletter-wrapper"]}`}>
        <div className={`container d-flex ${styles["news-letter-container"]}`}> 
            <div className={`col-6 d-flex d-flex-column ${styles["news-letter-col-1"]}`}>
                <h2 className='col-12 f-600 font-39 l-137 mb-24'>Get all Wine NFT updates</h2>
                <p className='col-12 font-25 l-137 mb-32'> Subscribe to our newsletter and receive regular updates on NFT</p>
                <form onSubmit={formSubmit}>
                    <div className={`col-12 d-flex ${styles["wine-newsletter-subscribe"]}`}>
                        <input type="email" value={email} onChange={emailHandler} className='font-20 f-400 l-137 text-black bg-search-box-bg' placeholder='Enter your email address' required></input>
                        <button className='cursor-pointer font-20 f-500 l-137 rounded-16 btn-primary'>Submit</button>
                    </div>
                </form>
            </div>
                 
            <div className={`col-6 d-flex d-flex-column d-align-center d-justify-center bg-primary rounded-12 ${styles["wine-newsletter-join"]}`}>
                <h3 className='text-white mb-48'>Join the community</h3>
                <div className={`d-flex d-flex-row ${styles["wine-newsletter-social-wrapper"]}`}>
                    {/* <img className={`${styles["wine-newsletter-social-icon"]}`} src='images/discord.png'></img> */}
                    <div className={`cursor-pointer ${styles["wine-newsletter-social-icon"]}`}>
                        <Discord width="63" height="48" color="white"></Discord>
                    </div>
                    <div className={`cursor-pointer ${styles["wine-newsletter-social-icon"]}`}>
                        <Twitter color="#ffffff" height="48" width="61"></Twitter>
                    </div>
                    {/* <img className={`${styles["wine-newsletter-social-icon"]}`} src='images/twitter.png'></img> */}
                    {/* <img className={`${styles["wine-newsletter-social-icon"]}`} src='images/instagram.png'></img> */}
                    <div className={`cursor-pointer ${styles["wine-newsletter-social-icon"]}`}>
                        <Instagram color="#ffffff" width="49" height="48"></Instagram>
                    </div>
                    <div className={`cursor-pointer ${styles["wine-newsletter-social-icon"]}`}>
                        <Facebook color="white" width="26" height="48"></Facebook>
                    </div>
                    {/* <img className={`${styles["wine-newsletter-social-icon"]}`} src='images/facebook.png'></img> */}
                    {/* <img className={`${styles["wine-newsletter-social-icon"]}`} src='images/telegram.png'></img> */}
                    <div className={`cursor-pointer ${styles["wine-newsletter-social-icon"]}`}>
                        <Telegram width="56" height="48" color="white"></Telegram>
                    </div>
                    <div className={`cursor-pointer ${styles["wine-newsletter-YT"]}`}>
                        <Youtube></Youtube>
                    </div>
                    {/* <img src='images/youtube.png'></img> */}
                </div>
            </div>  
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Newsletter
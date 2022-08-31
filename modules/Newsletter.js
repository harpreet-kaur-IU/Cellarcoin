import React from 'react'
import styles from  './css/Newsletter.module.css'

const Newsletter = () => {
  return (
    <div className='mt-80'>
        <div className='container d-grid grid-col-2'> 
            <div className='d-flex d-flex-wrap'>
                <h2 className='col-12 f-600 font-39 l-137 mb-24'>Get all Wine NFT updates</h2>
                <p className='col-12 font-25 l-137 mb-32'> Subscribe to our newletter and receive regular updates on NFT</p>
                <div className={`col-12 d-flex ${styles["wine-newsletter-subscribe"]}`}>
                    <input className='font-20 f-400 l-137 text-black bg-search-box-bg' placeholder='Enter your email address'></input>
                    <button className='font-20 f-500 l-137 rounded-16 btn-primary'>Submit</button>
                </div>
            </div>
                 
            <div className={`d-flex d-flex-column d-align-center d-justify-center bg-primary rounded-12 ${styles["wine-newsletter-join"]}`}>
                <h3 className='text-white mb-48'>Join the community</h3>
                <div className='d-flex d-flex-row'>
                    <img className={` ${styles["wine-newsletter-social-icon"]}`} src='images/discord.png'></img>
                    <img className={` ${styles["wine-newsletter-social-icon"]}`} src='images/twitter.png'></img>
                    <img className={` ${styles["wine-newsletter-social-icon"]}`} src='images/instagram.png'></img>
                    <img className={` ${styles["wine-newsletter-social-icon"]}`} src='images/facebook.png'></img>
                    <img className={` ${styles["wine-newsletter-social-icon"]}`} src='images/telegram.png'></img>
                    <img src='images/youtube.png'></img>
                </div>
            </div>  
        </div>
    </div>
  )
}

export default Newsletter
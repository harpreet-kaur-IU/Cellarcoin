import React from 'react'
import style from './css/JoinCommunityBanner.module.css'
const JoinCommunityBanner = () => {
  return (
    <div className={`bg-card-dark mt-56 p-relative ${style["community-banner-wrapper"]}`}>
        <div className={`container p-relative ${style["community-banner-container"]}`}>
            <h2 className='font-49 f-600 l-137 text-black'>Join our Community</h2>
            <h3 className={`col-6 font-31 f-400 l-137 mt-24 text-dark-gray ${style["community-banner-para"]}`}>Connect with us, Join our Community Today. Follow our social media page for more updates</h3>
            <button className={`mt-40 btn-primary b-none font-20 f-500 l-137 ${style["btn-join-YT"]}`}>Join our YouTube Channel</button>
            <div className='d-flex d-flex-row mt-32 gap-5'>
                <img className={` ${style["wine-newsletter-social-icon"]}`} src='images/disc-1.png'></img>
                <img className={` ${style["wine-newsletter-social-icon"]}`} src='images/twit-1.png'></img>
                <img className={` ${style["wine-newsletter-social-icon"]}`} src='images/insta-1.png'></img>
                <img className={` ${style["wine-newsletter-social-icon"]}`} src='images/fb-1.png'></img>
                <img className={` ${style["wine-newsletter-social-icon"]}`} src='images/tele-1.png'></img>
            </div> 
        </div>
    </div>
  )
}

export default JoinCommunityBanner
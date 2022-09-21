import React from 'react'
import Facebook from '../icons/Facebook'
import Instagram from '../icons/Instagram'
import Twitter from '../icons/Twitter'
import style from './css/Community.module.css'
const Community = () => {
  return (
    <div className={`${style["community-bg"]}`}>
      <div className={` text-white  text-center ${style["community-banner-padding"]}`}>
        <h1 className='font-48 f-700 l-65'>Connect with us, Join our Community Today</h1>
        <p className='f-500 l-140 mt-32'>Follow our social media page for more updates</p>
        <div className={`mt-40 d-flex d-flex-row d-justify-center gap-5 ${style["community-images-wrapper"]}`}>
          <div className={`d-flex d-align-center d-justify-center ${style["community-fb"]}`}>
            <Facebook color="#000000"></Facebook>
          </div>
          <div className={`d-flex d-align-center d-justify-center ${style["community-insta"]}`}>
            {/* <img src="images/c-insta.svg"></img> */}
            <Instagram color="#000000"></Instagram>
          </div>
          <div className={`d-flex d-align-center d-justify-center ${style["community-twitter"]}`}>
            {/* <img src="images/c-twitter.svg"></img> */}
            <Twitter color="#000000" height="32" width="40"></Twitter>
          </div>
          <div className={`d-flex d-align-center d-justify-center ${style["community-discord"]}`}>
            <img src="images/c-discord.svg"></img>
          </div>
          <div className={`d-flex d-align-center d-justify-center ${style["community-telegram"]}`}>
            <img src="images/c-telegram.svg"></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
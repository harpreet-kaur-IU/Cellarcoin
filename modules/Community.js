import React from 'react'
import Discord from '../icons/Discord'
import Facebook from '../icons/Facebook'
import Instagram from '../icons/Instagram'
import Telegram from '../icons/Telegram'
import Twitter from '../icons/Twitter'
import style from './css/Community.module.css'
const Community = () => {
  return (
    <div className={`d-flex d-align-center d-justify-center ${style["community-bg"]}`}>
      <div className={` text-white  text-center ${style["community-banner-padding"]}`}>
        <h1 className='font-48 f-700 l-65'>Connect with us, Join our Community Today</h1>
        <p className='f-500 l-140 mt-32'>Follow our social media page for more updates</p>
        <div className={`mt-40 d-flex d-flex-row d-justify-center gap-5 ${style["community-images-wrapper"]}`}>
          <div className={`d-flex d-align-center d-justify-center ${style["community-fb"]}`}>
            <Facebook color="#000000" width="20" height="40"></Facebook>
          </div>
          <div className={`d-flex d-align-center d-justify-center ${style["community-insta"]}`}>
            {/* <img src="images/c-insta.svg"></img> */}
            <Instagram color="#000000" height="40" width="40"></Instagram>
          </div>
          <div className={`d-flex d-align-center d-justify-center ${style["community-twitter"]}`}>
            {/* <img src="images/c-twitter.svg"></img> */}
            <Twitter color="#000000" height="40" width="40"></Twitter>
          </div>
          <div className={`d-flex d-align-center d-justify-center ${style["community-discord"]}`}>
            <Discord height="40" width="40" color="black"></Discord>
          </div>
          <div className={`d-flex d-align-center d-justify-center ${style["community-telegram"]}`}>
            <Telegram height="40" width="40" color="#000000"></Telegram>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
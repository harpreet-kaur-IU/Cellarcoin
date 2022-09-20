import React from 'react'
import style from './css/Community.module.css'
const Community = () => {
  return (
    <div className={`${style["community-bg"]}`}>
      <div className={` text-white  text-center ${style["community-banner-padding"]}`}>
        <h1 className='font-48 f-700 l-65'>Connect with us, Join our Community Today</h1>
        <p className='f-500 l-140 mt-32'>Follow our social media page for more updates</p>
        <div className={`mt-40 d-flex d-flex-row d-justify-center gap-5 ${style["community-images-wrapper"]}`}>
          <div className={`d-flex d-align-center d-justify-center ${style["community-fb"]}`}>
            <img src="images/c-fb.svg"></img>
          </div>
          <div className={`d-flex d-align-center d-justify-center ${style["community-insta"]}`}>
            <img src="images/c-insta.svg"></img>
          </div>
          <div className={`d-flex d-align-center d-justify-center ${style["community-twitter"]}`}>
            <img src="images/c-twitter.svg"></img>
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
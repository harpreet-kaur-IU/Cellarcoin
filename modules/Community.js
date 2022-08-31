import React from 'react'
import style from './css/Community.module.css'
const Community = () => {
  return (
    <div className={` ${style["community-bg"]}`}>
        <div className={` text-white  text-center ${style["community-banner-padding"]}`}>
            <h1 className='font-48 f-700 l-65'>Connect with us, Join our Community Today</h1>
            <p className='f-500 l-140 mt-32'>Follow our social media page for more updates</p>
            <div className='mt-40 d-flex d-flex-row d-justify-center gap-5'>
                <img src="images/com-fb.png"></img>
                <img src="images/com-insta.png"></img>
                <img src="images/com-twit.png"></img>
                <img src="images/com-dis.png"></img>
                <img src="images/com-tele.png"></img>
            </div>
        </div>
    </div>
  )
}

export default Community
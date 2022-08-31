import React from 'react'
import styles from "./css/AboutBanner.module.css"
const AboutBanner = () => {
  return (
    <div className={` ${styles["about-banner-bg"]}`}>
        <div className={`container d-flex d-flex-column text-white ${styles["about-banner-container"]}`}>
            <div className='col-5'>
                <h1 className='font-61 f-600 l-137 mb-32'>About Cellarcoin</h1>
                <p className=' font-26 f-500 l-137'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius pellentesque velit habitant purus velit quis nisl. Amet consectetur libero tempus, donec aliquet pharetra, mattis nullam. Sit risus massa.</p>
            </div>
        </div>
    </div>
  )
}

export default AboutBanner
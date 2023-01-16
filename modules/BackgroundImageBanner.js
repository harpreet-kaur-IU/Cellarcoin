import React from 'react'
import styles from './css/BackgroundImageBanner.module.css'

const BackgroundImageBanner = () => {
  return (
    <div className='pt-48 pb-100'>
        <div className={`${styles["wine-bg-banner"]}`}>
            <h1 className='d-flex d-flex-row d-justify-center font-96 f-700 l-137 text-white'>Purple Malbec</h1>
        </div>
    </div>
  )
}

export default BackgroundImageBanner
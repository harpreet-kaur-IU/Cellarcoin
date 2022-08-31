import React from 'react'
import Header from './Header'
import styles from '.././css/Vendor Panel/Notification.module.css'
const Notification = () => {
  return (
    <div>
        <Header></Header>
        <div className='vendor-container'>
            <h4 className='l-50 f-600 text-primary mt-24'>Notification</h4>
            <div className={`d-flex ${styles["notification-wrapper"]}`}>
                <div className={`${styles["notification-icon"]}`}>
                    <img src='images/email-fill.svg'></img>
                </div>
                <div className={`col-11 ${styles["notification-body"]}`}>
                    <h5 className='f-600'>New NFT Added</h5>
                    <h6 className='f-500'>New nft has been added to the platform</h6>
                    <span className='f-400'>Received on 21/03/2022.   15:50hrs</span>
                </div>
                <div className={`col-1 d-flex d-align-center ${styles["delete-icon"]}`}>
                    <img className='cursor-pointer' src='images/trash-2.svg'></img>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Notification
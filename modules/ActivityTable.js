import React from 'react'
import styles from './css/ActivityTable.module.css'
const ActivityTable = () => {
  return (
    <div className={`container ${styles["activity-container"]}`}>
        <div className={`d-flex d-align-center d-justify-space-between ${styles["table-heading"]}`}>
            <h3 className={`f-600 text-primary `}>Activity</h3>
            <button className='cursor-pointer btn-secondary font-14 f-500 l-137'>Filter</button>
        </div>
        <div className={`${styles["table-section-scroll"]}`} style={{overflow:"hidden",marginBottom:"100px",height:"auto"}}>
            <div className={`${styles["table-wrapper"]}`}>
                <div className={` ${styles["table-headers"]}`}>
                    <span className='font-18 f-500 d-flex'>Event</span>
                    <span className='font-18 f-500 d-flex'>Price</span>
                    <span className='font-18 f-500 d-flex'>From</span>
                    <span className='font-18 f-500 d-flex'>To</span>
                    <span className='font-18 f-500 d-flex'>Date</span>
                </div>                    
                <div className={`${styles["table-column"]}`}>
                    <span className='font-18 f-500 d-flex'>Transfer</span>
                    <span className='text-primary font-18 f-600 d-flex'>Price</span>
                    <span className='text-primary font-18 f-500 d-flex'>LK. Davidson</span>
                    <span className='text-primary font-18 f-500 d-flex'>LK. Davidson</span>
                    <span className='font-18 f-500 d-flex'>21/06/2022</span>
                </div> 
                <div className={`${styles["table-column"]}`}>
                    <span className='font-18 f-500 d-flex'>Transfer</span>
                    <span className='text-primary font-18 f-600 d-flex'>Price</span>
                    <span className='text-primary font-18 f-500 d-flex'>LK. Davidson</span>
                    <span className='text-primary font-18 f-500 d-flex'>LK. Davidson</span>
                    <span className='font-18 f-500 d-flex'>21/06/2022</span>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default ActivityTable
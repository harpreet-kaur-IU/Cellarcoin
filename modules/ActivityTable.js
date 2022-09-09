import React from 'react'
import styles from './css/ActivityTable.module.css'
const ActivityTable = () => {
  return (
    <div className={`container ${styles["activity-container"]}`}>
         <h3 className={`f-600 text-primary ${styles["table-heading"]}`}>Activity</h3>
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
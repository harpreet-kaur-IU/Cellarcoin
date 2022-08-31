import React from 'react'
import styles from '.././css/Vendor Panel/Dashboard.module.css'
const DashboardCards = (props) => {
  return (
    <div className={`${styles["dashboard-cards-wrapper"]}`}>
      <div className='d-flex d-justify-space-between'>
        <h5 className='f-600 l-29'>{props.count}</h5>
        <img src={props.icon} className={`${styles["dashboard-cards-icon"]}`}></img>
      </div>
      <h6 className={`f-400 font-13 ${styles["dashboard-cards-title"]}`}>{props.title}</h6>
    </div>
  )
}

export default DashboardCards
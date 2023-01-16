import React from 'react'
import styles from './css/ComingSoon.module.css'
const ComingSoon = () => {
  return (
    <div className={`container pt-72 pb-120 ${styles["coming-soon-container"]}`}>
        <h2 className='mb-32 f-600 l-137 text-center'>Coming Soon</h2>

        <div className={`mb-24 d-flex d-flex-row ${styles["wine-cooming-soon-1"]}`}>
            <img className='col-5' src="images/black-bg.png"></img>
            <p className={`col-6 offset-1 d-flex d-flex-column d-justify-center f-400 l-137 ${styles["wine-coming-soon-content-1"]}`}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</p>
        </div>
        <div className={`d-flex d-flex-row-reverse ${styles["wine-cooming-soon-2"]}`}>
            <img className='col-5' src="images/black-bg.png"></img>
            <p className={`col-6 offset-1 d-flex d-flex-column d-justify-center f-400 l-137 ${styles["wine-coming-soon-content-2"]}`}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</p>
        </div>
    </div>
  )
}

export default ComingSoon
import React from 'react'
import styles from './css/OurPillars.module.css'
const OurPillars = () => {
  return (
   <div className='section'>
        <div className='container'>
            <h2 className='f-600 l-137 text-center mb-32'>Our Pillars</h2>
            <div className={`d-grid grid-col-4 gap-5 ${styles["our-pillars-cards-wrapper"]}`}>
                <img className='col-12 rounded-16' src='images/our-pillars-1.png'></img>
                <img className='col-12 rounded-16' src='images/our-pillars-1.png'></img>
                <img className='col-12 rounded-16' src='images/our-pillars-1.png'></img>
                <img className='col-12 rounded-16' src='images/our-pillars-1.png'></img>
                <img className='col-12 rounded-16' src='images/our-pillars-1.png'></img>
                <img className='col-12 rounded-16' src='images/our-pillars-1.png'></img>
                <img className='col-12 rounded-16' src='images/our-pillars-1.png'></img>
                <img className='col-12 rounded-16' src='images/our-pillars-1.png'></img>
            </div>
        </div>
   </div>
  )
}

export default OurPillars
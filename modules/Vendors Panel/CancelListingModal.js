import React from 'react'
import styles from '../css/Vendor Panel/AddProperties.module.css'

const CancelListingModal = (props) => {
    
    const yesClicked = () =>{
        props.cancelHandler(true);
    }
  return (
    <>
        <div className={`bg-white rounded-16 ${styles["active-status-modal"]}`}>
            <div className='d-flex d-flex-column'>
                <h5 className='f-600 text-black'>Are you sure you want to cancel this Listing?</h5>
                <h6 className='mt-16 f-500 text-dark-gray'>Gas Fees deduction ( for cancelation of NFT listing )</h6>
                <h5 className='mt-8 f-600 text-black'>0.19 wETH</h5>
            </div>
            <div className={`d-flex d-flex-column ${styles["btn-wrapper"]}`}>
                <button onClick={yesClicked} className={`cursor-pointer font-14 f-600 l-19 rounded-12 text-white bg-primary  ${styles["crud-btn"]}`}>Yes</button>
                <button onClick={props.handler} className={`cursor-pointer font-14 f-600 l-19 rounded-12 text-primary bg-white  ${styles["crud-btn-no"]}`}>No</button>
            </div>
        </div>
        
    </>
  )
}

export default CancelListingModal

import React from 'react'
import Header from './Header'
import styles from '.././css/Vendor Panel/NFTList.module.css'
const NFTList = () => {
  return (
    <div> 
        <Header></Header>
        <div className='vendor-container'>
            <h4 className='l-50 f-600 text-primary mt-32'>NFT List</h4>
            <div className={`d-flex d-flex-wrap d-justify-space-between ${styles["nft-list-wrapper"]}`}>
                <div className={`col-5 ${styles["nft-content-left"]}`}>
                    <div className='col-12 d-flex d-flex-wrap'>
                        <img src='images/listing.png'></img>
                        <div className={` ${styles["nft-details"]}`}>
                            <h6 className='f-600 text-primary'>Lorem ipsum dolor sit amet, </h6>
                            <div className={`d-flex d-flex-wrap d-align-center ${styles["pricing-details"]}`}>
                                <span className='f-500'>Created on</span>
                                <h6 className='f-600'>ETH 2.03</h6>
                            </div>
                        </div>
                    </div>
                  
                    <div className={`col-12 d-flex d-flex-wrap d-align-center ${styles["Created-details"]}`}>
                        <span className='f-500'>Created On</span>
                        <h6 className='f-600 text-primary'>2 Feb, 2022, 12:34Pm</h6>
                    </div>
                  
                </div>
                <div className={`col-4 ${styles["rejection-reason"]}`}>
                    <h5>Reason for rejection</h5>
                    <h6 className='f-400'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem </h6>
                </div>
                <div className={`col-1 d-flex d-flex-column d-align-center d-justify-space-around ${styles["icons-wrapper"]}`}>
                    <img className='cursor-pointer' src='images/trash-2.svg'></img>
                    <img className='cursor-pointer' src='images/edit-2.svg'></img>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NFTList
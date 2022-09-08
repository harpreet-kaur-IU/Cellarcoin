import React from 'react'
import style from './css/UserTable.module.css'
const UserTable = () => {
  return (
    <div className={`${style["dashboard-table-section-scroll"]}`}>
        <div className={`${style["dashboard-table-wrapper"]}`}>
            <div className={`${style["dashboard-table-column"]} bg-orange d-flex d-align-center`}>
                <span className='font-16 f-600 d-flex'>Item</span>
                <span className='font-16 f-600 d-flex'>Price</span>
                <span className='font-16 f-600 d-flex'>Quantity</span>
                <span className='font-16 f-600 d-flex'>From</span>
                <span className='font-16 f-600 d-flex'>To</span>
                <span className='font-16 f-600 d-flex'>Time</span>
            </div>
           
            <div className={`${style["dashboard-table-column"]} ${style["dashboard-table-column-data"]} d-flex d-align-center`}>
                <span className='font-14 f-500 d-flex'>
                    <img loading='lazy' className={`${style["dashboard-table-column-product"]}`} src="images/b-1.png"></img>
                </span>                     
                <span className='font-14 f-500 d-flex word-break'>name</span>
                <span className='font-14 f-600 text-primary text-underline d-flex'>brand</span>
                <span className={`font-14 f-500 d-flex d-align-center d-justify-center ${style["nft-status"]}`}>status</span>

                <span className={`p-relative font-14 f-500 d-flex d-align-center ${style["nft-price-wrapper"]}`}>
                    <img src='images/eth-sm.png'></img>
                    price
                    <div className={`d-flex d-align-center d-justify-center ${style["nft-price-tool-tip"]}`}>
                        <h6 className='l-22 f-400'>ETH</h6>
                    </div>
                </span>
                <span className='font-14 f-500 d-flex'>createdTime</span>
            </div>
        </div>
    </div>
  )
}

export default UserTable
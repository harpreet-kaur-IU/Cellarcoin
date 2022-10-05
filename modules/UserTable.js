import React from 'react'
import style from './css/UserTable.module.css'
const UserTable = () => {
  return (
    <div className={`${style["dashboard-table-section-scroll"]}`}>
        <div className={`${style["dashboard-table-wrapper"]}`}>
            <div className={`${style["dashboard-table-column"]} bg-orange d-flex d-align-center`}>
                <span className='font-16 f-600 d-flex'>Item</span>
                <span className='font-16 f-600 d-flex d-justify-center'>Price</span>
                <span className='font-16 f-600 d-flex d-justify-center'>Quantity</span>
                <span className='font-16 f-600 d-flex d-justify-center'>From</span>
                <span className='font-16 f-600 d-flex d-justify-center'>To</span>
                <span className='font-16 f-600 d-flex d-justify-center'>Time</span>
            </div>
           
            <div className={`${style["dashboard-table-column"]} ${style["dashboard-table-column-data"]} d-flex d-align-center`}>
                <span className='d-flex d-align-center font-14 f-500 gap-2'>
                    <img loading='lazy' className={`${style["dashboard-table-column-product"]}`} src="images/b-1.png"></img>
                    <span className='font-14 f-500 d-flex word-break'>nts name nts name nts name nts name nts name</span>
                </span>                     
                
                <span className={`p-relative font-14 f-500 d-flex d-align-center d-justify-center ${style["nft-price-wrapper"]}`}>
                    <img className={`${style["polygon-icon-img"]}`} src='images/polygon-icon.svg'></img>
                    0.17 ETH
                    {/* <div className={`d-flex d-align-center d-justify-center ${style["nft-price-tool-tip"]}`}>
                        <h6 className='l-22 f-400'>ETH</h6>
                    </div> */}
                </span>
                <span className='font-14 f-500 d-flex d-justify-center word-break'>1</span>
                <span className='font-14 f-500 d-flex d-justify-center'>26/10/2022</span>
                <span className={`font-14 f-500 d-flex d-align-center d-justify-center d-justify-center`}>26/10/2022</span>

                <span className='font-14 f-500 d-flex d-justify-center'>26/10/2022</span>
            </div>
        </div>
    </div>
  )
}

export default UserTable
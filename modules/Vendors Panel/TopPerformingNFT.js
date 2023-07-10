import React from 'react'
import Moment from 'react-moment'
import styles from '.././css/Vendor Panel/Dashboard.module.css'

const TopPerformingNFT = (props) => {
  return (

        <div className={`col-8 ${styles["top-nfts-wrapper"]}`}>
            <div className={` ${styles["top-nfts"]}`}>
                <h5 className='f-500'>Top Performing NFTs</h5>
                <h6 className='font-14 f-400'>Last 2 weeks</h6>
            </div>
            <div className={`${styles["dashboard-table-scroll-nft"]}`}>
                <div className={`${styles["dashboard-table-wrapper"]}`}>
                    <div className={`${styles["dashboard-table-column-top-nft"]} ${styles["dashboard-table-border-bottom"]} d-flex d-align-center`}>
                        <span className='font-16 f-600 d-flex'>No.</span>
                        <span className='font-16 f-600 d-flex'>NFTs</span>
                        <span className='font-16 f-600 d-flex'>Minted at</span>
                        <span className='font-16 f-600 d-flex'>Sold at</span>
                        <span className='font-16 f-600 d-flex'>Returns</span>
                    </div>
                    {props.topNft && props.topNft.map((item,index)=>(
                    <div key={index} className={`${styles["dashboard-table-column-top-nft"]} ${styles["dashboard-table-column-nft-data"]} d-flex d-align-center`}>              
                        <span className='font-14 f-500 d-flex word-break'>{index+1}.</span>
                        <span className='font-14 f-500 d-flex d-align-center'>
                            <img className={`${styles["dashboard-table-column-nft"]}`} src={item.imageUrl}></img>
                            <span className='font-14 f-500'>{item.name}</span>
                        </span> 
                        <span className='font-14 f-400 d-flex'><Moment fromNow>{item.createdAt}</Moment></span>
                        <span className='font-14 f-400 d-flex'>{item.transferredDate===null?"-":<Moment fromNow>{item.transferredDate}</Moment>}</span>
                        <span className='font-14 f-400 d-flex'>100%</span>
                    </div>
                    ))}
                </div>
            </div>
        </div>

  )
}

export default TopPerformingNFT
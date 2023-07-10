import React from 'react'
import styles from '.././css/Vendor Panel/Dashboard.module.css'

const NewNFTTable = (props) => {
  return (
    <div className={`col-4 ${styles["new-nfts-wrapper"]}`}>
        <h5 className='f-600'>New NFTs</h5>
        <div className={`${styles["new-nft-table-wrapper"]}`}>
        <div className={`d-flex d-justify-space-between ${styles["new-nft-wrapper"]}`}>
            <h6 className='font-14 f-500'>NFTs</h6>
            <h6 className='font-14 f-500'>Price</h6>
        </div>
        {props.nft && props.nft.map((item)=>(
            <div key={item._id} className={`d-flex d-justify-space-between ${styles["new-nft-inner-wrapper"]}`}>
            <span className='font-14 f-500 d-flex'>
                <img className={`${styles["dashboard-new-nft-img"]}`} src={item.imageUrl}></img>
                <span className='font-14 f-500 d-flex d-align-center'>{item.name}</span>
            </span> 
            <span className='font-14 f-600 d-flex d-align-center gap-1'>
                {item.price === 0?"-":<img className={`${styles["polygon-icon-img"]}`} src='images/polygon-icon.svg'></img> }
                {item.price === 0?"-" : item.price}
            </span>
            </div>
        ))}
        </div>
    </div>
  )
}

export default NewNFTTable
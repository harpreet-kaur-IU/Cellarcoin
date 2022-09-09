import React from 'react'
import styles from './css/WineCard.module.css'
import {useRouter} from 'next/router'
const NFTCard = (props) => {
    const router = useRouter();
  return (
    <>
        <div className={`bg-card-dark ${styles["user-nft-cards-container"]}`}>
            <img className={`${styles["wine-bg-img"]}`} src={props.imageUrl}></img>
            {props.status==="Sell NFT" &&
                <div className='p-16'>
                    <button className={`col-12 b-none btn-primary font-18 f-600 l-137 ${styles["usernft-list-nft-btn"]}`}>Sell NFT</button>
                </div>
            }
            {props.status==="List NFT" &&
                <div className='p-16'>
                    <button className={`col-12 b-none btn-primary font-18 f-600 l-137 ${styles["usernft-list-nft-btn"]}`}>List NFT</button>
                </div>
            }
        </div>
    </>
  )
}

export default NFTCard
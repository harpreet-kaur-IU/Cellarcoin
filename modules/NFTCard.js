import React from 'react';
import styles from './css/WineCard.module.css';
import {useRouter} from 'next/router';

const NFTCard = (props) => {
    const router = useRouter();
    const sellNftHandler = () =>{
        router.push("/sellnftUI")
    }
  return (
    <>
        <div className={`bg-card-dark ${styles["user-nft-cards-container"]}`}>
            <img className={`${styles["wine-bg-img"]}`} src={props.imageUrl}></img>
            <div className='p-16'>
                <div className='d-flex d-align-center d-justify-space-between text-light-gray mb-16'>
                    <h6 className='f-500'>Name</h6>
                    <h6 className={`d-flex ${styles["wine-card-content-view"]}`}>
                        <span className='rounded-8 d-flex d-align-center l-137 f-500 bg-white'>
                            <span>{props.views}</span>
                            <img src="images/view-primary.svg"></img>
                        </span>
                        <span className='rounded-8 d-flex d-align-center l-137 f-500 bg-white'>
                            <span>{props.favourites}</span>
                            <img src="images/heart.png"></img>
                        </span>
                    </h6>
                </div>
                <div className={`d-flex d-justify-space-between ${styles["nft-name"]}`}>
                    <h6 className='word-break l-137 f-500'>{props.name}</h6>
                </div>
                <div className='d-flex d-align-center d-justify-space-between text-light-gray'>
                    <h6 className='l-137 f-500'>Listing Price</h6>
                    <h6 className='l-137 f-500'>Owned by</h6>
                </div>
                <div className={`d-flex d-align-center d-justify-space-between text-dark ${styles["wine-card-content-row-2"]}`}>
                    <h5 className='l-137 f-500'>
                        <img src='images/eth.png'></img>
                        {props.price} 
                    </h5>
                    <h5 className='l-137 f-500'>@Odule</h5>
                </div>
            </div>
            {props.status==="Sell NFT" &&
                <div className='p-16'>
                    <button onClick={sellNftHandler} className={`col-12 b-none btn-primary font-18 f-600 l-137 ${styles["usernft-list-nft-btn"]}`}>Sell NFT</button>
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
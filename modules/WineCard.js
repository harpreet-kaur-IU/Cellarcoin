import React from 'react'
import styles from './css/WineCard.module.css'
import {useRouter} from 'next/router'
import { getUserOnBoardFromCookie } from '../auth/userCookies';
const WineCard = (props) => {
    const router = useRouter();
    const JWTToken = getUserOnBoardFromCookie();
    const navigationHandler = () =>{
        if(props.id)
            router.push(`/purple/${props.id}`)
    }
    const favoriteHandler = (e) =>{
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+JWTToken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "favourites": true
        });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/updateFavourites/${e.currentTarget.id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
  return (
    <>
        <div className={`bg-card-dark ${styles["wine-cards-container"]}`}>
            <img  onClick={navigationHandler} className={`${styles["wine-bg-img"]}`} src={props.imageUrl}></img>
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
                            <img id={props.id} onClick={favoriteHandler} className='cursor-pointer' src="images/heart.png"></img>
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
                        <img src='images/polygon-icon.svg'></img>
                        {props.price} MATIC
                    </h5>
                    <h5 className='l-137 f-500'>@Odule</h5>
                </div>
            </div>
        </div>
    </>
  )
}

export default WineCard
import React , {useEffect, useState} from 'react'
import styles from './css/WineCard.module.css'
import {useRouter} from 'next/router'
import { getUserOnBoardFromCookie } from '../auth/userCookies';
const WineCard = (props) => {
    const [nftdata,setData] = useState(props.data);
    const router = useRouter();
    const JWTToken = getUserOnBoardFromCookie();
    const navigationHandler = () =>{
        if(nftdata._id)
            router.push(`/purple/${nftdata._id}`)
    }

    const favoriteHandler = (e) =>{
        if(JWTToken){
            e.preventDefault();
            console.log(JWTToken);
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+JWTToken);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "favourites": true
            });

            var requestOptions = {
                method:'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/updateFavourites/${e.currentTarget.id}`, requestOptions)
            .then(response => response.text())
            .then(result =>{
                var myHeaders = new Headers();
                myHeaders.append("Content-Type","application/json");
                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                };
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getPremiumNft`, requestOptions)
                .then(response => response.json())
                .then(result1 =>{ 
                    setData(result1.data)
                    
                })
                .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));
        }else{
            props.handler()
        }
    }
  return (
    <>
        <div className={`bg-card-dark ${styles["wine-cards-container"]}`}>
            <img  onClick={navigationHandler} className={`${styles["wine-bg-img"]}`} src={nftdata.imageUrl}></img>
            <div className='p-16'>
                <div className='d-flex d-align-center d-justify-space-between text-light-gray mb-16'>
                    <h6 className='f-500'>Name</h6>
                    <h6 className={`d-flex ${styles["wine-card-content-view"]}`}>
                        <span className='rounded-8 d-flex d-align-center l-137 f-500 bg-white'>
                            <span>{nftdata.views}</span>
                            <img src="images/view-primary.svg"></img>
                        </span>
                        <span className='rounded-8 d-flex d-align-center l-137 f-500 bg-white'>
                            <span>{nftdata.favourites}</span> 
                            <img id={nftdata._id} onClick={favoriteHandler} className='cursor-pointer' src={nftdata.favourites?"images/heart-fill.svg":"images/heart.png"}></img>
                        </span>
                    </h6>
                </div>
                <div className={`d-flex d-justify-space-between ${styles["nft-name"]}`}>
                    <h6 className='word-break l-137 f-500'>{nftdata.name}</h6>
                </div>
                <div className='d-flex d-align-center d-justify-space-between text-light-gray'>
                    <h6 className='l-137 f-500'>Listing Price</h6>
                    <h6 className='l-137 f-500'>Owned by</h6>
                </div>
                <div className={`d-flex d-align-center d-justify-space-between text-dark ${styles["wine-card-content-row-2"]}`}>
                    <h5 className='l-137 f-500'>
                        <img src='images/polygon-icon.svg'></img>
                        {nftdata.price} MATIC
                    </h5>
                    <h5 className='l-137 f-500'>@Odule</h5>
                </div>
            </div>
        </div>
    </>
  )
}

export default WineCard
import React, { useState,useEffect } from 'react'
import style from './css/MarketPlaceBanner.module.css'
import { useRouter } from 'next/router'
import { getUserOnBoardFromCookie } from '../auth/userCookies'
import Modal from './Modal'
import SignUp from './SignUp';
import Loader from './Vendors Panel/Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MarketPlaceBanner = () => {
    const JWTToken = getUserOnBoardFromCookie();
    const [data,setData] = useState("")
    const router = useRouter();
    const nftId = router.query["id"];
    const [toggle,setToggle] = useState(false)
    const [loading,setLoading] = useState(false)
    const[favorite,setFavorite] = useState(false)
    // const [expirydate,setDate] = useState("")

    const navigationHandler = () =>{
        router.push(`/profile/${data.brand._id}`)
    }
    
    const buyNowHandler = () =>{
        if(JWTToken){
            router.push(`/ownedby/${data._id}`)
        }
        else{
            handleClick()
        }
    }
   
    const handleClick = () =>{
        setToggle(prev => !prev);
    }

    useEffect(()=>{
        if(nftId){
           getNFTDetails()
        }
    },[nftId])

    const getUserId = () =>{
        if(JWTToken){
            function parseJwt() {
                if(!JWTToken){
                    return;
                }
                const base64Url = JWTToken.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                return JSON.parse(window.atob(base64));
            }
            var user = parseJwt();
            return user.user._id
        }
    }

    const getNFTDetails = () =>{
        let userId = getUserId()
        var myHeaders = new Headers();
        myHeaders.append("Content-Type","application/json");
    
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        // setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getNft?nftId=${nftId}&&userId=${userId?userId:"null"}`, requestOptions)
        .then(response => response.json())
        .then(result =>{
            setFavorite(result.favourite)
            setData(result.nft)
        })
        .catch(error => console.log('error', error));
    }

    const favoriteHandler = () =>{
        if(JWTToken){  
          //add favourite
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+JWTToken);
            myHeaders.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({
                "favourite":favorite?false:true
            });

            var requestOptions = {
                method:'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            var currentFavorite = favorite?false:true;
            if(currentFavorite){
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/updateFavourites/${nftId}`, requestOptions)
                .then(response => response.text())
                .then(result =>{
                    getNFTDetails()
                })
                .catch(error => console.log('error', error));
            }else{
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/removeItem/${nftId}`, requestOptions)
                .then(response => response.text())
                .then(result =>{
                    getNFTDetails()
                })
                .catch(error => console.log('error', error));
            }
        }else{
            toast.warning("Please sign in",{
                toastId:"2"
            });
        }
    }
    
  return (
    <>
        {loading && <Loader></Loader>}
        <div className={`bg-pink ${style["market-banner-section"]}`}>
            {data &&
                <div className={`container d-grid ${style["market-grid-wrapper"]}`}>
                    <div className={`d-flex d-flex-column d-align-center d-justify-center ${style["marketplace-image-wrapper"]}`}>
                        <div className={`cursor-pointer d-flex d-justify-end ${style["favorite-icon"]}`}>
                            <div onClick={()=>favoriteHandler(data.favourite)}  className='col-3  d-flex d-align-center d-justify-center'>
                                <img src={favorite? "images/heart-fill.svg" : "images/heart.png"}></img>
                            </div>
                        </div>
                        <img className={`${style["nft-image"]}`} src={data.imageUrl}></img>
                    </div>
                    <div className={`rounded-16 bg-active text-black ${style["marketplace-card-1"]}`}>
                        <div className={`${style["marketplace-card-1-margin"]}`}>
                            <h3 className='font-31 f-500 l-137'>{data.name}</h3>
                            <p className={`mt-16 font-20 f-400 l-137 ${style["marketplace-card-desc"]}`}>{data.description}</p>
                            <h5 className='mt-16 font-25 l-137 f-500'>Wallet Address</h5>
                            <h5 className='mt-16 font-24 l-137 f-500'>{data.walletAddress === ""?"--n.a--":data.walletAddress}</h5>
                            <h5 className='mt-16 font-25 l-137 f-500'>Price</h5>
                            <h5 className='d-flex d-align-center gap-1 mt-16 font-24 l-137 f-500'>
                                <img className={`${style["polygon-icon-img"]}`} src='images/polygon-icon.svg'></img>
                                {data.price} MATIC
                            </h5>
                            <div className='d-flex d-flex-wrap d-align-center d-justify-space-between'>
                                <button onClick={buyNowHandler} className={`cursor-pointer mt-32 font-20 f-500 l-137 btn-primary ${style["buy-now-btn"]}`}>Buy Now</button>
                                <div onClick={navigationHandler} className={`cursor-pointer f-500 font-25 l-137 mt-24 d-block text-primary a-underline ${style["marketplace-view-profile"]}`}>View Profile</div>
                            </div>
                        </div>
                    </div>

                    <div className={` ${style["marketplace-card-2"]}`}>
                        <h5 className='mt-16 f-400 l-137 text-dark-gray'>WineMaker</h5>
                        <h5 className='mt-8 font-25 f-500 l-137 text-black'>{data.brand.brandName}</h5>
                        <h5 className='mt-16 f-400 l-137 text-dark-gray'>Region</h5>
                        <h5 className='mt-8 font-25 f-500 l-137 text-black'>{data.attributes[2] ? (data.attributes[2].value===''?<i>--n.a--</i>:data.attributes[2].value) :<i>--n.a--</i>}</h5>
                        <h5 className='mt-16 f-400 l-137 text-dark-gray'>Volume by Alcohol</h5>
                        <h5 className='mt-8 font-25 f-500 l-137 text-black'>{data.attributes[1] ? (data.attributes[1].value===''?<i>--n.a--</i>:data.attributes[1].value) :<i>--n.a--</i>}</h5>
                        <h5 className='mt-16 f-400 l-137 text-dark-gray'>Bottle Size</h5>
                        <h5 className='mt-8 font-25 f-500 l-137 text-black'>{data.attributes[0] ? (data.attributes[0].value===''?<i>--n.a--</i>:data.attributes[0].value) :<i>--n.a--</i>}</h5>
                        <h5 className='mt-16 f-400 l-137 text-dark-gray'>Spirit</h5>
                        <h5 className='mt-8 font-25 f-500 l-137 text-black'>{data.attributes[3] ? (data.attributes[3].value===''?<i>--n.a--</i>:data.attributes[3].value) :<i>--n.a--</i>}</h5>
                        {/* <h5 className='mt-16 f-400 l-137 text-dark-gray'>Available to Redeem:</h5>
                        <h5 className='mt-8 font-25 f-500 l-137 text-black'>
                            On {expirydate}
                        </h5> */}
                    </div>
                </div>
            }
            {toggle &&
                <Modal modalClass="modal-verify">
                    <SignUp  handler={handleClick}></SignUp>
                </Modal>
            }
        </div>
        <ToastContainer />
    </>
  )
}

export default MarketPlaceBanner
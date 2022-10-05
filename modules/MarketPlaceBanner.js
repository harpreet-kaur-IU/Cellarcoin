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
    var JWTToken =  getUserOnBoardFromCookie()
    const [data,setData] = useState("")
    const router = useRouter();
    const nftId = router.query["id"];
    const [toggle,setToggle] = useState(false)
    const [loading,setLoading] = useState(false)

    const navigationHandler = () =>{
        router.push("/profile")
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
    const confirmationHandler = () =>{
        
        toast.success("User Signed In Successfully",{
          toastId:"2"
        });
        
      }
    const [expirydate,setDate] = useState("")
    useEffect(()=>{
        if(nftId){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type","application/json");
        
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            };
            setLoading(true)
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getNft/${nftId}`, requestOptions)
            .then(response => response.json())
            .then(result =>{
                setData(result.nft)
                // var arr2 = result.nft.expiryDate.split('/');
                // var month = "";
                // if(arr2[1] === "01"){
                //     month="Jan";
                // }
                // else if(arr2[1] === "02"){
                //     month="Feb";
                // }
                // else if(arr2[1] === "03"){
                //     month="March";
                // }
                // else if(arr2[1] === "04"){
                //     month="Apr";
                // }
                // else if(arr2[1] === "05"){
                //     month="May";
                // }
                // if(arr2[1] === "06"){
                //     month="June";
                // }
                // else if(arr2[1] === "07"){
                //     month="July";
                // }
                // else if(arr2[1] === "08"){
                //     month="Aug";
                // }
                // else if(arr2[1] === "09"){
                //     month="Sept";
                // }
                // else if(arr2[1] === "10"){
                //     month="Oct";
                // }
                // else if(arr2[1] === "11"){
                //     month="Nov";
                // }
                // else if(arr2[1] === "12"){
                //     month="Dec";
                // }
                // var date = `${month} ${arr2[0]},${arr2[2]}`;
                // setDate(date)
                setLoading(false)
            })
            .catch(error => console.log('error', error));
        }
    },[nftId])

    const favoriteHandler = () =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization","Bearer "+JWTToken);
        myHeaders.append("Content-Type","application/json");
        
        var raw = JSON.stringify({
            "favourites":true
        })

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw
        }

        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/updateFavourites/${nftId}`, requestOptions)
        .then(response => response.json())
        .then(result =>{
            console.log(result)
            setLoading(false)
        })
        .catch(error => console.log('error', error));
    }
  return (
    <>
        {loading && <Loader></Loader>}
        <div className={`bg-pink ${style["market-banner-section"]}`}>
            {data &&
                <div className={`container d-grid ${style["market-grid-wrapper"]}`}>
                    <div className={`d-flex d-flex-column d-align-center d-justify-center ${style["marketplace-image-wrapper"]}`}>
                        <div onClick={favoriteHandler} className={`cursor-pointer d-flex d-justify-end ${style["favorite-icon"]}`}>
                            <img src="images/heart.png"></img>
                        </div>
                        <img className={`${style["nft-image"]}`} src={data.imageUrl}></img>
                    </div>
                    <div className={`rounded-16 bg-active text-black ${style["marketplace-card-1"]}`}>
                        <div className={`${style["marketplace-card-1-margin"]}`}>
                            <h3 className='font-31 f-500 l-137'>{data.name}</h3>
                            <p className={`mt-16 font-20 f-400 l-137 ${style["marketplace-card-desc"]}`}>{data.description}</p>
                            <h5 className='mt-16 font-25 l-137 f-500'>Wallet Address</h5>
                            <h5 className='mt-16 font-24 l-137 f-500'>
                                {data.walletAddress===""?"--n.a--":data.walletAddress}
                            </h5>
                            <h5 className='mt-16 font-25 l-137 f-500'>Price</h5>
                            <h5 className='d-flex d-align-center gap-1 mt-16 font-24 l-137 f-500'>
                                <img className={`${style["polygon-icon-img"]}`} src='images/polygon-icon.svg'></img>
                                {data.price} wETH
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
                        <h5 className='mt-8 font-25 f-500 l-137 text-black'>{data.attributes[2].value===''? "--n.a--":data.attributes[2].value}</h5>
                        <h5 className='mt-16 f-400 l-137 text-dark-gray'>Volume by Alcohol</h5>
                        <h5 className='mt-8 font-25 f-500 l-137 text-black'>{data.attributes[1].value===''? "--n.a--":data.attributes[1].value}</h5>
                        <h5 className='mt-16 f-400 l-137 text-dark-gray'>Bottle Size</h5>
                        <h5 className='mt-8 font-25 f-500 l-137 text-black'>{data.attributes[0].value===''? "--n.a--":data.attributes[0].value}</h5>
                        <h5 className='mt-16 f-400 l-137 text-dark-gray'>Spirit</h5>
                        <h5 className='mt-8 font-25 f-500 l-137 text-black'>{data.attributes[3].value===''? "--n.a--":data.attributes[3].value}</h5>
                        {/* <h5 className='mt-16 f-400 l-137 text-dark-gray'>Available to Redeem:</h5>
                        <h5 className='mt-8 font-25 f-500 l-137 text-black'>
                            On {expirydate}
                        </h5> */}
                    </div>
                </div>
            }
            {toggle &&
                <Modal modalClass="modal-verify">
                    <SignUp confirm={confirmationHandler} handler={handleClick}></SignUp>
                </Modal>
            }
        </div>
        <ToastContainer />
    </>
  )
}

export default MarketPlaceBanner
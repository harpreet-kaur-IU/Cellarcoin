import React, { useEffect, useState } from 'react'
import style from './css/OwnedBy.module.css'
import { useRouter } from 'next/router'
import Modal from './Modal'
import Congrats from './Congrats'
import Loader from './Vendors Panel/Loader';
import { getUserOnBoardFromCookie } from '../auth/userCookies'
import Nft_marketplace_ABI from '../modules/Vendors Panel/Nft_marketplace_ABI.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from 'ethers';
import web3 from 'web3';
const OwnedBy = () => {
    const [add,setAdd] = useState(false);
    const router = useRouter();
    const [data,setData] = useState("");
    const nftId = router.query["id"];
    const [loading,setLoading] = useState(false);
    const JWTToken = getUserOnBoardFromCookie();

    //buy now handler
    const buyNowHandler = () =>{   
        walletConnected()
    }

    //connect wallet
    const walletConnected = async() =>{
        const { ethereum } = window;
        if (ethereum) {
            var provider = new ethers.providers.Web3Provider(ethereum);
        }
        const isMetaMaskConnected = async () => {
            const accounts = await provider.listAccounts();
            return accounts.length > 0;
        }
        await isMetaMaskConnected().then((connected) => {
            if(connected) {
                buy() // second call
            }else{
                toast.warning("Please Connect Your Wallet",{
                    toastId:"2"
                });
            }
        });
    }

    //web3 buy function
    const buy = async()=>{ 
        const ethers = require("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        
        if(typeof window.ethereum !== "undefined"){
            const contractAddress = "0x75d87f709B5E74F049271D9d82816231dCEE1eEd";
            const contract = new ethers.Contract(
                contractAddress,
                Nft_marketplace_ABI,
                signer
            );
            try{
                await contract.buynftwithERC(
                   data.tokenId,
                    {
                        value:data.price
                    }
                    // const price = ethers.utils.parseUnits(data.price.toString(), 'ether')
                )
                .then(response => {
                    buyNft(response,addr);
                })
            }catch(error){
                console.log(error);
            }
        }else{
            console.log("Please install MetaMask");
        }
    }

    //web3 code ends here
    const buyNft = (hashResponse,walletAddress) =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization","Bearer "+JWTToken);
        myHeaders.append("Content-Type","application/json");

        var requestOptions = {
            method:'POST',
            headers:myHeaders,
            redirect:'follow'
        };
        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/createOrder/${nftId}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            setLoading(false)
            // setAdd(prev=>!prev);
            updateUserCollection(hashResponse,walletAddress);
        })
        .catch(error => console.log('error', error));
    }
    
    //update collection API
    const updateUserCollection = (hashResponse,walletAddress) =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization","Bearer "+JWTToken);

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/updateUserCollection/${nftId}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            addTransaction(hashResponse.hash,nftId,walletAddress);
        })
        .catch(error => console.log('error', error));
    }

    //create order API for adding transaction history
    const addTransaction = (hash,id,walletAddress) =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization","Bearer "+JWTToken);
        myHeaders.append("Content-Type","application/json");

        var raw = JSON.stringify({
            "walletAddressFrom": "",
            "walletAddressTo": walletAddress,
            "hash": hash,
            "tokenId": data.tokenId,
            "transactionType": "transferred"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/createOrder/${id}`, requestOptions)
        .then(response => response.text())
        .then(result =>{
            router.push("/usernft")
        })
        .catch(error => console.log('error', error));
    }

    const continueHandler = () =>{
        setAdd(prev=>!prev);
    }

    const cancelHandler = () =>{
        router.push(`/purple/${nftId}`);
    }

    useEffect(()=>{
        if(JWTToken){
            function parseJwt() {
                if(!JWTToken){
                return
                }
                const base64Url = JWTToken.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                return JSON.parse(window.atob(base64));
            }
            var user = parseJwt();
            var userId = (user.user._id)
        }
        if(nftId){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type","application/json");
        
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
            };

            setLoading(true)
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getNft?nftId=${nftId}&&userId=${userId}`, requestOptions)
            .then(response => response.json())
            .then(result =>{
                setData(result.nft)
                setLoading(false)
            })
            .catch(error => console.log('error', error));
        }
    },[nftId])

    // const time = () =>{
    //     var fiveMinutes = 60 * 5;
    //     console.log(fiveMinutes)
    //     var display = document.querySelector('#time');
    //     var timer = fiveMinutes, minutes, seconds;
    //     setInterval(function () {
    //         minutes = parseInt(timer / 60, 10);
    //         seconds = parseInt(timer % 60, 10);
    //         minutes = minutes < 10 ? "0" + minutes : minutes;
    //         seconds = seconds < 10 ? "0" + seconds : seconds;
    //         display.textContent = minutes + ":" + seconds;
    //         if (--timer < 0) {
    //             timer = duration;
    //         }
    //     }, 1000);
    // }

    
  return (
    <>
        {loading && <Loader></Loader>}
        <div className={`p-relative col-12 ${style["wine-ownedby-section"]}`}>
            <div className={`container ${style["wine-ownedby-container"]}`}>
                <h2 className={`f-600 l-137 text-center ${style["buy-nft-h2"]}`}>Buy NFT</h2>
                {data &&
                    <div className={`d-flex  ${style["wine-images-row"]}`}>
                        {/* <div className={`d-none mt-32 ${style["checkout-btn-wrapper-sm"]}`}>
                            <div className={`d-flex d-align-center d-justify-center btn-secondary ${style["checkout-details"]}`}>
                                <h4 className='cursor-pointer font-20 f-500 l-137'>
                                    Time left for checkout <span id="time">05:00</span>
                                </h4>
                            </div>
                        </div> */}
                        <div className={`d-flex d-align-center d-justify-center col-3 ${style["wine-images-col-1"]}`}>
                            {/* <img className='p-relative' src='images/owned-bg.png'></img> */}
                            <img className={`${style["wine-image-top"]}`} src={data.imageUrl}></img>
                        </div> 
                        <div className={`col-4 ${style["wine-images-col-2"]}`}>
                            <h3 className='f-500 l-137'>{data.name}</h3>
                            <h5 className='mt-16 text-dark-gray f-400'>Price</h5>
                            <div className='mt-8 d-flex d-align-center gap-1'>
                                <img className={`${style["polygon-icon-img"]}`} src='images/polygon-icon.svg'></img>
                                <h5 className={`font-24 l-137 f-500 ${style["wine-price"]}`}>
                                    {data.price} MATIC
                                </h5>
                            </div>
                            <div className='mt-16'>
                                <h5 className='text-dark-gray f-400'>Includes:</h5>
                                <ul className={`mt-8 ${style["includes-ul"]}`}>
                                    <li className='font-20 f-500 l-137'>Lorem ipsum dolor sit amet.</li>
                                    <li className='font-20 f-500 l-137'>Hac morbi lorem quam tortor.</li>
                                    <li className='font-20 f-500 l-137'>Lorem ipsum dolor sit amet.</li>
                                </ul>
                            </div>
                        </div>
                        <div className={`col-5 ${style["wine-images-col-3"]}`}>
                            {/* <div className={`d-flex d-justify-end ${style["checkout-btn-wrapper"]}`}>
                                <div className={`d-flex d-align-center d-justify-center btn-secondary ${style["checkout-details"]}`}>
                                    <h4 className='cursor-pointer font-20 f-500 l-137'>
                                        Time left for checkout <span id="time">05:00</span>
                                    </h4>
                                </div>
                            </div> */}
                            <h3 className={`mt-48 f-500 l-137 ${style["payment-h3"]}`}>Payment method</h3>
                            <div className={`${style["btn-wrapper-sm"]}`}>
                                <button className={`cursor-pointer mt-32 font-20 f-500 l-137 btn-secondary ${style["meta-mask-btn"]}`}>Metamask</button>
                                <button onClick={cancelHandler} className={`cursor-pointer mt-108 font-20 f-500 l-137 btn-secondary ${style["cancel-btn"]}`}>Cancel</button>
                                <button onClick={buyNowHandler} className={`cursor-pointer mt-24 font-20 f-500 l-137 btn-primary b-none ${style["continue-btn"]}`}>Continue</button>
                            </div>
                        </div>
                        {/* <div className={`col-3 p-relative ${style["wine-images-col-2"]}`}>
                            <img className='p-relative' src='images/owned-bg.png'></img>
                            <img className={`p-absolute ${style["wine-image-top"]}`} src="images/owned-img.png"></img>
                        </div>  */}
                    </div>
                }
            </div>
            {add && 
                <Modal modalClass="modal-verify">
                    <Congrats handler={continueHandler}></Congrats>
                </Modal>
            }
        </div>
        <ToastContainer />
    </>
  )
}

export default OwnedBy
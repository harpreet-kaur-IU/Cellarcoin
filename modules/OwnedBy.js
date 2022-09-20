import React, { useEffect, useState } from 'react'
import style from './css/OwnedBy.module.css'
import { useRouter } from 'next/router'
import Modal from './Modal'
import Congrats from './Congrats'
import Loader from './Vendors Panel/Loader';
const OwnedBy = () => {
    const [add,setAdd] = useState(false);
    const router = useRouter();
    const [data,setData] = useState("");
    const nftId = router.query["id"];
    const [loading,setLoading] = useState(false);

    const continueHandler = async() =>{
        setAdd(prev=>!prev);
        // // buy now
        // if(typeof window.ethereum !== "undefined") {
        //     const contractAddress = "0xDf00126C37EFB27e60F53c520364763fc99e7F2B";
        //     const contract = new ethers.Contract(
        //         contractAddress,
        //         Nft_marketplace_ABI,
        //         signer
        //     );
        //     try {
        //         await contract.placeNFTForSale( //for vendor
        //             "token_id", // counter starts from 4
        //             "price"
        //         )

        //         await contract.buynftwithERC( //for user
        //             "token_id", // counter starts from 4
        //             "0x0000000000000000000000000000000000001010"
        //         )

        //         await contract.RemoveNFTfromSale( //for vendor
        //             "token_id" // counter starts from 4
        //         )
        //         .then(response=> console.log(response))
        //     }catch(error){
        //         console.log(error);
        //     }
        // }else{
        //     console.log("Please install MetaMask");
        // }
    }

    const cancelHandler = () =>{
        router.push(`/purple/${nftId}`);
    }
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
                            <div className='mt-8 d-flex d-align-center'>
                                <img src='images/eth.png'></img>
                                <h5 className={`font-24 l-137 f-500 ${style["wine-price"]}`}>
                                    {data.price} wETH
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
                                <button onClick={continueHandler} className={`cursor-pointer mt-24 font-20 f-500 l-137 btn-primary b-none ${style["continue-btn"]}`}>Continue</button>
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
    </>
  )
}

export default OwnedBy
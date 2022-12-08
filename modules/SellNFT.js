import {useEffect, useState} from 'react'
import DropDown from './Vendors Panel/DropDown'
import {useRouter} from 'next/router'
import styles from './css/Vendor Panel/SellNFT.module.css'
import Nft_marketplace_ABI from '../modules/Vendors Panel/Nft_marketplace_ABI.json'
import { getUserOnBoardFromCookie } from '../auth/userCookies'
const SellNFT = () => {
    const JWTToken = getUserOnBoardFromCookie();
    const router = useRouter();
    const nftId = router.query["id"];
    const [data,setData] = useState("")
    const[price,setPrice] = useState("");
    const[currency,setCurrency] = useState("MATIC");
    const [loading, setLoading] = useState(false);
    const [dropdown,setDropdown] = useState(false);
    const [expire,setExpire] = useState("")
    const [isPrice,setPriceError] = useState(false)
    const [isExpire,setExpireError] = useState(false)
    const regex = /^[0-9]*$/;
    
    const priceHandler  = (e) =>{
      setPrice(e.target.value)
    }

    const expireHandler = (value) =>{
      setExpire(value);
    }
    const validator = () =>{
      if(regex.test(price)){
        setPriceError(false);
      }else{
        setPriceError(true);
      }
      if(expire === ''){
        setExpireError(true);
      }else{
        setExpireError(false);
      }
      if(!regex.test(price) || expire===""){
        return false;
      }else{
        return true;
      }
    }
    //on form submit
    const formSubmit = (e) =>{
      e.preventDefault()
      var result = validator();
      if(result){
        sellNftWeb3();
      }
    }
    //web3 function for sell nft
    const sellNftWeb3 = async()=>{
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
          await contract.placeNFTForSale(
            data.tokenId,
            price
          )
          .then(response => {
            sellNft(response,addr)
          })
        }catch(error){
          console.log(error);
        }
      }else{
        console.log("Please install MetaMask");
      }
    }
    //sell nft API
    const sellNft = (response,walletAddress) =>{
      var myHeaders = new Headers();
      myHeaders.append("Authorization","Bearer "+JWTToken);
      myHeaders.append("Content-Type","application/json");
    
      var raw = JSON.stringify({
        "price": price,
        "currency": currency,
        "expireAfter":expire
      })
    
      var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body:raw,
        redirect: 'follow'
      };
    
      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/setPrice/${nftId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        addTransaction(response.hash,nftId,walletAddress)
      })
      .catch(error => console.log('error', error));
    }
    //add order API
    const addTransaction = (hash,id,walletAddress) =>{
      var myHeaders = new Headers();
      myHeaders.append("Authorization","Bearer "+JWTToken);
      myHeaders.append("Content-Type", "application/json");
    
      var raw = JSON.stringify({
        "walletAddressFrom": walletAddress,
        "walletAddressTo": "",
        "hash": hash,
        "tokenId": data.tokenId,
        "transactionType": "listed"
      });
    
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
    
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/createOrder/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        setLoading(false)
      })
      .catch(error => console.log('error', error));
    }
    //getNft by Id
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

  return (
    <div className={`${styles["sell-nft-wrapper"]}`}>
      <h2 className={`f-500 l-65 ${styles["sell-nft-main-heading"]}`}>Select your sell method</h2>
      <div className={`d-flex ${styles["sell-nft-img-content-wrapper"]}`}>
        <div className={`d-flex d-justify-center bg-common rounded-16 ${styles["sell-nftimg-wrapper"]}`}>
          <img className={`col-6 ${styles["sell-nft-UI-img"]}`} src={data.imageUrl}></img>
        </div>
        <div className={`col-6 ${styles["sell-nft-content"]}`}>
          <h4 className='f-500'>{data && data.name}</h4>
          <h5 className={`f-400 l-27 ${styles["nft-desc"]}`}>{data && data.description}</h5>
          <h5 className={`f-600 l-27 ${styles["contract-address-heading"]}`}>Contract Address</h5>
          <h5 className={`f-400 l-27 ${styles["contract-address"]}`}>0x75d87f709B5E74F049271D9d82816231dCEE1eEd</h5>
          <h5 className={`f-600 l-27 ${styles["token-heading"]}`}>Token Id</h5>
          <h5 className={`f-400 l-27 ${styles["token"]}`}>{data.tokenId}</h5>
        </div>
      </div>
    
      <div className={`${styles["set-price-wrapper"]}`}>
        <h3 className={`f-600 font-31 ${styles["set-price-nft-h3"]}`}>Set Price for your NFT</h3>
        <form className='col-8' onSubmit={formSubmit}>
          <div className={` d-flex d-flex-column ${styles["price-wrapper"]}`}>
            <label className='font-24 f-400 l-32'>Minimum Price</label>
            <div className={`d-flex d-align-center d-justify-space-between ${styles["price-input"]}`}>
              <input value={price} onChange={priceHandler} className='col-10' type="text" required></input>
              <div className={`d-flex d-align-center d-justify-center col-2 ${styles["price-unit"]}`}>
                <h6 className='font-24 f-500 l-33'>MATIC</h6>
                {/* <img src='images/arrow-down-white.svg'></img> */}
              </div>
            </div>
            {isPrice && <span className={`mt-24 mb-8 font-14 f-700 text-danger`}>Please Enter Valid Price.</span>}
          </div>

          <div className={`${styles["expire-date"]}`}>
            <h4 className={`f-600 mb-32 ${styles["expiry-date-h4"]}`}>Expiration Date</h4>
            <DropDown handler={expireHandler} placeholder="Select Expiry Date"></DropDown>
            {isExpire && <span className={`mt-32 mb-8 font-14 f-700 text-danger`}>Please Select Expiry Date.</span>}
            <div className={`${styles["expire-instructions"]}`}>
              <h4 className={`font-24 f-400 l-33 ${styles["expire-instructions-1"]}`}>*Not less than 7 days</h4>
              <h4 className={`font-24 f-400 l-33 ${styles["expire-instructions-2"]}`}>*Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
            </div>

            <div className={`d-flex d-flex-column ${styles["royalty-fee"]}`}>
              <h3 className={`font-31 f-600 l-39 ${styles["royalty-fee-h3"]}`}>Royalty Fee</h3>
              <h4 className={`font-24 f-400 l-33 ${styles["royalty-fee-h4"]}`}>A royalty payment gives a percentage of of the sale price to the orginal creator/ beneficiary each time the NFT is sold on our platform/Marketplace</h4>
            </div>
            <div className={`d-flex d-justify-end ${styles["list-btn"]}`}>
              <button className='cursor-pointer font-20 f-500'>Sell</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SellNFT
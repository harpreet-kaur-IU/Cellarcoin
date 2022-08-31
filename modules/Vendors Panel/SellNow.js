import React,{useState,useEffect} from 'react'
import styles from '.././css/Vendor Panel/SellNFT.module.css'
import {useRouter} from 'next/router'
import {getOnBoardFromCookie} from '../../auth/userCookies';
const SellNow = () => {
    const router = useRouter();
    const nftId = router.query["id"];
    var JWTtoken = getOnBoardFromCookie();
    const [data,setData] = useState("")
    const[price,setPrice] = useState("");
    const[currency,setCurrency] = useState("ETH");
  
    const priceHandler  = (e) =>{
      setPrice(e.target.value)
    }
  
    useEffect(()=>{
      if(nftId){
          var myHeaders = new Headers();
          myHeaders.append("Authorization","Bearer "+JWTtoken);
          myHeaders.append("Content-Type","application/json");
  
          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
          };
  
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/getNftById/${nftId}`, requestOptions)
          .then(response => response.json())
          .then(result =>{
            setData(result.data)
          })
          .catch(error => console.log('error', error));
      }
    },[nftId])
  
    const formSubmit = (e) =>{
      e.preventDefault();
      var myHeaders = new Headers();
      myHeaders.append("Authorization","Bearer "+JWTtoken);
      myHeaders.append("Content-Type","application/json");
  
      var raw = JSON.stringify({
        "price": price,
        "currency": currency
      })
  
      var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body:raw,
        redirect: 'follow'
      };
  
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/setPrice/${nftId}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    }
  return (
    <div className={`${styles["sell-now-wrapper"]}`}>
        <h4 className='f-600 l-22'>Set Price for your NFT</h4>
        <form>
            <div className={`d-flex d-flex-column ${styles["price-wrapper"]}`}>
                <label className='font-24 f-400 l-32'>Minimum Price</label>
                <div className={`d-flex d-align-center d-justify-space-between ${styles["price-input"]}`}>
                    <input value={price} onChange={priceHandler} className='col-10' type="text" ></input>
                    <div className={`d-flex d-align-center d-justify-center col-2 ${styles["price-unit"]}`}>
                    <h6 className='font-24 f-500 l-33'>ETH</h6>
                    <img src='images/arrow-down-white.svg'></img>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default SellNow
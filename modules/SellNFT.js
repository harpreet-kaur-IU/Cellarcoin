import {useState} from 'react'
import DropDown from './Vendors Panel/DropDown'
import {useRouter} from 'next/router'
import styles from './css/Vendor Panel/SellNFT.module.css'
const SellNFT = () => {
    const router = useRouter();
    const [data,setData] = useState("")
    const[price,setPrice] = useState("");
    const[currency,setCurrency] = useState("ETH");
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
    const listNavigationHandler = ()=>{
      router.push("/purple")
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
        if(!regex.test(price) || expire === ''){
          return false;
        }else{
          return true;
        }
    }
    const formSubmit = (e) =>{
        router.push("/purple")
        e.preventDefault()
        // var result = validator();
        // if(result){
           
        //   e.preventDefault();
        //   var myHeaders = new Headers();
        //   myHeaders.append("Authorization","Bearer "+JWTtoken);
        //   myHeaders.append("Content-Type","application/json");

        //   var raw = JSON.stringify({
        //     "price": price,
        //     "currency": currency,
        //     "expireAfter":expire
        //   })

        //   var requestOptions = {
        //     method: 'PATCH',
        //     headers: myHeaders,
        //     body:raw,
        //     redirect: 'follow'
        //   };

        //   setLoading(true)
        //   fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/setPrice/${nftId}`, requestOptions)
        //   .then(response => response.json())
        //   .then(result => {
        //     Router.push("/allnftlist");
        //     setLoading(false)
        //   })
        //   .catch(error => console.log('error', error));
        // }
    }
  return (
    <div className={`${styles["sell-nft-wrapper"]}`}>
    <h2 className={`f-500 l-65 ${styles["sell-nft-main-heading"]}`}>Select your sell method</h2>
    
    <div className={`d-flex ${styles["sell-nft-img-content-wrapper"]}`}>
        <div className={`d-flex d-justify-center bg-common rounded-16 ${styles["sell-nftimg-wrapper"]}`}>
            <img className={`col-6 ${styles["sell-nft-UI-img"]}`} src="images/marketplace-banner.png"></img>
        </div>
        <div className={`col-6 ${styles["sell-nft-content"]}`}>
            <h4 className='f-500'>Purple Malbec Wine 2016 Lorem ipsum dolor #08</h4>
            <h5 className={`f-400 l-27 ${styles["nft-desc"]}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis pretium dui, commodo sed id nunc vel pharetra. Tellus pretium egestas in massa dapibus </h5>
            <h5 className={`f-600 l-27 ${styles["contract-address-heading"]}`}>Contract Address</h5>
            <h5 className={`f-400 l-27 ${styles["contract-address"]}`}>AQRGSGSGSGFSGDS3133#R$TQ@$</h5>
            <h5 className={`f-600 l-27 ${styles["token-heading"]}`}>Token</h5>
            <h5 className={`f-400 l-27 ${styles["token"]}`}>AQRGSGSGSGFSGDS3133#R$TQ@$</h5>
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
              <h6 className='font-24 f-500 l-33'>ETH</h6>
              {/* <img src='images/arrow-down-white.svg'></img> */}
            </div>
          </div>
          {isPrice && <span className={`mt-24 mb-8 font-14 f-700 text-danger`}>Please Enter Valid Price.</span>}
        </div>

        <div className={`${styles["expire-date"]}`}>
          <h4 className={`f-600 ${styles["expiry-date-h4"]}`}>Expiration Date</h4>
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
            <button onClick={listNavigationHandler} className='font-20 f-500'>List</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  )
}

export default SellNFT
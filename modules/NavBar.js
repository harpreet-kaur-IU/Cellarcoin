import Link from 'next/link'
import React, {useEffect,useState,useRef} from 'react'
import style from './css/NavBar.module.css'
import SignUp from './SignUp';
import {useRouter} from 'next/router';
import Modal from './Modal';
import useFirebaseAuth from '../auth/useFirebaseAuth';
import NotificationModal from './NotificationModal';
import {getUserOnBoardFromCookie,removeUserOnBoardCookie} from '../auth/userCookies';
import NavItems from './NavItems';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Hamburger from '../icons/Hamburger';
import SiteLogo from '../icons/SiteLogo';
import {ethers} from "ethers";
import Web3Modal from "web3modal";
import ProfileIcon from '../icons/ProfileIcon';
import { SearchLoader } from './SearchLoader';

function useOutsideAlerter(ref,handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
const NavBar = () => {
  const wrapperRef = useRef(null);
  const handler = ()=>{
    setSearchBar(false)
  }
  useOutsideAlerter(wrapperRef,handler);

  const {signOut} = useFirebaseAuth(); 
  const router = useRouter();
  const [dropdown,setDropdown] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [noti,setNoti] = useState(false)
  const [res,setRes] = useState(false)
  const [token,setToken] = useState(false)
  const [confirm,setConfirm] = useState(false)
  const[email,setEmail] = useState("")
  const [userId,setUserId] = useState("")
  const [searchBar,setSearchBar] = useState(false)
  const [brand,setBrand] = useState("");
  const [nft,setNft] = useState("")
  const [searchLoading,setSearchLoading] = useState(false)
  var JWTToken = getUserOnBoardFromCookie();

  useEffect(()=>{
    if(!JWTToken){
      setToken(false)
    }
    else{
      setToken(true)
    }
  },[toggle])

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
      setUserId(user.user._id)
    }else{
        // Router.push("/vendorlogin")
    }
  },[])

  const handleClick = () =>{
    setToggle(prev => !prev);
  }
  const handleClick2 = () =>{
    setToggle2(prev => !prev);
  }
  const notificationHandler = () =>{
    setNoti(prev=>!prev);
  }
  
  //wallet Handler
  const walletHandler = () =>{
    if(JWTToken){
      
    }else{
      handleClick()
    }
  }
  //dropdown Handler
  const dropdownHandler = () =>{
    if(JWTToken){
      setDropdown(!dropdown)
    }else{
      handleClick()
    }
  }
  const profileHandler = () =>{
    router.push(`/editprofile/${userId}`)
  }
  const paymentHandler = () =>{
    router.push("/editprofile")
  }
  const collectionHandler = () =>{
    router.push("/usernft")
  }
  
  const logHandler = () =>{
    signOut()
    .then(()=>{
      removeUserOnBoardCookie()
      router.push("/")
      setToken(false)
      setConfirm(false)
    })
    .catch((error)=>console.log("error while logout"))
    setDropdown(!dropdown)
  }
  const navBarHandler = () =>{
    setRes(prev => !prev)
  }

  const navigationHandler = (e) =>{
    setSearchBar(false)
    router.push(`/purple/${e.currentTarget.id}`)
  }

  const brandHandler = (e) =>{
    setSearchBar(false)
    router.push(`/profile/${e.currentTarget.id}`)
  }
  const searchHandler = (e) =>{
    if(e.target.value.length>2){
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "searchTerm": e.target.value
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      setSearchLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}nft/searchNFT`, requestOptions)
        .then(response => response.text())
        .then(result => {
          const parseResult = JSON.parse(result);
          setBrand(parseResult.data2)
          setNft(parseResult.data);
          setSearchLoading(false)
          setSearchBar(true)
        })
        .catch(error => console.log('error', error));
    }else{
      setSearchBar(false)
    }
  }
  const [connectedWallet, setConnectedWallet] = useState(false);
  const web3ModalRef = useRef();

  const getSignerOrProvider = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      alert("Polygon Network");
      throw new Error("Change network to Rinkeby");
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return provider;
  };

  const connectWallet = async () => {
    try {
      await getSignerOrProvider();
      setConnectedWallet(true);
      
    } catch (error) {
      console.log(" error", error);
    }
    getAddress()
  };

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateWalletAddress(addr)
  }

  const updateWalletAddress = (address) =>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+JWTToken);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "walletAddress": address
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/updateWalletAddress`, requestOptions)
    .then(response => response.text())
    .then(result => result)
    .catch(error => console.log('error', error));
  }


  useEffect(() => {
    // let val = window.ethereum.isConnected();
    // if (val) {
    //   console.log("is connected " + val);
    // }else{
    //   console.log("Notconnected " + val);
    // }

    // window.ethereum.on("accountsChanged", function (accounts) {
    //   window.location.replace(location.pathname);
    // });

    web3ModalRef.current = new Web3Modal({
      network: "rinkeby",
      providerOptions: {},
    });
  },[]);

  return (
    <>
      <nav className={`p-fixed col-12 ${style["navbar"]}`}>
        <div className={`p-relative container d-flex d-align-center d-justify-center ${style["navbar-container"]}`}>
          <Link href="/">
            <img className={`cursor-pointer d-flex d-align-center d-justify-center ${style["navbar-site-logo"]}`} src='images/site-logo.png'></img>
          </Link>
          <Link href="/">
            <div className={`d-none d-align-center d-justify-center ${style["navbar-site-sm-logo"]} `}>
             <SiteLogo color="#780543"></SiteLogo>
            </div>
          </Link>
          <div className='p-relative'>
            <div className='p-relative'>
              <input onChange={searchHandler} className={`rounded-12 b-none bg-box font-13 f-400 l-135 ${style["navbar-search-input"]}`} placeholder='Search by Sellers, Wine or Collection'></input>
              <img className={`${style["search-icon-navbar"]}`} src='images/search-icon.svg'></img>
            </div>
            {searchLoading && <div className={`p-absolute ${style["search-loader-wrapper"]}`}><SearchLoader></SearchLoader></div>}
            <div  ref={wrapperRef} className={`p-absolute ${searchBar?"d-block":"d-none"} ${style["search-suggestion-wrapper"]}`}>
              <h6 className='text-brown font-10 l-137 f-700'>SUGGESTIONS</h6>
              <div className={`d-flex d-flex-column gap-1 mt-12 ${style["search-brand-wrapper"]}`}>
                {brand && brand.map((item)=>(
                  <h6 id={item._id} onClick={brandHandler} className='cursor-pointer font-13 f-400 l-137'>{item.brandName}</h6>
                ))}
              </div>
              <h6 className='text-brown font-10 l-137 f-700 mt-12'>NFT</h6>
              <div className={`d-flex d-flex-column gap-1 mt -12 ${style["search-nft-wrapper"]}`}>
                {nft && nft.map((item)=>(
                  <div onClick={navigationHandler} id={item._id} className={`cursor-pointer d-flex gap-1 ${style["search-nft-item"]}`}>
                    <img className={`${style["search-nft-img"]}`} src={item.imageUrl}></img>
                    <div className='d-flex d-flex-column'>
                      <h6 className='font-13 f-400 l-137'>{item.name}</h6>
                      <h6 className='font-10 f-400 l-137'>{item.brandName}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ul id="ul-navbar" className={`d-flex d-flex-row text-dark-gray ${style["navbar-items-wrapper"]} ${res ? style["expand"] : ""}`}>
            <NavItems name="not-transparent" path="/explore" value="Explore"></NavItems>
            <NavItems name="not-transparent" path="/community" value="Community"></NavItems>
            <NavItems name="not-transparent" path="/brands" value="Brands"></NavItems>
            <NavItems name="not-transparent" path="/about" value="About Us"></NavItems>
            {/* <li className='ml-32 font-16 f-700 l-124 text-black'><Link href="/explore">Explore</Link></li>
            <li className='ml-32 font-16 f-500 l-137'><Link href="/community">Community</Link></li>
            <li className='ml-32 font-16 f-500 l-137'><Link href="/brands">Brands</Link></li>
            <li className='ml-32 font-16 f-500 l-137'><Link href="/about">About us</Link></li> */}
            {!token && <li onClick={handleClick} className='cursor-pointer ml-32 font-16 f-500 l-137'>Sign In</li>}
          </ul>
          <button className={`b-none cursor-pointer btn-primary font-13 ml-32 f-500 l-137 ${style["btn-connect-wallet"]}`} onClick={() => connectWallet()}>Connect Wallet</button>
          <div className={`cursor-pointer d-none ml-32 ${style["connect-wallet-icon"]}`} onClick={() => connectWallet()}>
            <img className='rounded-16 cursor-pointer' src='images/web3-wallet-icon.svg'></img>
          </div>
          <div onClick={notificationHandler} className={`cursor-pointer ml-32 ${style["bell-icon"]}`}><img src='images/bell.png'></img></div>
          <div onClick ={dropdownHandler} className={`cursor-pointer ml-24 ${style["profile-icon"]}`}>
            <ProfileIcon color="#010101"></ProfileIcon>
          </div>
          <div onClick={navBarHandler} role="button" className={`cursor-pointer d-none ml-24 ${style["bar-cross"]}`}>
            <Hamburger color="#000000"></Hamburger>
          </div>
          {dropdown && 
            <div className={`p-absolute d-flex d-flex-column d-align-center ${style["profile-dropdown"]}`}>
              <h6 onClick={profileHandler} className='cursor-pointer d-flex d-align-center d-justify-center font-14 f-500 l-22'>Profile</h6>
              {/* <h6 onClick={paymentHandler} className='cursor-pointer d-flex d-align-center d-justify-center font-14 f-500 l-22'>Payment Method</h6> */}
              <h6 className='cursor-pointer d-flex d-align-center d-justify-center font-14 f-500 l-22'>
                <a href='/usernft'>Collection</a>
              </h6>
              <h6 onClick={logHandler} className='cursor-pointer d-flex d-align-center d-justify-center font-14 f-500 l-22'>Log Out</h6>
            </div>
          }
        </div>
        {toggle &&
          <Modal modalClass="modal-verify">
            <SignUp  handler={handleClick}></SignUp>
          </Modal>
        }
          {noti &&
            <Modal modalClass="modal-verify">
              <NotificationModal handler={notificationHandler}></NotificationModal>
            </Modal>
          }
          <ToastContainer></ToastContainer>
      </nav>  
    </>
  )
}

export default NavBar
import Link from 'next/link'
import React, {useEffect,useState} from 'react'
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
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Web3Modal from "web3modal";
import ProfileIcon from '../icons/ProfileIcon';
const NavBar = () => {
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
  // const confirmationHandler = () =>{
  //   toast.success("User Signed In Successfully",{
  //     toastId:"2"
  //   });
  // }

  // connect wallet web3 code starts here
  let web3Modal;
  const providerOptions = {
    coinbasewallet: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: "My Awesome App", // Required
        infuraId: "INFURA_ID", // Required
        rpc: "", // Optional if `infuraId` is provided; otherwise it's required
        chainId: 1, // Optional. It defaults to 1 if not provided
        darkMode: false // Optional. Use dark theme, defaults to false
      }
    }
  };

  if (typeof window !== "undefined") {
    web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions, // required
    });
  }


  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  // useEffect(()=>{
  //   if(signer){
  //     props.signerData(signer)
  //   }
  // },[signer])
  async function connect() {
    if(JWTToken){
      if (typeof window.ethereum !== "undefined") {
        try {
          const web3ModalProvider = await web3Modal.connect();
          setIsConnected(true);
          const provider = new ethers.providers.Web3Provider(web3ModalProvider);
          setSigner(provider.getSigner());
          // localStorage.removeItem('signerWeb3');
          // localStorage.setItem('signerWeb3',JSON.stringify(provider.getSigner()))
        } catch (e) {
          console.log(e);
        }
      } else {
        setIsConnected(false);
      }
    }else{
      handleClick()
    }
  }

  async function execute() {
    if (typeof window.ethereum !== "undefined") {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        await contract.store(42)
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }
// connect wallet web3 code ends here
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
          <input className={`rounded-12 b-none bg-box font-13 f-400 l-135 ${style["navbar-search-input"]}`} placeholder='Search by Sellers, Wine or Collection'></input>
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

          {/* <div onClick={walletHandler} className={`cursor-pointer d-none ml-32 ${style["connect-wallet-icon"]}`}>
            <img src="images/web3-wallet-icon.svg"></img>
          </div> */}
          <div>
            {hasMetamask ? (
              isConnected ? (
                ""
              ) : (
                <>
                  <button className={`b-none cursor-pointer btn-primary font-13 ml-32 f-500 l-137 ${style["btn-connect-wallet"]}`} onClick={() => connect()}>Connect Wallet</button>
                  <div className={`cursor-pointer d-none ml-32 ${style["connect-wallet-icon"]}`} onClick={() => connect()}>
                    <img className='rounded-16 cursor-pointer' src='images/web3-wallet-icon.svg'></img>
                  </div>
                </>
              )
            ) : (
              "Please install metamask"
            )}
            {isConnected ? <button className={`b-none cursor-pointer btn-primary font-13 ml-32 f-500 l-137 ${style["btn-connect-wallet"]}`} onClick={() => execute()}>Connected</button> : ""}
          </div>
          {/* <div onClick={walletHandler} className={`cursor-pointer btn-primary font-13 ml-32 f-500 l-137 ${style["btn-connect-wallet"]}`}>Connect Wallet</div> */}
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
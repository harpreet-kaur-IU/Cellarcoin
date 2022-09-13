import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Menu from '../icons/menu';
import style from './css/NavbarTransparent.module.css';
import SignUp from './SignUp';
import WalletModal from './WalletModal';
import {useRouter} from 'next/router';
import Modal from './Modal';
import useFirebaseAuth from '../auth/useFirebaseAuth';
import NotificationModal from './NotificationModal';
import {  getUserOnBoardFromCookie,removeUserOnBoardCookie } from '../auth/userCookies';
import NavItems from './NavItems';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Hamburger from '../icons/Hamburger'
import SiteLogo from '../icons/SiteLogo';
const NavBarTransparent = () => {

    const {signOut} = useFirebaseAuth(); 
    const router = useRouter();
    const [dropdown,setDropdown] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [noti,setNoti] = useState(false)
    const [res,setRes] = useState(false)
    const [token,setToken] = useState(false)
    const [confirm,setConfirm] = useState(false)
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
          if (!JWTToken) {return}
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
      router.push("/usercollection")
    }
    
    const logHandler = () =>{
      signOut()
      .then(()=>{
        removeUserOnBoardCookie()
        setToken(false)
        setConfirm(false)
        router.push("/")
      })
      .catch((error)=>console.log("error while logout"))
      setDropdown(!dropdown)
    }
    const navBarHandler = () =>{
      setRes(prev => !prev)
    }
    const confirmationHandler = () =>{
      toast.success("User Signed In Successfully",{
        toastId:"2"
      });
    }
    return (
      <>
        <nav className={`p-fixed col-12 ${style["navbar"]}`}>
          <div className={`p-relative container d-flex d-align-center d-justify-center ${style["navbar-container"]}`}>
            <Link href="/">
              <img className={`cursor-pointer d-flex d-align-center d-justify-center ${style["navbar-site-logo"]}`} src='images/site-logo-white.svg'></img>
            </Link>
            <Link href="/">
              <div className={`d-none  d-align-center d-justify-center ${style["navbar-site-sm-logo"]} `}>
                <SiteLogo color="#ffffff"></SiteLogo>
              </div>
            </Link>
            <input className={`rounded-12 b-none font-13 f-400 l-135 text-white ${style["navbar-search-input"]}`} placeholder='Search by Sellers, Wine or Collection'></input>
            <ul id="ul-navbar" className={`d-flex d-flex-row text-white ${style["navbar-items-wrapper"]} ${res ? style["expand"] : ""}`}>
              <NavItems name="transparent" path="/explore" value="Explore"></NavItems>
              <NavItems name="transparent" path="/community" value="Community"></NavItems>
              <NavItems name="transparent" path="/brands" value="Brands"></NavItems>
              <NavItems name="transparent" path="/about" value="About Us"></NavItems>
              {/* <li className='ml-32 font-16 f-700 l-124 text-black'><Link href="/explore">Explore</Link></li>
              <li className='ml-32 font-16 f-500 l-137'><Link href="/community">Community</Link></li>
              <li className='ml-32 font-16 f-500 l-137'><Link href="/brands">Brands</Link></li>
              <li className='ml-32 font-16 f-500 l-137'><Link href="/about">About us</Link></li> */}
              {!token && <li onClick={handleClick} className='cursor-pointer ml-32 font-16 f-500 l-137'>Sign In</li>}
            </ul>
  
            <div className={`cursor-pointer d-none ml-32 ${style["connect-wallet-icon"]}`}>
              <img src="images/web3-wallet-icon.svg"></img>
            </div>
            <div className={`cursor-pointer btn-primary font-13 ml-32 f-500 l-137 ${style["btn-connect-wallet"]}`}>Connect Wallet</div>
            <div onClick={notificationHandler} className={`cursor-pointer ml-32 ${style["bell-icon"]}`}><img src='images/bell-icon-white.svg'></img></div>
            <div onClick ={dropdownHandler} className={`cursor-pointer ml-24 ${style["profile-icon"]}`}><img src='images/user-logo-white.svg'></img></div>
            <div onClick={navBarHandler} role="button" className={`d-flex d-align-center cursor-pointer d-none ml-24 ${style["bar-cross"]}`}>
              <Hamburger color="#ffffff"></Hamburger>
            </div>
            {dropdown && 
              <div className={`p-absolute d-flex d-flex-column d-align-center ${style["profile-dropdown"]}`}>
                <h6 onClick={profileHandler} className='cursor-pointer d-flex d-align-center d-justify-center font-14 f-500 l-22'>Profile</h6>
                <h6 onClick={paymentHandler} className='cursor-pointer d-flex d-align-center d-justify-center font-14 f-500 l-22'>Payment Method</h6>
                <h6 onClick={collectionHandler} className='cursor-pointer d-flex d-align-center d-justify-center font-14 f-500 l-22'>Collection</h6>
                {token && <h6 onClick={logHandler} className='cursor-pointer d-flex d-align-center d-justify-center font-14 f-500 l-22'>Log Out</h6>}
              </div>
            }
          </div>
          {toggle &&
            <Modal modalClass="modal-verify">
              <SignUp confirm={confirmationHandler} handler={handleClick}></SignUp>
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

export default NavBarTransparent
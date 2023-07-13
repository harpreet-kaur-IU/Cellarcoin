import Link from 'next/link'
import React, { useState } from 'react'
import styles from './css/Footer.module.css'
import {  getUserOnBoardFromCookie } from '../auth/userCookies';
import { useRouter } from 'next/router';
import Modal from './Modal';
import SignUp from './SignUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FooterMenuBar = () => {
    const [toggle, setToggle] = useState(false);
    var JWTToken = getUserOnBoardFromCookie();
    const router = useRouter();
    const handleClick = () =>{
        setToggle(prev => !prev);
    }
    // const confirmationHandler = () =>{
    //     toast.success("User Signed In Successfully",{
    //         toastId:"2"
    //     });
    // }
    
    const profileHandler = () =>{
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
            router.push(`/editprofile/${user.user._id}`)
        }else{
            handleClick()
        }
    }
    const favoriteHandler = () =>{
        if(JWTToken){
            router.push("/editprofile")
        }else{
            handleClick()
        }
    }
    const walletHandler = () =>{
        if(JWTToken){
            router.push("/editprofile")
        }else{
            handleClick()
        }
    }
  return (
    <div className={`d-grid grid-col-4 ${styles["footer-menu-bar-grid"]}`}>
        <ul >
            <li>
                <h3 className='font-25'>Explore</h3>
                <ul className='mt-24'>
                    <li className='cursor-pointer mt-16 f-500 text-white font-16'><Link href="/community">Community</Link></li>
                    <li className='cursor-pointer mt-16 f-500 text-white font-16'><Link href="/brands">Brands</Link></li>
                </ul>
            </li>
        </ul>
        <ul >
            <li>
                <h3 className='font-25'>My Account</h3>
                <ul className='mt-24'>
                    <li onClick={profileHandler} className='cursor-pointer mt-16 f-500 text-white font-16'>My Profile</li>
                    {/* <li onClick={favoriteHandler} className='cursor-pointer mt-16 f-500 text-white font-16'>My Favorites</li> */}
                    {/* <li onClick={account} className='mt-16 f-500 text-white font-16'>My Account Settings</li> */}
                    {/* <li onClick={walletHandler} className='cursor-pointer mt-16 f-500 text-white font-16'>My Wallet</li> */}
                </ul>
            </li>
        </ul>

        <ul>
            <li>
                <h3 className='font-25'>Resources</h3>
                <ul className='mt-24'>
                    <li className='cursor-pointer mt-16 f-500'><a className="text-white font-16" href="/">Help Center</a></li>
                    <li className='cursor-pointer mt-16 f-500'><a className="text-white font-16" href="/">Discord Community</a></li>
                    <li className='cursor-pointer mt-16 f-500'><a className="text-white font-16" href="/">Blog</a></li>
                    <li className='cursor-pointer mt-16 f-500'><a className="text-white font-16" href="/">Newsletter</a></li>
                </ul>
            </li>
        </ul>

        <ul>
            <li>
                <h3 className='font-25'>Company</h3>
                <ul className='mt-24'>
                    <li className='cursor-pointer mt-16 f-500 text-white font-16'><Link href="/about">About us</Link></li>
                </ul>
            </li>
        </ul>
        {toggle &&
          <Modal modalClass="modal-verify">
            <SignUp handler={handleClick}></SignUp>
          </Modal>
        }
        <ToastContainer/>
    </div>
  )
}

export default FooterMenuBar
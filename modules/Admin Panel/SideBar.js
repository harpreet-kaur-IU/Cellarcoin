import React from 'react'
import MenuBar from './MenuBar'
import SiteLogo from './SiteLogo'
import style from '../css/Admin Panel/SideBar.module.css'
import Router from 'next/router'
import useFirebaseAuth from '../../auth/useFirebaseAuth'
import {removeAdminOnBoardCookie} from '../../auth/userCookies';
const SideBar = () => {
  const {signOut} = useFirebaseAuth();
  const logOutHandler = () => {
    signOut()
    .then(()=>{
      removeAdminOnBoardCookie()
      Router.push("/adminlogin");
    })
    .catch((error)=>console.log("error while logout"))
  }
  return (
    
    <div className={`${style["sidebar-wrapper"]}`} id="sidebar-wrapper">
      <SiteLogo></SiteLogo>
      <MenuBar></MenuBar>
    </div>
  )
}

export default SideBar
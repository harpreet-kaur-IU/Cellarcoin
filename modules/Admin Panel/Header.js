import React,{useEffect,useState} from 'react'
import Close from '../../icons/close'
import Menu from '../../icons/menu'
import {getAdminOnBoardFromCookie,removeAdminOnBoardCookie} from '../../auth/userCookies';
import styles from '.././css/Admin Panel/SideBar.module.css'
import Link from 'next/link';
import Router from 'next/router'
const Header = () => {
  const [dropdown,setDropdown] = useState(false);
  const [user,setUser] = useState("")
  const dropdownHandler = () =>{
    setDropdown(!dropdown)
  }
  const sideBarHandler = (e) => {
    e.currentTarget.classList.toggle(styles["open"]);
    // console.log("Sidebar = "+styles["sidebar-wrapper"]);
    document.querySelector(`#sidebar-wrapper`).classList.toggle(styles["expand"])
    document.querySelector(`#sidebar-wrapper`).classList.toggle(styles["sidebar-wrapper"])
  }

  const logOutHandler = () => {
      removeAdminOnBoardCookie();
      Router.push("/adminlogin");
  }
  var JWTtoken = getAdminOnBoardFromCookie();
  useEffect(()=>{
    function parseJwt() {
      if (!JWTtoken) {return}
      const base64Url = JWTtoken.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }
    var user = parseJwt();
    setUser(user.role)
  },[])
  return (
    <div className={`p-relative d-flex d-align-center d-justify-space-between ${styles["header-wrapper"]}`}>
      <div role="button" onClick={sideBarHandler} className={`${styles["bar-cross"]}`}>
          <Menu></Menu>
          <Close></Close>
      </div>
      <div className={`d-flex d-align-center d-justify-space-between col-12 ${styles["header-bar-wrapper"]}`}>
        <div className='p-relative d-flex d-align-center gap-3'>
          <Link href="/"><img className={`rounded-16 cursor-pointer ${styles["header-notification-icon"]}`} src='images/Notifications.png'></img></Link>
          <div className={`cursor-pointer d-flex d-align-center gap-1 ${styles["header-profile-wrapper"]}`}>
            <h6 className='font-14 f-500 l-19'>{user}</h6>
            <img onClick={dropdownHandler} className='cursor-pointer rounded-16' src='images/arrow-down.png'></img>
          </div>
          {dropdown && 
            <div className={`p-absolute d-flex d-flex-column d-align-center ${styles["profile-dropdown"]}`}>
              <h6 onClick={logOutHandler} className='font-14 f-500 l-22'>Log Out</h6>
            </div>
          }
        </div>
      </div>
  </div>
  )
}

export default Header
import React, {useEffect, useState ,useRef} from 'react'
import { getSubVendorOnBoardFromCookie,removeSubVendorOnBoardCookie } from '../../auth/userCookies';
import Link from 'next/link'
import Router from 'next/router'
import useFirebaseAuth from '../../auth/useFirebaseAuth'
import styles from '../css/Sub Vendor Panel/SideBar.module.css'
import Menu from '../../icons/menu';
import Close from '../../icons/close';
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
  
const Header = () => {
    const wrapperRef = useRef(null);
    const handler = ()=>{
      setDropdown(false)
    }
    useOutsideAlerter(wrapperRef,handler);
    const [dropdown,setDropdown] = useState(false);
    const [user,setUser] = useState("");
  
    const dropdownHandler = () =>{
      setDropdown(!dropdown)
    }
    const createNftNavigation = ()=>{
      Router.push("/createnftsubvendor")
    }
    const sideBarHandler = (e) => {
      e.currentTarget.classList.toggle(styles["open"]);
      console.log("Sidebar = "+styles["sidebar-wrapper"]);
      document.querySelector(`#sidebar-wrapper`).classList.toggle(styles["expand"])
      document.querySelector(`#sidebar-wrapper`).classList.toggle(styles["sidebar-wrapper"])
    }
    
    const {signOut} = useFirebaseAuth();
    const logOutHandler = () => {
      signOut()
      .then(()=>{
        removeSubVendorOnBoardCookie();
        Router.push("/subvendorlogin");
      })
      .catch((error)=>console.log("error while logout"))
    }
    
    var JWTtoken = getSubVendorOnBoardFromCookie();
    useEffect(()=>{
      if(JWTtoken){
        function parseJwt() {
          if (!JWTtoken) {return}
          const base64Url = JWTtoken.split('.')[1];
          const base64 = base64Url.replace('-', '+').replace('_', '/');
          return JSON.parse(window.atob(base64));
        }
        var user = parseJwt();
        setUser(user.user.email)
      }else{
        Router.push("/subvendorlogin")
      }
      
    },[])
  
  return (
    <div className={`p-relative d-flex d-align-center d-justify-space-between ${styles["header-wrapper"]}`}>
        <div role="button" onClick={sideBarHandler} className={`${styles["bar-cross"]}`}>
            <Menu></Menu>
            <Close></Close>
        </div>
        <div className={`d-flex d-align-center d-justify-space-between col-12 ${styles["header-bar-wrapper"]}`}>
          <div className='p-relative d-flex d-align-center gap-3'>
              <button onClick={createNftNavigation} className={`cursor-pointer ${styles["header-buttons"]}`}>
                Create NFT
              </button>
              <Link href="/subvendornotification"><img className={`rounded-16 cursor-pointer ${styles["header-notification-icon"]}`} src='images/Notifications.png'></img></Link>
              <div className={`d-flex d-align-center gap-1 ${styles["header-profile-wrapper"]}`}>
                <h6 className='font-14 f-500 l-19'>{user}</h6>
                <img onClick={dropdownHandler} className='cursor-pointer rounded-16' src='images/arrow-down.png'></img>
              </div>
              {dropdown && 
                <div ref={wrapperRef} className={`p-absolute d-flex d-flex-column d-align-center ${styles["profile-dropdown"]}`}>
                  {/* <h6 onClick={profileHandler} className='d-flex d-align-center d-justify-center font-14 f-500 l-22'>Profile</h6> */}
                  <h6 onClick={logOutHandler} className='d-flex d-align-center d-justify-center font-14 f-500 l-22'>Log Out</h6>
                </div>
              }
          </div>
        </div>
    </div>
  )
}

export default Header
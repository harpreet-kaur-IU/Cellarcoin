import React from 'react'
import style from '.././css/Vendor Panel/SideBar.module.css'
const SiteLogo = () => {
  return (
    <div className={`${style["sidebar-site-logo"]}`}>
        <img src='images/site-logo.png'></img>
    </div>
  )
}

export default SiteLogo
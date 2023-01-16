import React from 'react'
import MenuBar from './MenuBar'
import SiteLogo from './SiteLogo'
import style from '../css/Vendor Panel/SideBar.module.css'
const SideBar = () => {
  return (
    <div className={`${style["sidebar-wrapper"]}`} id="sidebar-wrapper">
      <SiteLogo></SiteLogo>
      <MenuBar></MenuBar>
    </div>
  )
}

export default SideBar
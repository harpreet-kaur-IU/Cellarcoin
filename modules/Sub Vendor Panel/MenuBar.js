import React from 'react'
import MenuItem from './MenuItem'
import style from '../css/Sub Vendor Panel/SideBar.module.css'
const MenuBar = () => {
  return (
    <ul className={`d-flex d-flex-column p-0 m-0 list-style-none ${style["menu-bar-wrapper"]}`}>
      <MenuItem value="Dashboard" path="/subVendorDashboard" multipath="0"></MenuItem>
      <MenuItem value="NFT List" path="/allnftsubvendor" path1="/subvendorListing/[id]" path2="/sellnftsubvendor/[id]" haspath1="1"  haspath2="1" multipath="1"></MenuItem>
      <MenuItem value="Report" path="/reportsubvendor" multipath="0"></MenuItem>
    </ul>
  )
}

export default MenuBar
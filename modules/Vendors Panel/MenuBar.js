import React from 'react'
import MenuItem from './MenuItem'
import style from '.././css/Vendor Panel/SideBar.module.css'
const MenuBar = () => {
  return (
    <ul className={`d-flex d-flex-column p-0 m-0 list-style-none ${style["menu-bar-wrapper"]}`}>
        <MenuItem value="Dashboard" path="/vendorDashboard" multipath="0"></MenuItem>
        <MenuItem value="NFT List" path="/allnftlist" path1="/createnft/[id]" path2="/createnft" path3="/vendorListing/[id]" path4="/sellnft/[id]" haspath1="1"  haspath2="1"  haspath3="1" haspath4="1" multipath="1"></MenuItem>
        <MenuItem value="Report" path="/report" multipath="0"></MenuItem>
        <MenuItem value="Brands" path="/vendorBrand" multipath="0"></MenuItem>
    </ul>
  )
}

export default MenuBar
import React from 'react'
import SideBar from '../modules/Vendors Panel/SideBar'

const BaseVendor = (props) => {
  return (
    <div className="d-flex">
        <SideBar></SideBar>
        <main className="main-class2">
            {props.children}
        </main>
    </div>
  )
}

export default BaseVendor
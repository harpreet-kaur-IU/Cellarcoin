import React from 'react'
import SideBar from '../modules/Sub Vendor Panel/SideBar'

const BaseSubVendor = (props) => {
  return (
    <div className="d-flex">
        <SideBar></SideBar>
        <main className="main-class2">
            {props.children}
        </main>
    </div>
  )
}

export default BaseSubVendor
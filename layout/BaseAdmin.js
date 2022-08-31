import React from 'react'
import SideBar from '../modules/Admin Panel/SideBar'
const BaseAdmin = (props) => {
  return (
    <div className="d-flex">
      <SideBar></SideBar>
      <main className="main-class2">
        {props.children}
      </main>
    </div>
  )
}

export default BaseAdmin
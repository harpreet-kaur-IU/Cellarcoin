import React, { useState } from 'react'
import style from './css/MyAccount.module.css'
import SideBar from './SideBar'
import EditProfileTab from './EditProfileTab'
import PaymentMethod from './PaymentMethod'
import ChangePassword from './ChangePassword'
const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <div className={`container ${style["myaccount-section"]}`}>
        <h2 className={`text-black font-49 f-500 l-137 ${style["myaccount-heading"]}`}>My Account</h2>
        <hr className='col-12 text-very-light-gray'></hr>
        <div className='d-flex d-flex-row mt-40'>
            <div className='col-3'>
              <SideBar title="Edit Profile" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}></SideBar>
              <SideBar title="Password" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab}></SideBar>
              <SideBar title="Payment Method" id="tab3" activeTab={activeTab} setActiveTab={setActiveTab}></SideBar>
              <button className={`mb-40 font-20 f-500 l-137 btn-secondary ${style["sidebar-logout-btn"]}`}>Logout</button>
            </div>
            <div className={` ${style["vertical-line"]}`}></div>
            <div className='col-9'>
                {activeTab === "tab1" && <EditProfileTab heading="Edit Profile"></EditProfileTab> }
                {activeTab === "tab2" && <ChangePassword heading="Change Password" id="tab3" activeTab={activeTab}></ChangePassword>}
                {activeTab === "tab3" && <PaymentMethod heading="Payment Method"></PaymentMethod>}
            </div>
        </div>
    </div>
  )
}

export default MyAccount
import React from 'react'
import style from './css/MyAccount.module.css'
const SideBar = ({id,setActiveTab, activeTab, title}) => {
  const handleClick = () => {
    setActiveTab(id);
  };
  return (
    <>
      <div className='cursor-pointer' onClick={handleClick}>
        <h3 className={`mb-40 font-31 f-400 l-137 text-black ${style["side-bar-h3"]} ${activeTab === id ? "active" : ""}`} >{title}</h3>
      </div>
    </>
  )
}

export default SideBar
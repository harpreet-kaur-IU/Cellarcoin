import React from 'react'
import style from './css/MyAccount.module.css'
const SideBar = ({id,setActiveTab, activeTab, title}) => {
  const handleClick = () => {
    setActiveTab(id);
  };
  return (
    <>
      <h3 onClick={handleClick} className={`cursor-pointer mb-40 font-31 f-400 l-137 text-black ${style["side-bar-h3"]} ${style[activeTab === id ? "active" : ""]}`} >{title}</h3>
    </>
  )
}

export default SideBar
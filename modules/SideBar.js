import React from 'react'

const SideBar = ({id,setActiveTab, activeTab, title}) => {
  const handleClick = () => {
    setActiveTab(id);
  };
  return (
    <>
      <div onClick={handleClick} >
        <h3 className={`mb-40 font-31 f-400 l-137 text-black ${activeTab === id ? "active" : ""}`} >{title}</h3>
      </div>
    </>
  )
}

export default SideBar
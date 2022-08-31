import React, { useState } from 'react'
import style from './css/Filter.module.css'

const Filter = () => {
    const [toggle, setToggle] = useState(false);
    const handleClick = () =>{
        setToggle(!toggle);
    }
  return (
    <div className='p-relative d-flex d-justify-end gap-3 mt-40 mb-32'>
        <div className={`rounded-8 bg-pink mb-8 d-flex d-align-center d-justify-space-between  ${style["filters-heading-wrapper"]}`}>
            <a className='f-500 font-16 l-134'>Filters</a>
            <img  onClick={handleClick}  src='images/arrow-down.png'></img>
        </div>
        <div  className={`rounded-8 p-absolute bg-pink ${style["filter-dropdown-menu"]} ${toggle ? "d-block" : "d-none"}`}>
            <a className={` d-block text-black f-500 font-16 l-134 ${style["filters-heading-item-wrapper"]}`} href="#">Recently Sold</a>
            <a className={` d-block text-black f-500 font-16 l-134 ${style["filters-heading-item-wrapper"]}`} href="#">Recently Sold</a>
            <a className={` d-block text-black f-500 font-16 l-134 ${style["filters-heading-item-wrapper"]}`} href="#">Recently Sold</a>
        </div>
        <div className={`rounded-8 bg-pink mb-8 d-flex d-align-center d-justify-space-between  ${style["sort-heading-wrapper"]}`}>
            <a className='f-500 font-16 l-134'>Sort</a>
            <img src='images/arrow-down.png'></img>
        </div>
    
    </div>
  )
}

export default Filter
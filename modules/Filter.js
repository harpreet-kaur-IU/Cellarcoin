import React, { useState } from 'react'
import style from './css/Filter.module.css'

const Filter = () => {
    const [toggle, setToggle] = useState(false);
    const [sort,setSort] = useState(false)
    const handleClick = () =>{
        setToggle(!toggle);
    }
    const sortHandler = () =>{
        setSort(prev=>!prev);
    }
    return (
        <div className={`p-relative d-flex d-align-center d-justify-end gap-3 mt-40 mb-32 ${style["filter-margin"]}`}>
            <div className={`p-absolute ${style["filter-position-absolute"]}`}>
                <div className={`rounded-8 bg-pink mb-8 d-flex d-align-center d-justify-space-between ${style["filters-heading-wrapper"]}`}>
                    <a className='f-500 font-16 l-134'>Filter</a>
                    <img onClick={handleClick} src='images/arrow-down.png'></img>
                </div>
                <div className={`p-absolute rounded-8 bg-pink ${style["filter-dropdown-menu"]} ${toggle ? "d-block" : "d-none"}`}>
                    <a className={`d-block text-black f-500 font-16 l-134 ${style["filters-heading-item-wrapper"]}`} href="#">Recently Sold</a>
                    <a className={`d-block text-black f-500 font-16 l-134 ${style["filters-heading-item-wrapper"]}`} href="#">Recently Sold</a>
                    <a className={`d-block text-black f-500 font-16 l-134 ${style["filters-heading-item-wrapper"]}`} href="#">Recently Sold</a>
                </div>
            </div>
            <div className={`p-absolute `}>
                <div className={`rounded-8 bg-pink mb-8 d-flex d-align-center d-justify-space-between  ${style["sort-heading-wrapper"]}`}>
                    <a className='f-500 font-16 l-134'>Sort</a>
                    <img onClick={sortHandler} src='images/arrow-down.png'></img>
                </div>
                <div className={`p-absolute rounded-8 bg-pink ${style["sort-position-absolute"]} ${sort ? "d-block" : "d-none"}`}>
                    <div className={`d-flex d-align-center d-justify-space-between ${style["sort-col-1"]}`}>
                        <h6 className='f-500 l-137'>Price</h6>
                        <h6 className='font-13 f-400 l-137 text-very-light-gray'>Clear</h6>
                    </div>
                    <div className={`d-flex d-flex-column bg-active gap-1 ${style["sort-col-2"]}`}>
                        <div className='bg-pink rounded-8 d-flex d-align-center d-justify-space-around'>
                            <h6 className='f-400 l-137'>Great Britain Pound(GBP)</h6>
                            <img src='images/arrow-down.png'></img>
                        </div>
                        <div className='d-flex d-align-center d-justify-space-between'>
                            <div className={`bg-pink rounded-8 d-flex ${style["min-wrapper"]}`}>
                                <h6 className='f-400 l-137'>Min</h6>
                            </div>
                            <div className={`d-flex `}>
                                <h6 className='f-400 l-137'>to</h6>
                            </div>
                            <div className={`bg-pink rounded-8 d-flex ${style["max-wrapper"]}`}>
                                <h6 className='f-400 l-137'>Max</h6>
                            </div>
                        </div>
                    </div>
                    <div className={`d-flex d-justify-center ${style["btn-continue"]}`}>
                        <button className='rounded-8 b-none font-20 f-500 l-137'>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter
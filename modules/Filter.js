import React, { useState,useEffect,useRef } from 'react'
import style from './css/Filter.module.css'

const Filter = (props) => {
    const [toggle, setToggle] = useState(false);
    const [sort,setSort] = useState(false)
    const handleClick = () =>{
        setToggle(!toggle);
    }
    const sortHandler = () =>{
        setSort(prev=>!prev);
    }


    const [value, setValue] = useState("Filter");
    const handler = (e) => {
        e.currentTarget.classList.toggle(style["open"]);
    }

    const selectHandler = (e) => {
        setValue(e.currentTarget.textContent);
        const filterValue = (e.currentTarget.getAttribute("value"));
        props.handler(filterValue)
    }
    
    return (
        // <div className={`p-relative d-flex d-align-center d-justify-end gap-3 mt-40 mb-32 ${style["filter-margin"]}`}>
        //     <div className={`p-absolute ${style["filter-position-absolute"]}`}>
        //         <div className={`rounded-8 bg-pink mb-8 d-flex d-align-center d-justify-space-between ${style["filters-heading-wrapper"]}`}>
        //             <a className='f-500 font-16 l-134'>Filter</a>
        //             <img className='cursor-pointer' onClick={handleClick} src='images/arrow-down.png'></img>
        //         </div>
        //         <div className={`p-absolute rounded-8 bg-pink ${style["filter-dropdown-menu"]} ${toggle ? "d-block" : "d-none"}`}>
        //             <h6 onClick={filterHandler} id="recentlysold" className={`cursor-pointer d-block text-black f-500 font-16 l-134 ${style["filters-heading-item-wrapper"]}`}>Recently Sold</h6>
        //             <h6 onClick={filterHandler} id="mostpopular" className={`cursor-pointer d-block text-black f-500 font-16 l-134 ${style["filters-heading-item-wrapper"]}`}>Most Popular</h6>
        //             <h6 onClick={filterHandler} id="mostfavorite" className={`cursor-pointer d-block text-black f-500 font-16 l-134 ${style["filters-heading-item-wrapper"]}`}>Most Favorite</h6>
        //             <h6 onClick={filterHandler} id="lowtohigh" className={`cursor-pointer d-block text-black f-500 font-16 l-134 ${style["filters-heading-item-wrapper"]}`}>Price: Low to High</h6>
        //             <h6 onClick={filterHandler} id="hightolow" className={`cursor-pointer d-block text-black f-500 font-16 l-134 ${style["filters-heading-item-wrapper"]}`}>Price: High to Low</h6>
        //         </div>
        //     </div>
        //     <div className={`p-absolute`}>
        //         <div className={`rounded-8 bg-pink mb-8 d-flex d-align-center d-justify-space-between ${style["sort-heading-wrapper"]}`}>
        //             <a className='f-500 font-16 l-134'>Sort</a>
        //             <img className='cursor-pointer' onClick={sortHandler} src='images/arrow-down.png'></img>
        //         </div>
        //         <div className={`p-absolute rounded-8 bg-pink ${style["sort-position-absolute"]} ${sort ? "d-block" : "d-none"}`}>
        //             <div className={`d-flex d-align-center d-justify-space-between ${style["sort-col-1"]}`}>
        //                 <h6 className='f-500 l-137'>Price</h6>
        //                 <h6 className='font-13 f-400 l-137 text-very-light-gray'>Clear</h6>
        //             </div>
        //             <div className={`d-flex d-flex-column bg-active gap-1 ${style["sort-col-2"]}`}>
        //                 <div className='bg-pink rounded-8 d-flex d-align-center d-justify-space-around'>
        //                     <h6 className='f-400 l-137'>Great Britain Pound(GBP)</h6>
        //                     <img src='images/arrow-down.png'></img>
        //                 </div>
        //                 <div className='d-flex d-align-center d-justify-space-between'>
        //                     <div className={`bg-pink rounded-8 d-flex ${style["min-wrapper"]}`}>
        //                         <h6 className='f-400 l-137'>Min</h6>
        //                     </div>
        //                     <div className={`d-flex`}>
        //                         <h6 className='f-400 l-137'>to</h6>
        //                     </div>
        //                     <div className={`bg-pink rounded-8 d-flex ${style["max-wrapper"]}`}>
        //                         <h6 className='f-400 l-137'>Max</h6>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className={`d-flex d-justify-center ${style["btn-continue"]}`}>
        //                 <button className='rounded-8 b-none font-20 f-500 l-137'>Continue</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className='col-12 d-flex d-justify-end gap-2 mb-32'>
            <div className={`f-500 ${style["drop-down"]}`} onClick={handler} >
                <span> {value} </span>
                <ul>
                    <li value="sold" onClick={selectHandler}>
                        Recently  Sold
                    </li>
                    <li value="popular" onClick={selectHandler}>
                        Most Popular
                    </li>
                    <li value="favourite" onClick={selectHandler}>
                        Most Favorited
                    </li>
                    <li value="lowtohigh" onClick={selectHandler}>
                        Price: Low to High
                    </li>
                    <li value="hightolow" onClick={selectHandler}>
                        Price: High to Low
                    </li>
                </ul>

                <span>
                    <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 0.374191C16.2018 0.375484 15.9158 0.493227 15.7031 0.702316L9 7.40544L2.29687 0.702316C2.08553 0.490973 1.79888 0.37224 1.5 0.37224C1.20111 0.37224 0.914468 0.490973 0.703123 0.702316C0.491779 0.913661 0.373047 1.2003 0.373047 1.49919C0.373047 1.79808 0.491779 2.08472 0.703123 2.29607L8.20312 9.79607C8.30764 9.90095 8.43183 9.98416 8.56858 10.0409C8.70532 10.0977 8.85193 10.127 9 10.127C9.14806 10.127 9.29467 10.0977 9.43142 10.0409C9.56816 9.98416 9.69236 9.90095 9.79687 9.79607L17.2969 2.29607C17.4018 2.19155 17.485 2.06736 17.5418 1.93061C17.5985 1.79387 17.6278 1.64726 17.6278 1.49919C17.6278 1.35113 17.5985 1.20452 17.5418 1.06777C17.485 0.931025 17.4018 0.806833 17.2969 0.702316C17.0842 0.493227 16.7982 0.375484 16.5 0.374191Z" fill="#525257"/>
                    </svg>
                </span>
            </div>
            {/* <div className={`p-relative`}>
                <div onClick={sortHandler} className={`rounded-8 bg-pink d-flex d-align-center d-justify-space-between ${style["sort-heading-wrapper"]}`}>
                    <a className='f-500 font-16 l-134'>Sort</a>
                    
                    <span>
                    <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 0.374191C16.2018 0.375484 15.9158 0.493227 15.7031 0.702316L9 7.40544L2.29687 0.702316C2.08553 0.490973 1.79888 0.37224 1.5 0.37224C1.20111 0.37224 0.914468 0.490973 0.703123 0.702316C0.491779 0.913661 0.373047 1.2003 0.373047 1.49919C0.373047 1.79808 0.491779 2.08472 0.703123 2.29607L8.20312 9.79607C8.30764 9.90095 8.43183 9.98416 8.56858 10.0409C8.70532 10.0977 8.85193 10.127 9 10.127C9.14806 10.127 9.29467 10.0977 9.43142 10.0409C9.56816 9.98416 9.69236 9.90095 9.79687 9.79607L17.2969 2.29607C17.4018 2.19155 17.485 2.06736 17.5418 1.93061C17.5985 1.79387 17.6278 1.64726 17.6278 1.49919C17.6278 1.35113 17.5985 1.20452 17.5418 1.06777C17.485 0.931025 17.4018 0.806833 17.2969 0.702316C17.0842 0.493227 16.7982 0.375484 16.5 0.374191Z" fill="#525257"/>
                    </svg>
                </span>
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
                            <div className={`d-flex`}>
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
            </div> */}
        </div>
    )
}

export default Filter
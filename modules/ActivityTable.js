import React, { useState,useEffect } from 'react'
import styles from './css/ActivityTable.module.css'
import { getUserOnBoardFromCookie } from '../auth/userCookies'
import { useRouter } from 'next/router'
const ActivityTable = () => {
    const[toggle,setToggle] = useState(false);
    const router = useRouter();
    var JWTToken = getUserOnBoardFromCookie();
    const filterHandler = () =>{
        setToggle(prev => !prev)
    }

    const navigationHandler = () =>{
        if(JWTToken){
            router.push("/usernft")
        }
    }

 return (
    <div className={`container ${styles["activity-container"]}`}>
        <div className={`d-flex d-align-center d-justify-space-between ${styles["table-heading"]}`}>
            <h3 className={`f-600 text-primary`}>Activity</h3>
            <div className='p-relative'>
                <button onClick={filterHandler} className='cursor-pointer btn-secondary font-14 f-500 l-137'>Filter</button>
                {toggle &&
                    <div className={`d-flex d-flex-column ${styles["filter-dropdown"]}`}>
                        <div className={`d-flex ${styles["filter-dropdown-item"]}`}>
                            <input type="checkbox"></input>
                            <h6 className='font-12 f-500 l-22'>Sales</h6>
                        </div>
                        <div className={`d-flex ${styles["filter-dropdown-item"]}`}>
                            <input type="checkbox"></input>
                            <h6 className='font-12 f-500 l-22'>Transfer</h6>
                        </div>
                        <div className={`d-flex ${styles["filter-dropdown-item"]}`}>
                            <input type="checkbox"></input>
                            <h6 className='font-12 f-500 l-22'>Offers</h6>
                        </div>
                        <div className={`d-flex ${styles["filter-dropdown-item"]}`}>
                            <input type="checkbox"></input>
                            <h6 className='font-12 f-500 l-22'>Listings</h6>
                        </div>
                    </div>
                }
            </div>
            
        </div>
        <div className={`${styles["table-section-scroll"]}`} style={{overflow:"hidden",marginBottom:"100px",height:"auto"}}>
            <div className={`${styles["table-wrapper"]}`}>
                <div className={` ${styles["table-headers"]}`}>
                    <span className='font-18 f-500 d-flex'>Event</span>
                    <span className='font-18 f-500 d-flex'>Price</span>
                    <span className='font-18 f-500 d-flex'>From</span>
                    <span className='font-18 f-500 d-flex'>To</span>
                    <span className='font-18 f-500 d-flex'>Date</span>
                </div>                    
                <div className={`${styles["table-column"]}`}>
                    <span className='font-18 f-500 d-flex'>Transfer</span>
                    <span className='text-primary font-18 f-600 d-flex'>Price</span>
                    <span onClick={navigationHandler} className='cursor-pointer a-underline text-primary font-18 f-500 d-flex'>LK. Davidson</span>
                    <span onClick={navigationHandler} className='cursor-pointer a-underline text-primary font-18 f-500 d-flex'>LK. Davidson</span>
                    <span className='font-18 f-500 d-flex'>21/06/2022</span>
                </div> 
                <div className={`${styles["table-column"]}`}>
                    <span className='font-18 f-500 d-flex'>Transfer</span>
                    <span className='text-primary font-18 f-600 d-flex'>Price</span>
                    <span onClick={navigationHandler} className='cursor-pointer a-underline text-primary font-18 f-500 d-flex'>LK. Davidson</span>
                    <span onClick={navigationHandler} className='cursor-pointer a-underline text-primary font-18 f-500 d-flex'>LK. Davidson</span>
                    <span className='font-18 f-500 d-flex'>21/06/2022</span>
                </div> 
                <div className={`d-none d-flex-column ${styles["table-column-sm"]}`}>
                    <span className='font-12 f-400 text-dark-gray l-137'>Sale 21/06/2022</span>
                    <span className='text-primary font-24 f-500 mt-8 l-137'>$15,008</span>
                    <div className='d-flex d-justify-space-between'>
                        <div className='d-flex d-flex-column gap-1 mt-8'>
                            <span className='font-12 f-400 text-dark-gray l-137'>From</span>
                            <span onClick={navigationHandler} className='a-underline text-black font-16 f-500 l-137'>LK. Davidson</span>
                        </div>
                        <div className='d-flex d-flex-column gap-1 mt-8'>
                            <span className='font-12 f-400 text-dark-gray l-137'>To</span>
                            <span onClick={navigationHandler} className='a-underline text-black font-16 f-500 l-137'>LK. Davidson</span>
                        </div>
                    </div>
                    {/* <span className='text-primary font-18 f-500 d-flex'>LK. Davidson</span>
                    <span className='font-18 f-500 d-flex'>21/06/2022</span> */}
                </div> 
            </div>
        </div>
    </div>
  )
}

export default ActivityTable
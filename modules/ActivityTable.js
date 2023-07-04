import React, { useState,useEffect } from 'react'
import styles from './css/ActivityTable.module.css'
import { getUserOnBoardFromCookie } from '../auth/userCookies'
import { useRouter } from 'next/router'
import Moment from 'react-moment'
import StatusDropdown from './StatusDropdown'
import Loader from './Vendors Panel/Loader'
const ActivityTable = () => {
    const[toggle,setToggle] = useState(false);
    const router = useRouter();
    const nftId = router.query["id"];
    const [activity,setActivity] = useState("");
    const [loading,setLoading] = useState(false)
    var JWTToken = getUserOnBoardFromCookie();
    const filterHandler = () =>{
        setToggle(prev => !prev)
    }

    const navigationHandler = () =>{
        if(JWTToken){
            router.push("/usernft")
        }
    }
    const statusHandler = (val) =>{
        if(nftId){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type","application/json");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            setLoading(true)
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getTransaction?nftId=${nftId}&status=${val}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                const parseResult = JSON.parse(result)
                setActivity(parseResult.data)
                setLoading(false)
            })
            .catch(error => console.log('error', error));
        }
    }
    useEffect(()=>{
        if(nftId){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type","application/json");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            setLoading(true)
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getTransaction?nftId=${nftId}&status=null`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setActivity(result.data)
                setLoading(false)
            })
            .catch(error => console.log('error', error));
        }
    },[nftId])

    
 return (
    <>
        {loading && <Loader></Loader>}
        <div className={`container ${styles["activity-container"]}`}>
            <div className={`d-flex d-align-center d-justify-space-between ${styles["table-heading"]}`}>
                <h3 className={`f-600 text-primary`}>Activity</h3>
                <div className='p-relative'>
                    <StatusDropdown handler={statusHandler}></StatusDropdown>
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
                    {activity && activity.map((item)=>(
                        <div className={`${styles["table-column"]}`}>
                            <span className='font-18 f-500 d-flex'>{item.transactionType}</span>
                            <span className='text-primary font-18 f-600 d-flex'>{item.price === 0?" ":item.price}</span>
                            <span onClick={navigationHandler} className='cursor-pointer a-underline text-primary font-18 f-500 d-flex'>{item.from!= null?(item.from.name === null?"-":item.from.name):""}</span>
                            <span onClick={navigationHandler} className='cursor-pointer a-underline text-primary font-18 f-500 d-flex'>{item.to === null?"":item.to.name}</span>
                            <span className='font-18 f-500 d-flex'><Moment fromNow>{item.createdAt}</Moment></span>
                        </div> 
                    ))}                   
                    {activity && activity.map((item)=>(
                        <div className={`d-none d-flex-column ${styles["table-column-sm"]}`}>
                            <span className='font-12 f-400 text-dark-gray l-137'>Created <Moment fromNow>{item.createdAt}</Moment></span>
                            <span className='text-primary font-24 f-500 mt-8 l-137'>{item.price === 0?" ":item.price}</span>
                            <div className='d-flex d-justify-space-between'>
                                <div className='d-flex d-flex-column gap-1 mt-8'>
                                    <span className='font-12 f-400 text-dark-gray l-137'>From</span>
                                    <span onClick={navigationHandler} className='a-underline text-black font-16 f-500 l-137'>{item.from!=null?(item.from.name === null?"-":item.from.name):" "}</span>
                                </div>
                                <div className='d-flex d-flex-column gap-1 mt-8'>
                                    <span className='font-12 f-400 text-dark-gray l-137'>To</span>
                                    <span onClick={navigationHandler} className='a-underline text-black font-16 f-500 l-137'>{item.to === null?"":item.to.name}</span>
                                </div>
                            </div>
                        </div> 
                    ))}  
                </div>
            </div>
        </div>
    </>
  )
}

export default ActivityTable
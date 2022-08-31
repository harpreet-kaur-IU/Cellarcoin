import React,{useEffect, useState} from 'react'
import Header from './Header'
import styles from '.././css/Admin Panel/Brands.module.css'
import Modal from '../Vendors Panel/Modal'
import BrandApproval from './BrandApproval'
import {getAdminOnBoardFromCookie} from '../../auth/userCookies';
import Loader from '../Vendors Panel/Loader';
import Accepted from './Accepted'
const Brands = () => {
    var JWTtoken = getAdminOnBoardFromCookie();
    const[data,setData] = useState('');
    const[loading,setLoading] = useState(false)
    const [add,setAdd] = useState(false);
    const [id,setId] = useState("")
    const [accept,setAccept] = useState("")

    const modalIdHandler = (e)=>{
        setAdd(prev => !prev)
        setId(e.currentTarget.id)
    }

    const acceptedIdHandler = (e)=>{
        setId(e.currentTarget.id)
        setAccept(prev => !prev)
    }

    const modalHandler = () =>{
        setAdd(prev => !prev)
    }
    const modalHandler2 = () =>{
        setAccept(prev => !prev)
    }
    const approvalHandler = (data,status) =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization","Bearer "+JWTtoken);
        myHeaders.append("Content-Type","application/json");

        var raw = JSON.stringify({
            "status":status,
            "reasonOfRejection":data
        })
        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw
        };
        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}admin/updateBrandStatus/${id}`, requestOptions)
        .then(response => response.json())
        .then(result =>{
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}admin/getAllBrands`,{
                method: 'GET', 
                headers: myHeaders,
            })
            .then(response => response.json())
            .then(results =>{
                setData(results.data)
                setLoading(false)
            })
        })
        .catch(error => console.log('error', error));
    }
    useEffect(()=>{
        if(JWTtoken){
            var myHeaders = new Headers();
            myHeaders.append("Authorization","Bearer "+JWTtoken);
            myHeaders.append("Content-Type","application/json");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders
            };
            setLoading(true)

            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}admin/getAllBrands`, requestOptions)
            .then(response => response.json())
            .then(result =>{
                setData(result.data)
                setLoading(false)
            })
            .catch(error => console.log('error', error));
        }else{
            router.push("/vendorlogin");
        }
    },[])
  return (
    <>
        {loading && <Loader></Loader>}
        <Header></Header>
        <div className='vendor-container'>
            <div className='d-flex d-align-center d-justify-space-between'>
                <h4 className='f-600 text-primary mt-24 mb-24'>Brands</h4>
            </div>
            <div className={`${styles["dashboard-table-section-scroll"]}`}>
                <div className={`${styles["dashboard-table-wrapper"]}`}>
                    <div className={`${styles["dashboard-table-column"]} bg-orange d-flex d-align-center`}>
                        <span className='font-16 f-600 d-flex'>Brand’s Name</span>
                        <span className='font-16 f-600 d-flex'>Vendor’s Name</span>
                        <span className='font-16 f-600 d-flex d-align-center d-justify-center'>Document</span>
                        <span className='font-16 f-600 d-flex d-justify-space-evenly'>Action</span>
                    </div>
                    
                    {data && data.map((item)=>(
                        <div className={`${styles["dashboard-table-column"]} ${styles["dashboard-table-column-data"]} d-flex d-align-center`}>      
                            <span className='font-14 f-600 d-flex word-break'>{item.brandName}</span>
                            <span className='font-14 f-500 d-flex'>{item.ownerId.name}</span>
                            <span className={`font-14 f-600 d-flex word-break d-align-center d-justify-center ${styles["dashboard-document"]}`}>
                                <a className='text-primary' href={`${item.documentUrl}`} download target='_blank'>Verification file.doc</a>
                            </span>
                            <span className={`cusror-pointer font-14 f-500 d-flex d-align-center d-justify-center ${styles["dashboard-btns"]}`}>
                                {item.status === "pending" &&
                                    <>
                                        <div id={item._id} onClick={acceptedIdHandler} className={`cursor-pointer d-flex d-align-center d-justify-center font-14 f-500 text-white ${styles["dashboard-accept-btn"]}`}>Accept</div>
                                        <div id={item._id} onClick={modalIdHandler} className={`cursor-pointer d-flex d-align-center d-justify-center font-14 f-500 text-primary ${styles["dashboard-reject-btn"]}`}>Reject</div>
                                    </>
                                }
                                {item.status === "approved" &&
                                    <span className={`font-14 f-500 d-flex ${styles["brand-status"]}`}>Accepted</span>
                                }
                                {item.status === "rejected" &&
                                    <span className={`font-14 f-500 d-flex ${styles["brand-status-rejected"]}`}>Rejected</span>
                                }
                                
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        {add && 
            <Modal modalClass="modal-verify">
                <BrandApproval submithandler={approvalHandler} handler={modalHandler}></BrandApproval>
            </Modal>
        }

        {accept && 
            <Modal modalClass="modal-verify">
                <Accepted name="Brand" submithandler={approvalHandler} handler={modalHandler2}></Accepted>
            </Modal>
        }
    </>
  )
}

export default Brands
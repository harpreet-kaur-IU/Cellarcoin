import React, { useState } from 'react'
import styles from '.././css/Admin Panel/ApprovalModal.module.css'

const Accepted = (props) => {
    const[reason,setReason] = useState("")
    var status = "approved";
    const formSubmit = (e) =>{
      e.preventDefault();
      props.submithandler(reason,status)
      props.handler()
    }
  return (
    <>
        <div className={`${styles["brand-approval-modal-wrapper"]}`}>
            <h5 className='l-22 f-600'>Are you sure you want to Accept this {props.name}?</h5>
            <form onSubmit={formSubmit}>
                <div className={`d-flex d-align-center d-justify-space-between ${styles["modal-btns"]}`}>
                    <button className={`d-flex d-align-center d-justify-center l-22 font-14 f-500 text-white ${styles["yes-btn"]}`}>Yes</button>
                    <div onClick={props.handler} className={`d-flex d-align-center d-justify-center l-22 font-14 f-500 text-white ${styles["no-btn"]}`}>No</div>
                </div>
            </form>
        </div>
    </>
  )
}

export default Accepted
import React from 'react'
import styles from '../css/Vendor Panel/AddProperties.module.css'
const Delete = (props) => {

    const yesClicked = () =>{
        props.deleteHandler(true);
    }
  return (
    <>
        <div className={`bg-white rounded-16 ${styles["active-status-modal"]}`}>
            <div className='d-flex d-align-center d-justify-center'>
                <h5 className='f-500 text-black'>Are you sure you want to delete this NFT?</h5>
            </div>
            <div className={`d-flex d-flex-column ${styles["btn-wrapper"]}`}>
                <button onClick={yesClicked} className={`cursor-pointer font-14 f-600 l-19 rounded-12 text-white bg-primary  ${styles["crud-btn"]}`}>Yes</button>
                <button onClick={props.handler} className={`cursor-pointer font-14 f-600 l-19 rounded-12 text-primary bg-white  ${styles["crud-btn-no"]}`}>No</button>
            </div>
        </div>
        
    </>
  )
}

export default Delete
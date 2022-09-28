import React from 'react'
import styles from './css/GetInTouch.module.css'

const GetInTouch = (props) => {
  return (
    <div className={`${styles["GIT-wrapper"]}`}>
        <div className={`d-flex d-flex-wrap`}>
            <div className={`col-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 ${styles["get-in-touch-left"]}`}></div>
            <div className={`col-d-none col-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 d-flex d-flex-column ${styles["get-in-touch-right"]}`}>
                <div onClick={props.handler} className={`cursor-pointer d-flex d-justify-end ${styles["cross-wrapper"]}`}>
                    <img src='images/cross.png'></img>
                </div>
                <div className={`d-flex d-flex-column ${styles["get-in-touch-form"]}`}>
                    <h2 className='f-600'>Get In Touch</h2>
                    <form className='d-flex d-flex-wrap'>
                        <div className={`d-flex d-flex-column col-12 ${styles["name-wrapper"]}`}>
                            <h6 className='col-12 f-600'>Name</h6>
                            <input className='col-12' type="text" placeholder="Name" required></input>  
                        </div> 
                        <div className={`d-flex d-flex-column col-12 ${styles["email-wrapper"]}`}>
                            <h6 className='col-12 f-600'>Email</h6>
                            <input className='col-12' type="email" placeholder="Email" required></input>  
                        </div> 
                        <div className={`d-flex d-flex-column col-12 ${styles["message-wrapper"]}`}>
                            <h6 className='col-12 f-600'>Write your message</h6>
                            <input className='col-12' type="text" placeholder="Write text here" required></input>  
                        </div>
                        <button className={`cursor-pointer btn-secondary ${styles["btn-submit"]}`}>Submit</button>
                    </form>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default GetInTouch
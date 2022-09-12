import React from 'react'
import style from './css/NotificationModal.module.css'
const NotificationModal = (props) => {

  return (
    <div className={`p-absolute bg-pink rounded-16 ${style["modal-wrapper"]}`}>
        <div className='d-flex d-justify-end'>
            <img onClick={props.handler} className={`d-block ${style["modal-cross-btn"]}`} src='images/cross.png'></img>
        </div>
        <div className={`d-flex d-align-center ${style["notification-item-wrapper"]}`}>
            <div className={`${style["noti-img-wrapper"]}`}>
                <img src='images/our-pillars-1.png'></img>
            </div>
            <h5 className='font-16 f-400 l-137'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales vel ultricies nibh risus pulvinar non risus morbi arcu.</h5>
        </div>
        <div className={`d-flex d-align-center ${style["notification-item-wrapper"]}`}>
            <div className={`${style["noti-img-wrapper"]}`}>
                <img src='images/our-pillars-1.png'></img>
            </div>
            <h5 className='font-16 f-400 l-137'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales vel ultricies nibh risus pulvinar non risus morbi arcu.</h5>
        </div>
    </div>
  )
}

export default NotificationModal
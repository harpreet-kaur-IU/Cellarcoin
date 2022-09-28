import React, { useState } from 'react'
import style from './css/Partner.module.css'
import GetInTouch from './GetInTouch'
import Modal from './Modal'
const Partner = () => {
  const [toggle,setToggle] = useState(false)
  const modalHandler = () =>{
    setToggle(prev => !prev)
  }
  return (
    <div className={`rounded-16 container ${style["partner-container"]}`}>
        <div className={`d-flex d-flex-column d-align-center d-justify-center ${style["partner-wrapper"]}`}>
            <h3 className='l-49 text-white f-400'>Become a Partner</h3>
            <h2 className='l-49 text-center mt-25 text-white f-700'>Are you a luxury brand looking to launch an NFT and reach a new audience?</h2>
            <button onClick={modalHandler} className={`cursor-pointer font-16 f-600 l-24 mt-32 btn-secondary ${style["get-in-touch-btn"]}`}>Get in Touch</button>
            <img src='images/partner-pic.svg'></img>
        </div>
        {toggle && 
          <Modal modalClass="modal-verify">
            <GetInTouch handler={modalHandler}></GetInTouch>
          </Modal>
        }
    </div>
  )
}

export default Partner
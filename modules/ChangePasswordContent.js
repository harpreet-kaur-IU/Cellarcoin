import React from 'react'
import style from './css/ChangePasswordContent.module.css'
const ChangePasswordContent = () => {
  return (
    <div className={`${style["change-password-content-wrapper"]}`}>
        <input className={`col-12 font-20 f-500 l-137 bg-input-box b-none rounded-16 mb-24 ${style["old-password-name"]}`} placeholder='User Name:Xyz'></input>
        <input className={`col-12 font-20 f-500 l-137 bg-input-box b-none rounded-16 ${style["new-password-name"]}`} placeholder='Location:Xyz'></input>
        <h5 className='font-24 f-400 l-137 mt-16 text-very-light-gray'>Password must be at least 8 characters and contain at least 1 number</h5>
        <button className={`btn-primary b-none font-20 f-500 l-137 mt-40 ${style["btn-save-password"]}`}>Save Password</button>
    </div>
  )
}

export default ChangePasswordContent
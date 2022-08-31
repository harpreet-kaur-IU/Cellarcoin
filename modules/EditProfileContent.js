import React from 'react'
import style from './css/EditProfileContent.module.css'

const EditProfileContent = () => {
  return (
    <div className={` ${style["edit-profile-wrapper"]}`}>
        <h4 className="f-400 l-137">You have signed up using: <span className='f-500'>xyz@enotecum.com</span></h4>
        <h4 className={`f-400 l-137 ${style["change-profile-pic"]}`}>Change profile picture</h4>
        <div className='d-flex d-flex-row'>
            <div className={`${style["profile-img-wrapper"]}`}>
                <img src="images/profile.png"></img>
            </div>
            <div className={`${style["editprofile-btn-wrapper"]}`}>
                <button className={` font-20 f-500 l-137 btn-primary b-none ${style["editprofile-upload-btn"]}`}>Upload new picture</button>
                <button className={` font-20 f-500 l-137  btn-secondary ${style["editprofile-delete-btn"]}`}>Delete</button>
            </div>
        </div>
        <h4 className={`f-400 l-137  mb-24 ${style["change-cover-text"]}`}>Change Cover picture</h4>
        {/* <button id="btnfile"> 
          <img src='images/wine-collection-bg.png' width='830' height='310'/>
        </button>  */}
        <input className='d-none' type="file" id="cover-pic" />
        <label for="cover-pic">
            <img className={`col-12 ${style["profile-cover-pic"]}`} src="images/wine-collection-bg.png"/>
        </label>
        <input className={`col-12 font-20 f-500 l-137 bg-input-box b-none rounded-16 mb-24 ${style["profile-user-name"]}`} placeholder='User Name:Xyz'></input>
        <input className={`col-12 font-20 f-500 l-137 bg-input-box b-none rounded-16 mb-24 ${style["profile-user-name"]}`} placeholder='Location:Xyz'></input>
        <button className={`font-20 f-500 l-137 btn-primary b-none ${style["btn-save-profile"]}`}>Save Profile</button>
    </div>
  )
}

export default EditProfileContent
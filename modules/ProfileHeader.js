import React from 'react'
import style from './css/ProfileHeader.module.css'
const ProfileHeader = () => {
  return (
    <div className={`container d-flex d-flex-column d-align-center d-justify-center text-black ${style["profile-header-wrapper"]}`}>
        <h1 className='font-61 f-700 l-137'>Penfolds Wine</h1>
        <p className='mt-8 font-25 f-400 l-137 '>Premium wine company</p>
    </div>
  )
}

export default ProfileHeader
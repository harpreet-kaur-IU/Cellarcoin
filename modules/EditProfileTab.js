import React from 'react'
import EditProfileContent from './EditProfileContent'
import style from './css/EditProfileContent.module.css'
const EditProfileTab = (props) => {
  return (
    <div>
      <h2 className={`f-600 l-137 text-black text-center ${style["edit-profile-heading"]}`}>{props.heading}</h2>
      <EditProfileContent></EditProfileContent>
    </div>
  )
}

export default EditProfileTab
import React from 'react'
import EditProfileContent from './EditProfileContent'

const EditProfileTab = (props) => {
  return (
    <div>
        <h2 className='f-600 l-137 text-black text-center'>{props.heading}</h2>
        <EditProfileContent></EditProfileContent>
    </div>
  )
}

export default EditProfileTab
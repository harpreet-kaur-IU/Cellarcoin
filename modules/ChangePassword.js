import React from 'react'
import ChangePasswordContent from './ChangePasswordContent'

const ChangePassword = (props) => {
  return (
    <div>
        <h2 className='f-600 l-137 text-black text-center'>{props.heading}</h2>
        <ChangePasswordContent></ChangePasswordContent>
    </div>
  )
}

export default ChangePassword
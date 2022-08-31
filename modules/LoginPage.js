import React from 'react'
import style from './css/SignUp.module.css'
const LogIn = () => {
  return (
    <div className='mt-108'>
      <div className={`p-absolute container-sm text-black ${style["signup-section-position"]}`}>
        <div className={`bg-pink ${style["sign-up-wrapper"]}`}>
          <h1 className='font-49 f-500 l-137'>Sign Up</h1>
          <input className={`bg-pink mt-64 font-25 f-500 l-137 ${style["signup-input"]}`} placeholder='Name'></input>
          <div className='p-relative'>
              <input className={`p-relative d-inline bg-pink mt-64 font-25 f-500 l-137 ${style["signup-input"]}`} placeholder='Password'></input>
              <img className={`p-absolute d-inline text-black ${style["password-img"]}`} src='images/eye-2.png'></img>
          </div>
          <button className={`col-12 font-20 f-500 l-137 btn-primary ${style["btn-continue"]}`}>Continue</button>
          <button className={`col-12 font-20 f-500 l-137 btn-secondary ${style["btn-google"]}`}>Sign in with Google</button>
          {/* <h5 className='f-400 font-25 l-137 mt-32 text-center'>Already a member? <a className='text-primary'>Sign in</a></h5> */}
        </div>
      </div>
    </div>
  )
}

export default LogIn
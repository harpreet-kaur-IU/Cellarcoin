
import React, { useState } from 'react'
import style from './css/SignUp.module.css'
import SignIn from './SignIn';
const SignUp = () => {
    const [toggle, setToggle] = useState(false);
    const handleClick = () =>{
        setToggle(!toggle);
    }
  return (
    <div className={`p-absolute container-sm text-black ${style["signup-section-position"]}`}>
        <div className={`bg-pink ${style["sign-up-wrapper"]}`}>
            <h1 className='font-49 f-500 l-137'>Sign Up</h1>
            <input className={`bg-pink mt-64 font-25 f-500 l-137 ${style["signup-input"]}`} placeholder='Name'></input>
            <input className={`bg-pink mt-64 font-25 f-500 l-137 ${style["signup-input"]}`} placeholder='User Name'></input>
            <input className={`bg-pink mt-64 font-25 f-500 l-137 ${style["signup-input"]}`} placeholder='Email'></input>
            <div className='p-relative'>
                <input className={`p-relative d-inline bg-pink mt-64 font-25 f-500 l-137 ${style["signup-input"]}`} placeholder='Password'></input>
                <img className={`p-absolute d-inline text-black ${style["password-img"]}`} src='images/eye-2.png'></img>
            </div>
            
            <div className='p-relative'>
                <input className={`p-relative d-inline bg-pink mt-64 font-25 f-500 l-137 ${style["signup-input"]}`} placeholder='Confirm Password'></input>
                <img className={`p-absolute d-inline text-black ${style["password-img"]}`} src='images/eye-2.png'></img>
            </div>
            <h5 className={`col-10 mt-16 font-22 f-400 l-137 text-very-light-gray ${style["password-warning"]}`}>Password must be at least 8 characters and contain at least 1 number</h5>
            <div className={`d-flex d-flex-row ${style["terms-wrapper"]}`}>
                <input type="checkbox"></input>
                <h5  className='d-inline text-black f-400 l-29  font-22'>By creating an account you agree to our <a className='a-underline text-primary f-700'>terms and conditions</a></h5>
            </div>
            <button className={`col-12 font-20 f-500 l-137 btn-primary ${style["btn-continue"]}`}>Continue</button>
            <button className={`col-12 font-20 f-500 l-137 btn-secondary ${style["btn-google"]}`}>Sign in with Google</button>
            <h5 className='f-400 font-25 l-137 mt-32 text-center'>Already a member? <a onClick={handleClick} className='text-primary'>Sign in</a></h5>
        </div>
        {toggle ? <SignIn></SignIn> : ""}
    </div>
  )
}

export default SignUp
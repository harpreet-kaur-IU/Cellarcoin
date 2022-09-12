import React, { useEffect, useState } from 'react'
import style from './css/SignUp.module.css'
const SignIn = (props) => {

    useEffect(()=>{
      console.log("useeffect")
      props.handler2()
    },[])
    const[email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [toggle, setToggle] = useState(false);

    const emailHandler = (e) =>{
      setEmail(e.target.value);
    }
    const passwordHandler = (e) =>{
      setPassword(e.target.value);
    }
    const viewPassword = (e) => {
      e.currentTarget.parentElement.classList.toggle(style["show"]);
    }
    const handleClick = () =>{
      setToggle(!toggle);
    }

    const formSubmit = (e) =>{
      e.preventDefault()
      console.log(email,password)
    }
  return (
    <div className={`p-absolute bg-pink  text-black ${style["signup-section-position"]}`}>
        <div className='d-flex d-align-center d-justify-space-between'>
            <h3 className='f-500 l-137'>Sign In</h3>
            <img onClick={props.handler} src='images/cross.png'></img>
        </div>
        <form onSubmit={formSubmit}>
          <input value={email} onChange={emailHandler} className={`bg-pink mt-24 font-18 f-500 l-137 ${style["signup-input"]}`} placeholder='Email'></input>
          <div className={`p-relative ${style["password"]}`}>
              <input type="password" className={`p-relative d-inline bg-pink mt-24 font-18 f-500 l-137 ${style["signup-input"]}`} value={password} onChange={passwordHandler} placeholder="Password" required/>
              <input type="text" className={`p-relative d-inline bg-pink mt-24 font-18 f-500 l-137 ${style["signup-input"]}`} placeholder="Password" onChange={passwordHandler} value={password} />
              <img onClick={viewPassword} className={`cursor-pointer p-absolute d-inline text-black ${style["password-img"]}`} src='images/eye-2.png'></img>
          </div>
          <button className={`mt-16 col-12 font-18 f-500 l-137 btn-primary ${style["btn-continue"]}`}>Continue</button>
        </form>
        <div className={`d-flex d-align-center d-justify-center mt-16 col-12 font-18 f-500 l-137 btn-secondary ${style["btn-google"]}`}>Sign in with Google</div>
        <h5 className='f-400 font-18 l-137 mt-16 text-center'>Not a member? <a onClick={handleClick} className='text-primary'>Sign Up</a></h5>
    </div>
  )
}

export default SignIn
import React, { useRef, useState } from 'react'
import Modal from './Modal';
import style from './css/SignUp.module.css'
import SignIn from './SignIn';
import useFirebaseAuth from '../auth/useFirebaseAuth';
import axios from 'axios';
import Loader from './Vendors Panel/Loader';
import { setUserOnBoardCookie,removeUserOnBoardCookie,getUserOnBoardFromCookie } from '../auth/userCookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getAuth,signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
import {firebaseApp} from '../auth/firebaseConfig';
import { async } from '@firebase/util';

const SignUp = (props) => {
    const {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} = useFirebaseAuth(); 

    //signup states
    const [name,setName] = useState("")
    const [username,setUserName] = useState("")
    const[email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [policyAccepted, setPolicyAccepted] = useState(false);
    const [passMatch, setPassMatch] = useState(false);
    const policy = useRef(null);
    const fileRef = useRef(null);
    // error state

    const [errorName,setErrorName] = useState(false)
    const [errorUserName,setErrorUserName] = useState(false)
    const [errorEmail,setErrorEmail] = useState(false)
    const [errorPass,setErrorPass] = useState(false)
    const [errorRePass,setErrorRePass] = useState(false)
    const [errorPolicy,setErrorPolicy] = useState(false)
    // signin states
    const[email2,setEmail2] = useState('');
    const [password2, setPassword2] = useState('');
   
    const [toggle, setToggle] = useState(true);
    const nameHandler = (e) =>{
        setName(e.target.value)
    }
    const emailHandler =(e) =>{
        setEmail(e.target.value)
    }
    const usernameHandler = (e) =>{
        setUserName(e.target.value)
    }
    const passwordHandler = (e) =>{
        setPassword(e.target.value);
    }
    const confirmPasswordHandler = (e)=>{
        setConfirmPassword(e.target.value)
    }
    const viewPassword = (e) => {
        e.currentTarget.parentElement.classList.toggle(style["show"]);
    }
    const viewConfirmPassword = (e) => {
        e.currentTarget.parentElement.classList.toggle(style["show"]);
    }
    const policyAcceptedHandler = () =>{
        setPolicyAccepted(prev => !prev);
    }
    const handleClick = () =>{
        setToggle(prev => !prev)
    }
    const firebaseAuth = getAuth(firebaseApp)
    const provider = new GoogleAuthProvider();
    const googleSignIn = () =>{
        signInWithPopup(firebaseAuth, provider)
        .then(authUser=>{
            var myHeaders = new Headers();
            myHeaders.append("Authorization","Bearer "+authUser.user.accessToken);
            var raw = {
                "name": authUser.user.displayName,
                "userName": authUser.user.displayName
            };
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}user/signup`,raw,{headers:{"Authorization":"Bearer "+authUser.user.accessToken}})
            .then(response => {
                if(response.data.message === "User added successfully!"){
                    signOut();
                    //login API
                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                    };
                    console.log(requestOptions)
                    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/login`, requestOptions)
                    .then(response => response.json()) 
                    .then(result => {
                        
                        if(result.message == "This email is not registered with us"){
                            toast.error("Email is not registered",{
                                toastId:"2"
                            });
                        }
                        else{
                            removeUserOnBoardCookie();
                            setUserOnBoardCookie(result.token);
                            props.confirm()
                            props.handler()
                        }
                    })
                    .catch(error => console.log('error', error));
                    return response();
                }
                else if(response.data.message === 'User already exist!!'){
                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                    };
                    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/login`, requestOptions)
                    .then(response => response.json()) 
                    .then(result => {
                        removeUserOnBoardCookie();
                        setUserOnBoardCookie(result.token);
                        props.handler();
                        props.confirm();
                        
                    })
                    .catch(error => console.log('error', error));
                    return response();
                }
                else{
                    throw new Error(response);
                }
            })
            .catch(error => console.log('error', error));   
        })
        .catch(error => console.log(error))
    }

    const validator = () =>{
        if(name === ""){
            setErrorName(true)
        }
        else{
            setErrorName(false)
        }
        if(username === ""){
            setErrorUserName(true)
        }
        else{
            setErrorUserName(false)
        }
        if(email === ''){
            setErrorEmail(true);
        }else{
            setErrorEmail(false);
        }
        if(password === ''){
            setErrorPass(true);
        }else{
            setErrorPass(false);
        }
        if(confirmPassword === ''){
            setErrorRePass(true);
        }else{
            setErrorRePass(false);
        }
        if(policyAccepted === false){
            setErrorPolicy(true)
        }
        else{
            setErrorPolicy(false)
        }
        if(password === confirmPassword ){
            setPassMatch(false);
        }else{
            setPassMatch(true);
        }
        if(!errorEmail && !errorPass && !errorRePass && !errorName && !errorUserName && policyAccepted && !passMatch){
            return true;
        }else{
            return false;
        }
    }

    const validator2 = () =>{
        if(email2 === ''){
            setErrorEmail(true);
        }else{
            setErrorEmail(false);
        }
    }
    const formSubmit = (e) =>{
        e.preventDefault();
        const result = validator();
        if(result){    
            createUserWithEmailAndPassword(email,password)
            .then(async(authUser) =>{
                var myHeaders = new Headers();
                myHeaders.append("Authorization","Bearer "+authUser.user.multiFactor.user.accessToken);
                var raw = {
                    "name": name,
                    "userName": username
                };
                axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}user/signup`,raw,{headers:{"Authorization":"Bearer "+authUser.user.multiFactor.user.accessToken}})
                .then(response => {
                    if(response.data.message === "User added successfully!"){
                        authUser.user.sendEmailVerification();
                        signOut();
                        handleClick();
                        return response;
                    }
                    else if(response.data.message === 'Email already exist!'){
                        toast.error("Email Already Exists",{
                            toastId:"2"
                        });
                    }
                    else{
                        throw new Error(response);
                    }
                })
                .catch(error => console.log('error', error));            
            })
            .catch(error => {
                if(error.message == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).'){
                    toast.error("Email Already Exists",{
                        toastId:"2"
                    });
                }
                if(error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
                    toast.error("Password Should be atleast 6 characters",{
                        toastId:"2"
                    });
                }
            })
        }
    }

    const emailHandler2 =(e) =>{
        setEmail2(e.target.value)
    }

    const passwordHandler2 = (e) =>{
        setPassword2(e.target.value);
    }
    const formSubmit2 = (e) =>{
        e.preventDefault()
        signInWithEmailAndPassword(email2,password2)
        .then(authUser => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization","Bearer "+authUser.user.multiFactor.user.accessToken);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
            };
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/login`, requestOptions)
            .then(response => response.json()) 
            .then(result => {
                if(result.message == "This email is not registered with us"){
                    toast.error("Email is not registered",{
                        toastId:"2"
                    });
                }
                else{
                    removeUserOnBoardCookie();
                    setUserOnBoardCookie(result.token);
                    props.confirm()
                    props.handler()
                }
            })
            .catch(error => console.log('error', error));
        })
        .catch(error => {
            if(error.message == "Firebase: Error (auth/user-not-found)."){
                toast.error("User Not Found",{
                    toastId:"2"
                });
            }
            else if(error.message == "Firebase: Error (auth/wrong-password)."){
                toast.error("Password Invalid",{
                    toastId:"2"
                });
            }
            else if(error.message == "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."){
                toast.error("Invalid Email",{
                    toastId:"2"
                });
            }
            else if(error.message == "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password)."){
                toast.error("Incorrect Password",{
                    toastId:"2"
                });
            }
            console.log(error)
        })
    }
  return (
    <div className={`p-absolute bg-pink text-black ${style["signup-section-position"]}`}>
        {!toggle &&
        <>
            <div className='d-flex d-align-center d-justify-space-between'>
                <h3 className='f-500 l-137'>Sign Up</h3>
                <img className='cursor-pointer' onClick={props.handler} src='images/cross.png'></img>
            </div>
            <form onSubmit={formSubmit}>
                <input type="text" className={`bg-pink mt-24 font-18 f-500 l-137 ${style["signup-input"]}`} value={name} onChange={nameHandler} placeholder='Name' required></input>
                <input type="text" className={`bg-pink mt-24 font-18 f-500 l-137 ${style["signup-input"]}`} value={username} onChange={usernameHandler} placeholder='User Name' required></input>
                <input type="email"className={`bg-pink mt-24 font-18 f-500 l-137 ${style["signup-input"]}`} value ={email} onChange={emailHandler} placeholder='Email' required></input>
                <div className={`p-relative ${style["password"]}`}>
                    <input type="password" className={`p-relative d-inline bg-pink mt-24 font-18 f-500 l-137 ${style["signup-input"]}`} value={password} onChange={passwordHandler} placeholder="Password" required/>
                    <input type="text" className={`p-relative d-inline bg-pink mt-24 font-18 f-500 l-137 ${style["signup-input"]}`} placeholder="Password" onChange={passwordHandler} value={password} />
                    <img onClick={viewPassword} className={`cursor-pointer p-absolute d-inline text-black ${style["password-img"]}`} src='images/eye-2.png'></img>
                </div>
                <div className={`p-relative ${style["password"]}`}>
                    <input type="password" className={`p-relative d-inline bg-pink mt-24 font-18 f-500 l-137 ${style["signup-input"]} `} placeholder='Confirm Password' onChange={confirmPasswordHandler} value={confirmPassword} required></input>
                    <input type="text" className={`p-relative d-inline bg-pink mt-24 font-18 f-500 l-137 ${style["signup-input"]}`} placeholder="Password" onChange={confirmPasswordHandler} value={confirmPassword} />
                    <img onClick={viewConfirmPassword} className={`cursor-pointer p-absolute d-inline text-black ${style["password-img"]}`} src='images/eye-2.png'></img>
                </div>
                {passMatch && <span className={`mb-8 font-14 f-700 text-danger`}>Password doesn't match.</span>}
                {errorRePass && <span className={`mb-8 font-14 f-700 text-danger `}>Please re-enter password.</span>}
                <h5 className={`mt-16 font-18 f-400 l-137 text-very-light-gray ${style["password-warning"]}`}>Password must be at least 6 characters</h5>
                <div onClick={policyAcceptedHandler} className={`mt-16 d-flex d-flex-row ${style["terms-wrapper"]}`}>
                    {policyAccepted && <input type="checkbox" ref={policy} checked ></input>}
                    {!policyAccepted && <input type='checkbox' ref={policy} ></input>}
                    <h5 className='d-inline text-black f-400 l-29 font-18'>By creating an account you agree to our <a className='a-underline text-primary f-700'>terms and conditions</a></h5>
                </div>
                {errorPolicy && <span className={`mb-8 font-14 f-700 text-danger`}>Please check the terms and conditions</span>}
                <button className={`mt-16 col-12 font-18 f-500 l-137 btn-primary cursor-pointer ${style["btn-continue"]}`}>Continue</button>
                <div onClick={googleSignIn} className={`cursor-pointer d-flex d-align-center d-justify-center mt-16 col-12 font-18 f-500 l-137 btn-secondary cursor-pointer ${style["btn-google"]}`}>Sign in with Google</div>
                <h5 className='f-400 font-18 l-137 mt-16 text-center'>Already a member? <a onClick={handleClick} className='cursor-pointer text-primary f-500'>Sign in</a></h5>
            </form>
        </>
        }

        {toggle &&
        <>
            <div className='d-flex d-align-center d-justify-space-between'>
                <h3 className='f-500 l-137'>Sign In</h3>
                <img onClick={props.handler} src='images/cross.png'></img>
            </div>
            <form onSubmit={formSubmit2}>
                <input type="email" value={email2} onChange={emailHandler2} className={`bg-pink mt-24 font-18 f-500 l-137 ${style["signup-input"]}`} placeholder='Email' required></input>
                <div className={`p-relative ${style["password"]}`}>
                    <input type="password" className={`p-relative d-inline bg-pink mt-24 font-18 f-500 l-137 ${style["signup-input"]}`} value={password2} onChange={passwordHandler2} placeholder="Password" required/>
                    <input type="text" className={`p-relative d-inline bg-pink mt-24 font-18 f-500 l-137 ${style["signup-input"]}`} placeholder="Password" onChange={passwordHandler2} value={password2} required/>
                    <img onClick={viewPassword} className={`cursor-pointer p-absolute d-inline text-black ${style["password-img"]}`} src='images/eye-2.png'></img>
                </div>
                <button className={`mt-16 col-12 font-18 f-500 l-137 btn-primary ${style["btn-continue"]}`}>Continue</button>
            </form>
            <div onClick={googleSignIn} className={`cusror-pointer d-flex d-align-center d-justify-center mt-16 col-12 font-18 f-500 l-137 btn-secondary ${style["btn-google"]}`}>Sign in with Google</div>
            <h5 className='f-400 font-18 l-137 mt-16 text-center'>Not a member? <a onClick={handleClick} className='cursor-pointer text-primary f-500'>Sign Up</a></h5>
        </>

        }
        <ToastContainer></ToastContainer>
    </div>
  )
}

export default SignUp
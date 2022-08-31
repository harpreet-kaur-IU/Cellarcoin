import React,{useEffect, useState} from 'react'
import styles from '.././css/Vendor Panel/signup.module.css'
import useFirebaseAuth from '../../auth/useFirebaseAuth';
import {setOnBoardCookie,removeOnBoardCookie,getOnBoardFromCookie } from '../../auth/userCookies';
import {useRouter} from 'next/router'
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {

    const {signInWithEmailAndPassword,signOut,authUser} = useFirebaseAuth()
    const [password, setPassword] = useState('');
    const [email,setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    
    const emailHandler = (e)=>{
        setEmail(e.target.value);
    }
    const viewPassword = (e) => {
        e.currentTarget.parentElement.classList.toggle(styles["show"]);
    }
    const passwordHandler = (e) =>{
        setPassword(e.target.value);
    }
    const signupHandler = () =>{
        router.push("/vendors")
    }
    var JWTtoken = getOnBoardFromCookie();
    useEffect(()=>{
        if(JWTtoken){
            router.push("/vendorDashboard")
        }
    },[])
    const formSubmit = (e) =>{
        e.preventDefault()
        signInWithEmailAndPassword(email,password)
        .then(authUser => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization","Bearer "+authUser.user.multiFactor.user.accessToken);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
            };

            setLoading(true)
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/login`, requestOptions)
            .then(response => response.json()) 
            .then(result => {
                if(result.message == "You are not verified by admin!"){
                    router.push("/verification")
                    setLoading(false)
                }
                else if(result.message == "This email is not registered with us"){
                    toast.error("Email is not registered",{
                        toastId:"2"
                    });
                    setLoading(false)
                }
                else{
                    removeOnBoardCookie();
                    setOnBoardCookie(result.token);
                    router.push("/vendorDashboard")
                    setLoading(false)
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
        })
    }
  return (
    <>
        {loading && <Loader></Loader>}
        <div className={`d-flex d-flex-wrap ${styles["signup-wrapper"]}`}>
            <div className={`p-relative col-6 col-xl-12 col-lg-6 col-d-none d-flex d-flex-column d-align-center ${styles["signup-left"]}`}>
                <div><img src="images/logo.svg" /></div>
                <div><h1 className='mt-32'>CellarCoin <br/>Fine Wine</h1></div>
                <div><h4>Pure grape wine Packed with good nutrient and taken care with hygine</h4></div>
                {/* <img className='p-absolute' src='images/vendor-banner.png'></img> */}
            </div>
            <div className={`col-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 ${styles["signup"]} `}>
                <div className={`d-flex d-justify-end ${styles["sign-up-tag"]}`}>
                    <h6 className='f-400'>New here? <span onClick={signupHandler} className='cursor-pointer f-700 text-primary'>Sign Up</span></h6>
                </div>
                <div className={`d-flex d-flex-column d-justify-center ${styles["signup-right"]}`}>
                    <h1>Welcome</h1>
                    <h2>Login to your account</h2>
                    <form onSubmit={formSubmit} className='d-flex d-flex-wrap'>
                        <div className={`col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 ${styles["input-wrapper"]}`}>
                            <input value={email} onChange={emailHandler} type="email" placeholder='Email' required/>   
                        </div>
                        <div className={`col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12  ${styles["input-wrapper"]} ${styles["password"]}`}>
                            <input type="password" value={password} onChange={passwordHandler} placeholder="Password" required/>
                            <input type="text" placeholder="Password" onChange={passwordHandler} value={password} required />
                            <span className='d-flex d-align-center d-justify-center cursor-pointer user-select-none' onClick={viewPassword}>
                                <img src="images/eye.png"/>
                            </span> 
                        </div>
                        {/* <div className='d-flex d-align-center col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <input type="checkbox"/>
                            <h5>I accept the <span className='f-700 text-primary'>Terms & Conditions</span></h5>
                        </div> */}
                        <button className={`cursor-pointer mt-32 ${styles["btn-primary"]}`}>Continue</button>
                    </form>
                </div>
            </div>
        </div>
        <ToastContainer />
    </>
  )
}

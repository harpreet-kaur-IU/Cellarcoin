import Link from 'next/link';
import React,{useEffect, useRef, useState} from 'react'
import useFirebaseAuth from '../../auth/useFirebaseAuth'
import styles from '.././css/Vendor Panel/signup.module.css'
import {useRouter} from 'next/router'
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SmallLoader from './SmallLoader';
import axios from 'axios';
export default function Signup() {

    const {createUserWithEmailAndPassword,formatAuthUser,signOut} = useFirebaseAuth(); 
    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [img,setImg] = useState(false);
    const[url,setUrl] = useState('');

    const [errorName,setErrorName] = useState(false)
    const [isUrl, setIsUrl] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPolicy,setPolicyError] = useState(false)
    const [errorPass, setErrorPass] = useState(false);
    const [errorRePass, setErrorRePass] = useState(false);
    const [coverError,setCoverError] = useState(false);
    const [passMatch, setPassMatch] = useState(false);
    const [policyAccepted, setPolicyAccepted] = useState(false);
    const [toggle,setToggle] = useState(false);
    const policy = useRef(null);
    const fileRef = useRef(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);
    const [cover,setCover] = useState("")

    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const regex = /^[^\s]+(\s+[^\s]+)*$/;
    const usernameRegex = /^[A-Za-z0-9\.]+$/
    
    const dropdownHandler = () =>{
        setToggle(!toggle);
    }
    const logHandler = () =>{
        router.push("/vendorlogin")
    }
    const nameHandler = (e) =>{
        setName(e.target.value);
    }
    const emailHandler = (e) =>{
        setEmail(e.target.value);
    }
    const viewPassword = (e) => {
        setImg(prev => !prev)
        e.currentTarget.parentElement.classList.toggle(styles["show"]);
    }
    const passwordHandler = (e) =>{
        setPassword(e.target.value);
    }
    const viewConfirmPassword = (e) => {
        e.currentTarget.parentElement.classList.toggle(styles["show"]);
    }
    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
    }
    const policyAcceptedHandler = () =>{
        setPolicyAccepted(prev => !prev);
    }

    //email checker
   
    const emailCheckHandler = () =>{
        if(reg.test(email)){
            setErrorEmail(false);
        }else{
            setErrorEmail(true);
        }
    }

    //password checker
    const checkPasswordHandler = (e) => {
        if(password === confirmPassword ){
            setPassMatch(false);
        }else{
            setPassMatch(true);
        }
    }

    //document upload handler
    const urlHandler = (e)=>{
         if(!e.target.files[0].name.match(/\.(jpg|jpeg|png|heiv|pdf)$/)){
            setCoverError(true)
            // setCover(e.target.files[0])
         }
        else{
            setCoverError(false)
            setCover(e.target.files[0])
        }
    }

    useEffect(()=>{
        if(cover){
            var formdata = new FormData();
            formdata.append("image",cover);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };
            setLoadingImg(true)
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}uploadImage`, requestOptions)
            .then(response => response.text())
            .then(result => {
                var results = (JSON.parse(result))
                setUrl(results.imageUrl)
                setLoadingImg(false)
            })
            .catch(error => console.log('error', error));
        }
    },[cover])
    //to check that all the form fields are filled correctly without any error
    const validator = () =>{
        if(usernameRegex.test(name)){
            setErrorName(false)
        }
        else{
            setErrorName(true)
        }
        if(email === ''){
            setErrorEmail(true);
        }else{
            setErrorEmail(false);
        }
        if(password === '' || password.length<6){
            setErrorPass(true);
        }else{
            setErrorPass(false);
        }
        if(url === ''){
            setIsUrl(true);
        }else{
            setIsUrl(false);
        }
        if(policyAccepted){
            setPolicyError(false)
        }else{
            setPolicyError(true)
        }
        if(!errorEmail && !errorPass && policyAccepted && !isUrl && usernameRegex.test(name)){
            return true;
        }else{
            return false;
        }
    }
    //form Submit Handler

    const formSubmit = (e) =>{
        e.preventDefault();
        const result = validator();
        if(result){    
            createUserWithEmailAndPassword(email,password)
            .then(async(authUser) =>{
                var myHeaders = new Headers();
                myHeaders.append("Authorization","Bearer "+authUser.user.multiFactor.user.accessToken);
                var raw = {
                    "name":name,
                    "documentUrl":url
                };

                setLoading(true)
                axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/signup`,raw,{headers:{"Authorization":"Bearer "+authUser.user.multiFactor.user.accessToken}})
                .then(response => {
                    console.log(response)
                    if(response.data.message === "Signed up successfully!"){
                        authUser.user.sendEmailVerification();
                        signOut();
                        router.push("/vendorlogin");
                        setLoading(false)
                        return response.json();
                    }
                    else if(response.data.message === 'Email already exist!'){
                        setLoading(false)
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
  return (
    <>
        {loading && <Loader></Loader>}
        <div className={`d-flex d-flex-wrap ${styles["sign-up-height"]}`}>
            <div className={`col-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 d-flex d-flex-column d-align-center  ${styles["signup-left"]}`}>
                <div><img src="images/logo.svg"/></div>
                <div><h1 className='mt-32'>CellarCoin <br/>Fine Wine</h1></div>
                <div><h4>Pure grape wine Packed with good nutrient and taken care with hygine</h4></div>
                {/* <img className='p-absolute' src='images/Ellipse-nft.svg'></img> */}
            </div>
            <div className={`col-d-none col-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 ${styles["signup"]} d-flex d-flex-column `}>
                <div className={`d-flex d-justify-end ${styles["log-in-tag"]}`}>
                    <h6 className='f-400'><span onClick={logHandler} className='cursor-pointer f-700 text-primary'>Log In</span></h6>
                </div>
                <div className={`d-flex d-flex-column d-justify-center ${styles["login-right"]}`}>
                    {/* <h1 className='h1-vendore'>Welcome</h1> */}
                    <h3 className='f-600 text-primary'>Create an account</h3>
                    <form onSubmit={formSubmit} className='d-flex d-flex-wrap'>
                        <div className={`col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 ${styles["input-wrapper"]}`}>
                            <input type="text" placeholder='Name' value={name} onChange={nameHandler} required/>   
                        </div>
                        {errorName && <span className={`mb-8 font-14 f-700 text-danger`}>Please Enter Valid Name.</span>}
                        <div className={`col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 ${styles["input-wrapper"]}`}>
                            <input type="text" className={`${errorEmail && styles["error"]}`} placeholder='Email' value={email} onChange={emailHandler}  required/>   
                        </div>
                        <div className={`col-12 col-xl-12 c ol-lg-12 col-md-12 col-sm-12 col-xs-12 ${styles["input-wrapper"]} ${styles["password"]}`}>
                            <input type="password" value={password} onChange={passwordHandler} placeholder="Password" required/>
                            <input type="text" placeholder="Password" onChange={passwordHandler} value={password} />
                            <span className='d-flex d-align-center d-justify-center cursor-pointer user-select-none' onClick={viewPassword}>
                                {img ? <img src="images/eye2.svg"/> :<img src="images/eye.png"/>}
                            </span>
                        </div>
                        {errorPass && <span className={`mb-8 font-14 f-700 text-danger`}>Password must be at least 6 character long.</span>}
                        {/* <div className='col-12 p-relative'>
                            <div className={`col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex d-align-center d-justify-space-between ${styles["input-wrapper"]} `}>
                                <span className={`font-20 f-400 l-28 ${styles["connect-wallet-text"]}`}>Connect your Wallet</span>
                                <span onClick={dropdownHandler} className='d-flex d-ali
                                
                                gn-center d-justify-center cursor-pointer user-select-none'>
                                    <img className={`${styles["arrow-down"]}`} src="images/arrow-down.png"/>
                                </span>
                            </div>
                            {toggle && 
                                <div className={`col-12 p-absolute ${styles["connect-wallet-dropdown"]}`}>
                                    <div className={`d-flex d-justify-space-between ${styles["connect-wallet-item-wrapper"]}`}>
                                        <h6 className='f-400 l-27'>Meta Mask</h6>
                                        <img src='images/MetaMask.png'></img>
                                    </div>
                                    <div className={`d-flex d-justify-space-between ${styles["connect-wallet-item-wrapper"]}`}>
                                        <h6 className='f-400 l-27'>WalletConnect</h6>
                                        <img src='images/wallet-connect.png'></img>
                                    </div>
                                    <div className={`d-flex d-justify-space-between ${styles["connect-wallet-item-wrapper"]}`}>
                                        <h6 className='f-400 l-27'>Coinbase Wallet</h6>
                                        <img src='images/coin-base.png'></img>
                                    </div>
                                    <div className={`d-flex d-justify-space-between ${styles["connect-wallet-item-wrapper"]}`}>
                                        <h6 className='f-500 l-27'>Show More Options</h6>         
                                    </div>
                                </div>
                            }
                        </div> */}
                        
                        
                        {/* {errorPass && <span className={`mb-8 font-14 f-700 text-danger`}>Please enter password.</span>}
                        <div className={`col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12  ${styles["input-wrapper"]} ${styles["password"]}`}>
                            <input type="password" value={confirmPassword} onChange={confirmPasswordHandler} placeholder="Confirm Password" onBlur={checkPasswordHandler}/>
                            <input type="text" placeholder="Confirm Password" onChange={confirmPasswordHandler} value={confirmPassword}  />
                            <span className='d-flex d-align-center d-justify-center cursor-pointer user-select-none' onClick={viewConfirmPassword}>
                                <img src="images/eye.png"/>
                            </span>
                        </div> */}
                        {/* {passMatch && <span className={`mb-8 font-14 f-700 text-danger`}>Password doesn't match.</span>}
                        {errorRePass && <span className={`mb-8 font-14 f-700 text-danger `}>Please re-enter password.</span>} */}
                        <div className={`mt-8 rounded-6 ${styles["signup-cover-input-wrapper"]}`} >
                            <h4 className={`font-20 f-600 l-28 ${styles["signup-upload-docs"]}`}>Upload Documents</h4>
                            <h4 className={`f-400 ${styles["signup-accepted-docs"]}`}>Accepted documents: <span className='f-600'>ID Proof, Company ID Proof</span></h4>
                            <input
                                type="file" 
                                ref={fileRef}
                                onChange={urlHandler}
                                multiple={false}
                                className={`col-12 d-block mt-8 ${styles["signup-form-upload-field"]}`}
                            />
                            {coverError && <span className={`mb-8 font-14 f-700 text-danger`}>Please Select jpg,jpeg,png,heiv,pdf file format</span>}
                            {!url && <div className={`d-flex d-flex-column f-500 l-28 ${styles["signup-form-upload-text"]}`}>
                                {/* <img src="images/upload.png"></img> */}
                                {loadingImg && <SmallLoader></SmallLoader>}
                                {!cover && <h4 className='f-600'>Drag and drop files here or upload</h4>}
                            </div>}
                            
                            {url && 
                                <h4 className={`text-primary d-flex d-justify-center f-500 l-28 ${styles["signup-form-upload-text"]}`}>
                                    <span className='mt-14'>Document Uploaded Successfully :{url}</span>
                                </h4>
                            }
                        </div>
                        
                        {isUrl && <span className={`mt-24 mb-8 font-14 f-700 text-danger`}>Please upload Documents.</span>}
                        <div onClick={policyAcceptedHandler} className={`d-flex d-align-center col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 ${styles["policy-accepted"]}`}>
                            {policyAccepted && <input type="checkbox" ref={policy} checked ></input>}
                            {!policyAccepted && <input type='checkbox' ref={policy} ></input>}
                            <h4 className='font-20 f-400 ml-10'>I accept the <span className='f-700 text-primary'>Terms & Conditions</span></h4>
                        </div>
                        {errorPolicy && <span className={`mb-8 font-14 f-700 text-danger`}>Please check the Terms and Conditions.</span>}
                        <button className={`cursor-pointer font-20 f-700 ${styles["btn-primary"]}`}>Sign Up</button>
                    </form>
                </div>
                {/* <h4 className='mt-24 font-20 f-400 ml-10'>Already have an account ?<Link href="/vendorlogin" className='cursor-pointer f-700 text-primary'> Login</Link></h4> */}
            </div>
            <ToastContainer />
        </div> 
    </>
  )
}

import React, { useEffect, useState } from 'react'
import Header from './Header'
import styles from '../css/Vendor Panel/MultiVendor.module.css'
import {getOnBoardFromCookie} from '../../auth/userCookies';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BrandDropDown from './BrandDropdown';
import { useRouter } from 'next/router';
const MultiVendor = () => {
  var JWTtoken = getOnBoardFromCookie();
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [brand,setBrand] = useState()
  const [data,setData] = useState("");
  const [login,setLogin] = useState(false)
  const [loading,setLoading] = useState(false);
  const [user,setUser] = useState("")
  const [userEmail,setUserEmail] = useState("")
  const [emailError,setEmailError] = useState(false)
  const [passwordError,setPasswordError] = useState(false)
  const [brandError,setBrandError] = useState(false)
  const [brandData,setBrandData] = useState("");
  const regex = /^[^\s]+(\s+[^\s]+)*$/;
  const router = useRouter();
 

  const emailHandler = (e) =>{
    setEmail(e.target.value)
  }

  const passwordHandler = (e) =>{
    setPassword(e.target.value)
  }
  const brandHandler = (value) =>{
    setBrand(value);
    console.log(value)
  }

  const validator = ()=>{
    if(regex.test(email)){
      setEmailError(false);
    }else{
      setEmailError(true);
    }
    if(regex.test(password)){
      setPasswordError(false);
    }else{
      setPasswordError(true);
    }
    if(regex.test(brand)){
      setBrandError(false);
    }else{
      setBrandError(true);
    }
    if(!regex.test(email) || !regex.test(password) || !regex.test(brand)){
      return false;
    }else{
      return true;
    }
  }
  useEffect(()=>{
      function parseJwt() {
        if (!JWTtoken) {return}
        const base64Url = JWTtoken.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
      }
      var user = parseJwt();
      setUser(user.user.name)
      setUserEmail(user.user.email)
      var myHeaders = new Headers();
      myHeaders.append("Authorization","Bearer "+JWTtoken);
      myHeaders.append("Content-Type","application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/getSubVendor`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setData(result.data)
        setLoading(false)
      })
      .catch(error => console.log('error', error));



      if(JWTtoken){
        var myHeaders = new Headers();
        myHeaders.append("Authorization","Bearer "+JWTtoken);
        myHeaders.append("Content-Type","application/json");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders
        };
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/getBrandList`, requestOptions)
        .then(response => response.json())
        .then(result =>{
          setBrandData(result.data)
        })
        .catch(error => console.log('error', error));
      }else{
        router.push("/vendorlogin")
      }
  },[])

  const createLoginHandler = (e) =>{
    if(brandData.length<=0){
      toast.warning("Please Add Brand first",{
        toastId:"2"
      });
    }else{
      setLogin(!login)
    }
  }
  const formSubmit = (e) =>{
      e.preventDefault()
      var result = validator();
      if(result){
        var myHeaders = new Headers();
        myHeaders.append("Authorization","Bearer "+JWTtoken);
        myHeaders.append("Content-Type","application/json");

        var raw = JSON.stringify({
          "email":email,
          "password":password,
          "brand":brand
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw
        };
        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/addSubVendor`, requestOptions)
        .then(response => response.json())
        .then(result =>{
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/getSubVendor`,{
            method: 'GET', 
            headers: myHeaders,
          })
          .then(response => response.json())
          .then(results =>{
            setData(results.data)
            toast.success("Sub Vendor Created Successfully",{
              toastId:"2"
            });
          })
          setEmail("")
          setPassword("")
          setBrand("")
          setLoading(false)
          setLogin(prev=>!prev)
          .catch(error => console.log('error', error))
        })
        .catch(error => console.log('error', error));
    }
  }
  return (
    <>
        {loading && <Loader></Loader>}
        <Header></Header>
        <div className={`${styles["multi-vendor-wrapper"]}`}>
          <h3 className='font-36 f-700 l-49 text-primary'>Profile</h3>
          <div className={`d-flex ${styles["profile-wrapper"]}`}>
            {/* <div className={`col-4 ${styles["vendor-panel-img"]}`}>
              <img src='images/vendor-panel.png'></img>
            </div> */}
            <div className={`d-flex d-flex-column col-8 ${styles["profile-details-wrapper"]}`}>
              <h6 className='font-18 f-600 l-23'>Profile information</h6>
              <form className='d-flex d-flex-column'>
                <div className={`d-flex d-align-center d-justify-center ${styles["name-input"]}`}>
                  <h6 className='f-400 l-22'>Name</h6>
                  <input type="text" value={user} placeholder='Name' readOnly></input>
                  {/* <img src='images/vendor-edit.png'></img> */}
                </div>
                <div className={`d-flex d-align-center d-justify-center ${styles["name-input"]}`}>
                  <h6 className='f-400 l-22'>Email</h6>
                  <input type="text" value={userEmail} readOnly></input>
                  {/* <img src='images/vendor-edit.png'></img> */}
                </div>
                {/* <div className={`d-flex d-align-center d-justify-center ${styles["name-input"]}`}>
                  <h6 className='f-400 l-22'>Email</h6>
                  <input type="email" placeholder='Email'></input>
                  <img src='images/vendor-edit.png'></img>
                </div>
                <div className={`d-flex d-align-center d-justify-center ${styles["name-input"]}`}>
                  <h6 className='f-400 l-22'>Password</h6>
                  <input type="password" placeholder='Password'></input>
                  <img src='images/vendor-edit.png'></img>
                </div> */}
                {/* <div className={`d-flex d-justify-end ${styles["submit-btn-wrapper"]}`}>
                  <button className='font-14 l-22 f-600'>Submit</button>
                </div> */}
              </form>
            </div>
          </div>

          <div className={`d-flex d-align-center d-justify-space-between ${styles["multi-vendor-access"]}`}>
            <h3 className='f-700 font-36 text-primary l-49'>Multiple Vendor Access</h3>
            <div onClick={createLoginHandler} className={`cursor-pointer font-16 f-600 l-22 d-flex d-align-center d-justify-center ${styles["create-login-id"]}`}>Create Vendor</div>
          </div>
          {login &&
            <div className={`${styles["create-login-wrapper"]}`}>
              <h4 className={`font-24 f-600 l-22 ${styles["create-login-h4"]}`}>Create a new log in ID</h4>
              <form onSubmit={formSubmit}>
                <div className={`${styles["create-login-input-wrapper"]}`}>
                  <h6 className='font-18 f-500 l-22'>User ID/ Email</h6>
                  <input value={email} onChange={emailHandler} type="email" required></input>
                </div>
                {emailError && <span className={`mt-24 mb-8 font-14 f-700 text-danger`}>Please Enter User ID/ Email.</span>}
                <div className={`${styles["create-login-input-wrapper"]}`}>
                  <h6 className='font-18 f-500 l-22'>Password</h6>
                  <input value={password} onChange={passwordHandler} type="password" required></input>
                </div>
                {passwordError && <span className={`mt-24 mb-8 font-14 f-700 text-danger`}>Please Enter Valid Password.</span>}
                <div className={`${styles["create-login-input-wrapper"]}`}>
                  <h6 className='font-18 f-500 l-22'>Brand</h6>
                  {/* <input value={brand} onChange={brandHandler} type="text" required></input> */}
                  <BrandDropDown width="343px" data={brandData} handler={brandHandler} value="Select Brand"></BrandDropDown>
                </div>
                {brandError && <span className={`mt-24 mb-8 font-14 f-700 text-danger`}>Please Enter Valid Brand Name.</span>}
                <button className={`d-flex d-align-center d-justify-center ${styles["save-btn"]}`}>
                    <h6>Save</h6>
                </button>
              </form>
            </div>
          }
          {!login && data && data.map((item,index)=>(
            <div key={index} className={`col-6 ${styles["multi-vendor-access-wrapper"]}`}>
              <div className={`d-flex ${styles["login-creds-wrapper"]}`}>
                <h4 className='font-24 f-500'>{index+1}.</h4>
                <div className={`d-flex d-flex-column ${styles["login-cred-details"]}`}>
                  <h4 className='font-24 f-500'>Login Credentials for {item.parentVendor.name}</h4>
                  <h6 className='f-500'>{item.email}</h6>
                  {/* <div className={`d-flex d-align-center d-justify-space-between ${styles["login-cred-password-wrapper"]}`}>
                    <input className='font-32' type="password" readOnly value={item.password}></input>
                    <img className='cursor-pointer' src='images/eye.png'></img>
                  </div> */}
                </div>
              </div>
            </div>
          ))
          }
        </div>
        <ToastContainer/>
    </>
  )
}

export default MultiVendor
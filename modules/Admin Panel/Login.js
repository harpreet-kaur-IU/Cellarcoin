import React,{useState} from 'react'
import styles from '../css/Admin Panel/Login.module.css'
import {setAdminOnBoardCookie,removeAdminOnBoardCookie } from '../../auth/userCookies';
import {useRouter} from 'next/router'
import Loader from '../Vendors Panel/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
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

    const formSubmit = (e) =>{
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email":email,
            "password":password
        })
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}admin/login`, requestOptions)
        .then(response => response.json()) 
        .then(result =>{ 
            if(result.message === "Invalid email or password!"){
                toast.error("Invalid email or password!",{
                    toastId:"2"
                });
                setLoading(false)
            }else{
                removeAdminOnBoardCookie()
                setAdminOnBoardCookie(result.token)
                router.push("/admindashboard")
                setLoading(false)
            }
        })
        .catch(error => console.log('error', error));
    }
  return (
    <>
    {loading && <Loader></Loader>}
        <div className={`d-flex d-flex-wrap ${styles["signup-wrapper"]}`}>
            <div className={`p-relative col-6 col-xl-12 col-lg-6 col-d-none d-flex d-flex-column d-align-center ${styles["signup-left"]}`}>
                <div><img src="images/logo.svg"/></div>
                <div><h1 className='mt-32'>CellarCoin <br/>Fine Wine</h1></div>
                <div><h4>Pure grape wine Packed with good nutrient and taken care with hygine</h4></div>
            </div>
            <div className={`col-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 ${styles["signup"]} `}>
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
                        <button className={`cursor-pointer mt-32 ${styles["btn-primary"]}`}>Log In</button>
                    </form>
                </div>
            </div>
        </div>
        <ToastContainer></ToastContainer>
    </>
  )
}

export default Login
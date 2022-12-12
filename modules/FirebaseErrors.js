import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FirebaseErrors = (props) => {
    if(props.code){
        toast.error("Email Already Exists",{
            toastId:"2"
        });
    }
  return (
    <ToastContainer/>
  )
}

export default FirebaseErrors
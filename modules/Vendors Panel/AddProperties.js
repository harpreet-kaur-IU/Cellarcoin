import React, { useEffect, useState } from 'react'
import styles from '../css/Vendor Panel/AddProperties.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProperties = (props) => {
    const [property1,setProperty1] = useState("");
    const [propertyName1,setPropertyName1] = useState("");
    const [loading,setLoading] = useState("")
    const [property2,setProperty2] = useState("");
    const [propertyName2,setPropertyName2] = useState("");

    const removeProperty1Handler = () =>{
        setProperty1("")
        setPropertyName1("")
    }
    const removeProperty2Handler = () =>{
        setProperty2("")
        setPropertyName2("")
    }
    const propertyOne =(e)=>{
        setProperty1(e.target.value)
    }

    const propertyNameOne =(e)=>{
        setPropertyName1(e.target.value)
    }

    const propertyTwo =(e)=>{
        setProperty2(e.target.value)
    }

    const propertyNameTwo =(e)=>{
        setPropertyName2(e.target.value)
    }

    useEffect(()=>{
        if(props.opt1){  
            setProperty1(props.opt1.trait_type)
            setPropertyName1(props.opt1.value)
        }
        if(props.opt2){  
            setProperty2(props.opt2.trait_type)
            setPropertyName2(props.opt2.value)
        }
    },[])

    const submitHandler = (e) =>{
        e.preventDefault();
        var allStates1 = {
            "trait_type":property1,
            "value":propertyName1
        }
       
        var allStates2 = {
            "trait_type":property2,
            "value":propertyName2
        }
        props.data(allStates1,allStates2);
        if(allStates1 || allStates2){
            toast.success("properties Added Successfully",{
                toastId:"2"
            });
        }
    }

  return (
    <>
        <div className={`${styles["wrapper"]}`}>
            <h4 className='f-600 l-33'>Add Properties</h4>
            <h5 className='f-500 l-33'>Add a new propertity to your propertiy list, this will be shown in the product details page.</h5>
            <form onSubmit={submitHandler}>
                <div className={`d-flex ${styles["properties-wrapper"]}`}>
                    <div className='col-5 d-flex d-flex-column'>
                        <h6 className='f-600 l-22'>Type</h6>
                        <input value={property1} onChange={propertyOne} type="text"></input>
                    </div>
                    <div className='col-5 d-flex d-flex-column'>
                        <h6 className='f-600 l-22'>Name</h6>
                        <input value={propertyName1} onChange={propertyNameOne} type="text"></input>
                    </div>
                    <div onClick={removeProperty1Handler} className={`cursor-pointer d-flex d-align-center d-justify-center ${styles["remove-properties"]}`}>
                        <img src='images/white-cross.png'></img>
                    </div>
                </div>
                <div onClick={props.handler} className={`cursor-pointer d-flex d-align-center d-justify-center ${styles["btn-cross"]}`}>
                    <img src='images/close-icon.png'></img>
                </div>

                <div className={`d-flex ${styles["properties-wrapper"]}`}>
                    <div className='col-5 d-flex d-flex-column'>
                        <h6 className='f-600 l-22'>Type</h6>
                        <input value={property2} onChange={propertyTwo} type="text"></input>
                    </div>
                    <div className='col-5 d-flex d-flex-column'>
                        <h6 className='f-600 l-22'>Name</h6>
                        <input value={propertyName2} onChange={propertyNameTwo} type="text"></input>
                    </div>
                    <div onClick={removeProperty2Handler} className={`cursor-pointer d-flex d-align-center d-justify-center ${styles["remove-properties"]}`}>
                        <img src='images/white-cross.png'></img>
                    </div>
                </div>
                <div onClick={props.handler} className={`cursor-pointer d-flex d-align-center d-justify-center ${styles["btn-cross"]}`}>
                    <img src='images/close-icon.png'></img>
                </div>
                <button className={`cursor-pointer ${styles["button-add"]}`}>Add</button>
            </form>
        </div>
    </>
  )
}

export default AddProperties
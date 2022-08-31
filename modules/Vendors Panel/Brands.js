import React, { useEffect, useState, useRef } from 'react'
import Header from './Header'
import Link from 'next/link'
import styles from '.././css/Vendor Panel/Brands.module.css'
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SmallLoader from './SmallLoader';
import {getOnBoardFromCookie} from '../../auth/userCookies';
import Moment from 'react-moment';

const Brands = () => {
  const [brand,setBrand] = useState("");
  const [cover,setCover] = useState("");
  const [url,setUrl] = useState("");
  const [data,setData] = useState("")
  const [loading,setLoading] = useState(false);
  const [loadingImg,setLoadingImg] = useState(false);
  const [isUrl, setIsUrl] = useState(false);
  const fileRef = useRef();
  var JWTtoken = getOnBoardFromCookie();

  const brandHandler = (e) =>{
    setBrand(e.target.value)
  }
  const coverHandler = (e) =>{
    setCover(e.target.files[0])
  }

  const validator = () =>{
    if(url === ''){
        setIsUrl(true);
    }else{
        setIsUrl(false);
    }
    if(url === ' '){
        return false;
    }else{
        return true;
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
          "brandName":brand,
          "documentUrl":url
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
      };
      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/addBrand`, requestOptions)
      .then(response => response.json())
      .then(result =>{ 
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/getBrands`,{
            method: 'GET', 
            headers: myHeaders,
          })
          .then(response => response.json())
          .then(results =>{
            setData(results.data)
          })
          toast.success("Brand Created Successfully",{
            toastId:"2"
          });
          var inputfile = document.getElementById("file-input-field");
          inputfile.value = "";
          setBrand(" ")
          setCover(" ")
          setUrl(" ")
          setLoading(false)
      })
      .catch(error => console.log('error', error));
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

  useEffect(()=>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization","Bearer "+JWTtoken);
    myHeaders.append("Content-Type","application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/getBrands`, requestOptions)
    .then(response => response.json())
    .then(result =>{
      setData(result.data)
      setLoading(false)
    })
    .catch(error => console.log('error', error));
  },[])
  return (
    <div>
      <Header></Header>
      {loading && <Loader></Loader>}
      <div className={`${styles["brands-wrapper"]}`}>
        <h3 className='f-600 l-23 text-primary'>Brands</h3>
        <div className={`d-flex ${styles["brands-outer-wrapper"]}`}>
          <div className={`col-7 ${styles["brands-scroll"]}`}>
            <div className={`${styles["brand-table-wrapper"]}`}>
              <div className={`${styles["brand-table-header"]}`}>
                <span className='font-16 f-600'>Brands</span>
                <span className='font-16 f-600'>Created On</span>
                <span className='font-16 f-600'>Actions</span>
              </div>
              {data && data.map((item)=>(
                <div className={`${styles["brand-table-body"]}`}>
                  <span className='font-16 f-500 text-primary'>{item.brandName}</span>
                  <span className='font-16 f-500 '><Moment fromNow>{item.createdAt}</Moment></span>
                  <span className={`cusror-pointer font-14 f-500 d-flex d-align-center d-justify-center ${styles["brand-action"]}`}>
                    <Link href={`/vendorBrand`}>
                      <img src='images/edit-2.svg'></img>
                    </Link>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className={`col-5 ${styles["add-brand-wrapper"]}`}>
            <h4 className='f-600 l-23 text-primary'>Add Brand</h4>
            <h5 className='f-500 l-23 mt-24'>Enter your Brand Name</h5>
            <form onSubmit={formSubmit} className='mt-16'>
              <input value={brand} onChange={brandHandler} className={`col-12 ${styles["brands-input"]}`} type="text"></input>
              <h5 className='f-500 l-23 mt-24'>Upload Documents</h5>
              <h6 className='mt-16 f-400'>Accepted documents: ID Proof, Company ID Proof</h6>
              <div className={`mt-16 ${styles["brands-file-upload"]}`}>
                <input 
                  id='file-input-field'
                  type='file'
                  ref={fileRef}
                  multiple={false}
                  onChange={coverHandler}
                  required>
                </input>
                {loadingImg && <SmallLoader></SmallLoader>}
                {!loadingImg && !url && <span className='f-400 font-14'>Drag and drop files here or upload</span>}
                {url && <span className='d-flex d-justify-center mt-16 f-400 font-14'>File Uploaded Successfully : {url}</span>}
              </div>
              <button className='mt-16'>Save</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Brands
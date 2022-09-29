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
  //cover states
  const [coverError,setCoverError] = useState(false);
  const [cover,setCover] = useState("");
  const [url,setUrl] = useState("");
  const [loadingImg,setLoadingImg] = useState(false);
  const fileRef = useRef();
  const [isUrl, setIsUrl] = useState(false);

  //profile states
  const [profile,setProfile] = useState("");
  const [profileUrl,setProfileUrl] = useState("");
  const [loadingProfileImage,setLoadingProfileImage] = useState(false);
  const profileRef = useRef();

  const [data,setData] = useState("")
  const [loading,setLoading] = useState(false);
  
  const [isBrandError,setBrandError] = useState(false);
  var JWTtoken = getOnBoardFromCookie();
  const regex = /^[^\s]+(\s+[^\s]+)*$/;
  const brandHandler = (e) =>{
    setBrand(e.target.value)
  }
  const coverHandler = (e) =>{
    if(!e.target.files[0].name.match(/\.(jpg|jpeg|png|heiv|pdf)$/)){
      setCoverError(true)
    }
    else{
      setCoverError(false)
      setCover(e.target.files[0]);
    }
  }

  const profileHandler = (e) =>{
    setProfile(e.target.files[0])
  }
  const validator = () =>{
    if(regex.test(brand)){
      setBrandError(false);
    }else{
      setBrandError(true);
    }
    if(url === ''){
      setIsUrl(true);
    }else{
      setIsUrl(false);
    }
    if(!regex.test(brand) || url === ''){
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
            var inputfile = document.getElementById("file-input-field");
            inputfile.value = "";
            setBrand(" ")
            setCover(" ")
            setUrl(" ")
            setLoading(false)
          })
          toast.success("Brand Created Successfully",{
            toastId:"2"
          });
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
                <span className='font-16 f-600 text-center'>Status</span>
              </div>
              {data && data.map((item)=>(
                <div className={`${styles["brand-table-body"]}`}>
                  <span className='font-16 f-500 text-primary'>{item.brandName}</span>
                  <span className='font-16 f-500'><Moment fromNow>{item.createdAt}</Moment></span>
                    {item.status === "approved"? 
                      <div className={`cusror-pointer font-14 f-500 d-flex d-justify-center ${styles["brand-approved"]}`}>
                        <span>
                          Approved
                        </span>
                      </div> : 
                      <div className={`cusror-pointer font-14 f-500 d-flex d-justify-center ${styles["brand-rejected"]}`}>
                        <span>
                          Rejected
                        </span>
                      </div>
                    }
                </div>
              ))}
            </div>
          </div>
          <div className={`col-5 ${styles["add-brand-wrapper"]}`}>
            <h4 className='f-600 l-23 text-primary'>Add Brand</h4>
            <h5 className='f-500 l-23 mt-24'>Enter your Brand Name</h5>
            <h6 className='mt-16 f-400'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h6>
            <form className={`${styles["brand-form"]}`} onSubmit={formSubmit}>
              <input value={brand} onChange={brandHandler} className={`mt-16 col-12 ${styles["brands-input"]}`} type="text" required></input>
              {isBrandError && <span className={`mt-24 mb-8 font-14 f-700 text-danger`}>Please Enter Valid Brand Name.</span>}
             
              {/* upload Documents */}
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
                {loadingImg && !url && <SmallLoader></SmallLoader>}
                {!loadingImg && !url && <span className='f-400 font-14'>Drag and drop files here or upload</span>}
                {url && <span className='d-flex d-justify-center mt-16 f-400 font-14'>File Uploaded Successfully : {url}</span>}
              </div>
              {isUrl && <span className={`mt-24 mb-8 font-14 f-700 text-danger`}>Please Select a file.</span>}
              {coverError && <span className={`mt-24 mb-8 font-14 f-700 text-danger`}>Please Select Valid file format.</span>}
              
              {/* upload Profile Image */}
              <h5 className='f-500 l-23 mt-24'>Upload Profile Image</h5>
              <h6 className='mt-16 f-400'>File in JPG, PNG smaller than 10MB.</h6>
              <div className={`mt-16 ${styles["brands-file-upload"]}`}>
                <input 
                  id='file-input-field'
                  type='file'
                  ref={profileRef}
                  multiple={false}
                  onChange={profileHandler}
                  required>
                </input>
                {loadingProfileImage && !profileUrl && <SmallLoader></SmallLoader>}
                {!loadingProfileImage && !profileUrl && <span className='f-400 font-14'>Drag and drop files here or upload</span>}
                {profileUrl && <span className='d-flex d-justify-center mt-16 f-400 font-14'>File Uploaded Successfully : {profileUrl}</span>}
              </div>

              {/* upload cover */}
              <h5 className='f-500 l-23 mt-24'>Upload Cover Image Image</h5>
              <h6 className='mt-16 f-400'>File in JPG, PNG smaller than 10MB. Dim.(800*200)</h6>
              <div className={`mt-16 ${styles["brands-file-upload"]}`}>
                <input 
                  id='file-input-field'
                  type='file'
                  ref={profileRef}
                  multiple={false}
                  onChange={profileHandler}
                  required>
                </input>
                {loadingProfileImage && !profileUrl && <SmallLoader></SmallLoader>}
                {!loadingProfileImage && !profileUrl && <span className='f-400 font-14'>Drag and drop files here or upload</span>}
                {profileUrl && <span className='d-flex d-justify-center mt-16 f-400 font-14'>File Uploaded Successfully : {profileUrl}</span>}
              </div>
              {/* save button */}
              <div className='d-flex'>
                <button className='mt-16'>Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Brands
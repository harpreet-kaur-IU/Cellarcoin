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
  const [profileError,setProfileError] = useState(false);
  const [profile,setProfile] = useState("");
  const [profileUrl,setProfileUrl] = useState("");
  const [loadingProfileImage,setLoadingProfileImage] = useState(false);
  const profileRef = useRef();

  //cover Image States
  const [coverImageError,setCoverImageError] = useState(false);
  const [coverImage,setCoverImage] = useState("")
  const [coverUrl,setCoverUrl] = useState("");
  const [loadingCoverImage,setLoadingCoverImage] = useState(false);
  const coverRef = useRef();

  const [data,setData] = useState("")
  const [loading,setLoading] = useState(false);


  const [isBrandError,setBrandError] = useState(false);
  var JWTtoken = getOnBoardFromCookie();
  const regex = /^[^\s]+(\s+[^\s]+)*$/;
  const brandHandler = (e) =>{
    setBrand(e.target.value)
  }
  const coverHandler = (e) =>{
    if(!e.target.files[0].name.match(/\.(jpg|jpeg|png|heiv|pdf|txt)$/)){
      setCoverError(true)
    }
    else{
      setCoverError(false)
      setCover(e.target.files[0]);
    }
  }

  const profileHandler = (e) =>{
    if(!e.target.files[0].name.match(/\.(jpg|jpeg|png)$/)){
      setProfileError(true);
      var inputfile = document.getElementById("profile-input-field");
      inputfile.value = "";
    }   
    else{
      setProfileError(false);
      var fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
      var fSize =  e.target.files[0].size; 
      var i=0;
      while(fSize>900){
        fSize/=1024;
        i++;
      }
      var file = (Math.round(fSize*100)/100);
      if(i<=2 && file<10){
        setProfile(e.target.files[0])
      }
      else{
        setProfileError(true);
      }
    }   
  }

  const coverImageHandler = (e) =>{
    if(!e.target.files[0].name.match(/\.(jpg|jpeg|png)$/)){
      setCoverImageError(true);
      var inputfile = document.getElementById("profile-input-field");
      inputfile.value = "";
    }   
    else{
      setCoverImageError(false);
      var fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
      var fSize =  e.target.files[0].size; 
      var i=0;
      while(fSize>900){
        fSize/=1024;
        i++;
      }
      var file = (Math.round(fSize*100)/100);
      if(i<=2 && file<10){
        setCoverImage(e.target.files[0])
      }
      else{
        setCoverImageError(true);
      }
    }   
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

    if(profileUrl == ""){
      setProfileError(true);
    }else{
      setProfileError(false);
    }

    if(coverUrl == ""){
      setCoverImageError(true);
    }else{
      setCoverImageError(false);
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
        "documentUrl":url,
        "profileImageUrl":profileUrl,
        "coverImageUrl":coverUrl
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
            setBrand("")

            setCover("")
            setUrl("")

            setProfile("")
            setProfileUrl("")

            setCoverImage("")
            setCoverUrl("")

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
    if(profile){
      var formdata = new FormData();
      formdata.append("image",profile);
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      setLoadingProfileImage(true)
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}uploadImage`, requestOptions)
      .then(response => response.text())
      .then(result => {
        var results = (JSON.parse(result))
        setProfileUrl(results.imageUrl)
        setLoadingProfileImage(false)
      })
      .catch(error => console.log('error', error));
    }
  },[profile])

  useEffect(()=>{
    if(coverImage){
      var formdata = new FormData();
      formdata.append("image",coverImage);
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      setLoadingCoverImage(true)
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}uploadImage`, requestOptions)
      .then(response => response.text())
      .then(result => {
        var results = (JSON.parse(result))
        console.log(results.imageUrl)
        setCoverUrl(results.imageUrl)
        setLoadingCoverImage(false)
      })
      .catch(error => console.log('error', error));
    }
  },[coverImage])
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
                    {item.status === "approved" &&
                      <div className={`cusror-pointer font-14 f-500 d-flex d-justify-center ${styles["brand-approved"]}`}>
                        <span>
                          Approved
                        </span>
                      </div> 
                    }
                    {item.status === "rejected" &&
                      <div className={`cusror-pointer font-14 f-500 d-flex d-justify-center ${styles["brand-rejected"]}`}>
                        <span>
                          Rejected
                        </span>
                      </div>
                    }
                    {item.status === "pending" &&
                      <div className={`cusror-pointer font-14 f-500 d-flex d-justify-center ${styles["brand-pending"]}`}>
                        <span>
                          Pending
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
              <input value={brand} onChange={brandHandler} maxLength="60" className={`mt-16 col-12 ${styles["brands-input"]}`} type="text" required></input>
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
                  id='profile-input-field'
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
              {profileError && <h6 className={`mt-12 mb-8 font-14 f-700 text-danger`}>Please Select Valid file format.</h6>}
              {/* upload cover */}
              <h5 className='f-500 l-23 mt-24'>Upload Cover Image</h5>
              <h6 className='mt-16 f-400'>File in JPG, PNG smaller than 10MB. Dim.(800*200)</h6>
              <div className={`mt-16 ${styles["brands-file-upload"]}`}>
                <input 
                  id='cover-input-field'
                  type='file'
                  ref={coverRef}
                  multiple={false}
                  onChange={coverImageHandler}
                  required>
                </input>
                {loadingCoverImage && !coverUrl && <SmallLoader></SmallLoader>}
                {!loadingCoverImage && !coverUrl && <span className='f-400 font-14'>Drag and drop files here or upload</span>}
                {coverUrl && <span className='d-flex d-justify-center mt-16 f-400 font-14'>File Uploaded Successfully : {coverUrl}</span>}
                
              </div>
              {coverImageError && <h6 className={`mt-12 mb-8 font-14 f-700 text-danger`}>Please Select Valid file format.</h6>}
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
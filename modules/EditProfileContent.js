import React, { useEffect, useState ,useRef } from 'react'
import style from './css/EditProfileContent.module.css'
import { getUserOnBoardFromCookie } from '../auth/userCookies';
import SmallLoader from './Vendors Panel/SmallLoader';
import {useRouter} from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfileContent = () => {
  const router = useRouter();
  const userId = router.query["id"];
  const [email,setEmail] = useState("");
  const [url,setUrl] = useState("");
  const [cover,setCover] = useState("");
  const [profile,setProfile] = useState("");
  const [profileUrl,setProfileUrl] = useState("");
  const fileRef = useRef();
  const fileRef2 = useRef();
  const [imgLoading,setLoadingImg] = useState(false);
  const [imgLoading2,setLoadingImg2] = useState(false);
  const [userName,setUserName] = useState("");
  const [location,setLocation] = useState("")
  var JWTToken = getUserOnBoardFromCookie();

  useEffect(()=>{
    if(JWTToken){
      function parseJwt() {
        if (!JWTToken) {return}
        const base64Url = JWTToken.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
      }
      var user = parseJwt();
      setEmail(user.user.email) 
      setUserName(user.user.userName)
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization","Bearer "+JWTToken);
    myHeaders.append("Content-Type","application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getProfile`, requestOptions)
    .then(response => response.json())
    .then(result =>{
      console.log(result)
      setCover(result.user.coverImage)
      setUrl(result.user.coverImage)
      setProfileUrl(result.user.profileImage)
      setProfile(result.user.profileImage)
      setUserName(result.user.userName)
      setLocation(result.user.location)
    })
    .catch(error => console.log('error', error));
  },[])

  const coverHandler = (e) =>{
    setCover(e.target.files[0]);
  }
  const profileHandler = (e) =>{
    setProfile(e.target.files[0]);
  }
  const userNameHandler = (e) =>{
    setUserName(e.target.value)
  }
  const locationHandler = (e) =>{
    setLocation(e.target.value)
  }
  //cover upload
  useEffect(()=>{
    if(cover || !url){
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
    if(profile || !profileUrl){
      var formdata = new FormData();
      formdata.append("image",profile);
      
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      setLoadingImg2(true)
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}uploadImage`, requestOptions)
      .then(response => response.text())
      .then(result => {
        var results = (JSON.parse(result))
        setProfileUrl(results.imageUrl)
        setLoadingImg2(false)
      })
      .catch(error => console.log('error', error));
    }
  },[profile])
  //form submit
  const formSubmit = (e) =>{
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Authorization","Bearer "+JWTToken);
    myHeaders.append("Content-Type","application/json");

    var raw = JSON.stringify({
      "coverImage":url,
      "profileImage":profileUrl,
      "userName":userName,
      "location":location
    })

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw
    };
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/editProfile/${userId}`,requestOptions)
    .then(response => response.json())
    .then(result=>{
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getProfile`,{
        method: 'GET', 
        headers: myHeaders,
      })
      
      .then(response => response.json())
      .then(results =>{
        setUrl(results.user.coverImage)
        setProfileUrl(results.user.profileImage)
        setUserName(results.user.userName)
        setLocation(results.user.location)
        toast.success("User Updated Successfully"),{
          toastId:"2"
        }
      })
      .catch(error=>console.log("error "+error))
    })
    .catch(error=>console.log("error "+error))
  }

  return (
    <div className={`${style["edit-profile-wrapper"]}`}>
      <h4 className="f-400 l-137">You have signed in using: <span className='f-500'>{email}</span></h4>
      <h4 className={`f-400 l-137 mb-24 ${style["change-cover-text"]}`}>Change Cover picture and profile picture</h4>
      <form onSubmit={formSubmit}>
        <div className={`p-relative ${style["cover-img-wrapper"]} ${imgLoading ? style["cover-img-wrapper-opacity"]:"" }`}>
          <input 
            className='cursor-pointer'
            id='file-input-field'
            type='file'
            ref={fileRef}
            multiple={false}
            onChange={coverHandler}
            >
          </input>
          <div className={`${style["small-loader"]}`}>
            {imgLoading && <SmallLoader></SmallLoader>}
          </div>
          <img loading="lazy" className={`col-12 ${style["profile-cover-pic"]}`} src={url?url:""}/>
        </div>
        {/* <h4 className={`f-400 l-137 ${style["change-profile-pic"]}`}>Change profile picture</h4> */}
        <div className={`d-flex d-flex-row d-align-center ${style["profile-wrapper"]}`}>
          <div className={`${style["profile-img-wrapper"]} ${imgLoading2 ? style["cover-img-wrapper-opacity"]:"" }`}>
            <img loading="lazy" src={profileUrl?profileUrl:"images/profile.png"}></img>
          </div>
          <div className={`p-relative ${style["editprofile-btn-wrapper"]}`}>
            <div className={`${style["small-loader-profile"]}`}>
              {imgLoading2 && <SmallLoader></SmallLoader>}
            </div>
            <input 
              className='cursor-pointer'
              id='profile-input-field'
              type='file'
              ref={fileRef2}
              multiple={false}
              onChange={profileHandler}
              >
            </input>
            <button className={`cursor-pointer font-20 f-500 l-137 btn-primary b-none ${style["editprofile-upload-btn"]}`}>Upload new picture</button>
            {/* <button className={`cursor-pointer font-20 f-500 l-137 btn-secondary ${style["editprofile-delete-btn"]}`}>Delete</button> */}
          </div>
        </div>
      
        <div className={`${style["input-wrapper"]}`}>
          <input value={userName} onChange={userNameHandler} className={`col-12 font-20 f-500 l-137 bg-input-box b-none rounded-16 mb-24 ${style["profile-user-name"]}`} placeholder='User Name:Xyz'></input>
          <input value={location} onChange={locationHandler} className={`col-12 font-20 f-500 l-137 bg-input-box b-none rounded-16 mb-24 ${style["profile-user-name"]}`} placeholder='Location:Xyz'></input>
        </div>
        <button className={`cursor-pointer font-20 f-500 l-137 btn-primary b-none ${style["btn-save-profile"]}`}>Save Profile</button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default EditProfileContent
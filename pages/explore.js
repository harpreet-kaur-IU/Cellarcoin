import Filter from "../modules/Filter";
import Footer from "../modules/Footer";
import Newsletter from "../modules/Newsletter";
import WineCard from "../modules/WineCard";
import Base from "../layout/Base";
import React, { Fragment,useEffect, useState } from 'react'
import styles from '../modules/css/WineCard.module.css'
import Loader from "../modules/Vendors Panel/Loader";
import { getUserOnBoardFromCookie } from "../auth/userCookies";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Explore() {
    const [data,setData] = useState("")
    const [loading,setLoading] = useState(false)
    const JWTToken = getUserOnBoardFromCookie();
    
    const filterHandler = (value) =>{
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "filterName":value
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}nft/filterNFT`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        setData(result.data)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        console.log('error', error)
      });
    }

    useEffect(()=>{
      if(JWTToken){
        function parseJwt() {
          if(!JWTToken){
            return
          }
          const base64Url = JWTToken.split('.')[1];
          const base64 = base64Url.replace('-', '+').replace('_', '/');
          return JSON.parse(window.atob(base64));
        }
        var user = parseJwt();
        var userId = (user.user._id)
      }
      var myHeaders = new Headers();
      myHeaders.append("Content-Type","application/json");

      var raw = JSON.stringify({
        "user": userId
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
      };

      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getAllNft`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        setData(result.data)
        setLoading(false)
      })
      .catch(error =>{
        setLoading(false)
        toast.warning("Unable to get NFT List",{
          toastId:"1"
        });
      });
    },[])

    const favoriteHandler = (value,id) =>{
      if(JWTToken){
        function parseJwt() {
          if(!JWTToken){
            return
          }
          const base64Url = JWTToken.split('.')[1];
          const base64 = base64Url.replace('-', '+').replace('_', '/');
          return JSON.parse(window.atob(base64));
        }
        var user = parseJwt();
        var userId = (user.user._id)

        //add favourite
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+JWTToken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "favourite":value
        });
        var requestOptions = {
          method:'PATCH',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        if(value){
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/updateFavourites/${id}`, requestOptions)
          .then(response => response.text())
          .then(result =>{
            var myHeaders1 = new Headers();
            myHeaders1.append("Content-Type","application/json");

            var raw = JSON.stringify({
              "user": userId
            });

            var requestOptions = {
              method: 'POST',
              headers: myHeaders1,
              body: raw
            };

            setLoading(true)
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getAllNft`, requestOptions)
            .then(response => response.json())
            .then(result =>{
              setData(result.data)
              setLoading(false)
            })
            .catch(error => {
              setLoading(false)
              console.log('error', error)
            });
          })
          .catch(error => {
            setLoading(false)
            console.log('error', error)
          });
        }else{
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/removeItem/${id}`, requestOptions)
          .then(response => response.text())
          .then(result =>{
            var myHeaders1 = new Headers();
            myHeaders1.append("Content-Type","application/json");

            var raw = JSON.stringify({
              "user": userId
            });

            var requestOptions = {
              method: 'POST',
              headers: myHeaders1,
              body: raw
            };

            setLoading(true)
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getAllNft`, requestOptions)
            .then(response => response.json())
            .then(result =>{
              setData(result.data)
              setLoading(false)
            })
            .catch(error => {
              setLoading(false)
              console.log('error', error)
            });
          })
          .catch(error => console.log('error', error));
        }
      }else{
        toast.warning("Please sign in",{
          toastId:"2"
        });
      }
    }
    return (
        <Fragment>
            {loading && <Loader></Loader>}
            <Base>
              <div className={`container mt-144 ${styles["wine-card-page-container"]}`}>
                <Filter handler={filterHandler}></Filter>
                <div className={`d-grid grid-col-3 gap-3 ${styles["wine-card-wrapper"]}`}>
                {data && data.map((item)=>(
                  <WineCard
                    key={item._id}
                    data = {item}
                    handler = {favoriteHandler}
                  ></WineCard>
                ))}
                </div>
              </div>
              <Newsletter></Newsletter>
            </Base>
            <Footer></Footer>
            <ToastContainer/>
        </Fragment>
    );
}
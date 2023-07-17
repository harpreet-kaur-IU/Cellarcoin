import React, { Fragment,useEffect, useState } from 'react'
import Base from "../../layout/Base";
import Footer from "../../modules/Footer";
import Newsletter from "../../modules/Newsletter";
import WineCard from "../../modules/WineCard";
import WineCollection from "../../modules/WineCollection";
import { useRouter } from 'next/router'
import styles from '../../modules/css/WineCollection.module.css'
import { getUserOnBoardFromCookie } from '../../auth/userCookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../modules/Vendors Panel/Loader';
export default function Profile() {
    const router = useRouter();
    // const [data,setData] = useState("")
    const nftId = router.query["id"];
    const [nft,setNft] = useState("")
    const [userId,setUserId] = useState("")
    const [loading,setLoading] = useState(false)
    const JWTtoken = getUserOnBoardFromCookie();
    useEffect(()=>{
        if(JWTtoken){
            function parseJwt() {
            if (!JWTtoken) {return}
                const base64Url = JWTtoken.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                return JSON.parse(window.atob(base64));
            }
            var user = parseJwt();
            var id=user.user._id;
            setUserId(id)
        }
        //get nft by brand
        if(nftId){
            getNFTByBrand(nftId,id)
        }
    },[nftId])

    const getNFTByBrand = (nftId,id) =>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type","application/json");

        var raw = JSON.stringify({
            "brandId":nftId,
            "userId": id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getNftByBrand`, requestOptions)
        .then(response => response.text())
        .then(result => {
            const parseResult = JSON.parse(result)
            setNft(parseResult.data)
            setLoading(false)
        })
        .catch(error => {
            setLoading(false)
            console.log('error', error)
        });
    }

    const favoriteHandler = (value,id) =>{

        if(JWTtoken){  
          //add favourite
          var myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer "+JWTtoken);
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
            setLoading(true);
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/updateFavourites/${id}`, requestOptions)
            .then(response => response.text())
            .then(result =>{
                getNFTByBrand(nftId,id)
            })
            .catch(error => {
                console.log('error', error)
                setLoading(false)
            });
          }else{
            setLoading(true)
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/removeItem/${id}`, requestOptions)
            .then(response => response.text())
            .then(result =>{
                getNFTByBrand(nftId,id)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log('error', error)
            });
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
            <ToastContainer></ToastContainer>
            <Base> 
                <WineCollection></WineCollection>
                <div className={`container mt-40 ${styles["profile-card-container"]}`}>
                    <div className={`d-grid grid-col-3 gap-3 ${styles["profile-card-wrapper"]}`}>
                        {nft && nft.map((item,index)=>(
                            <WineCard
                                key={index}
                                data={item}
                                handler={favoriteHandler}
                            ></WineCard>
                        ))}
                    </div>
                </div>
                <Newsletter></Newsletter>
            </Base>
           <Footer></Footer>
        </Fragment>
    );
}
import React, { Fragment,useEffect, useState } from 'react'
import Base from "../../layout/Base";
import Footer from "../../modules/Footer";
import Newsletter from "../../modules/Newsletter";
import WineCard from "../../modules/WineCard";
import WineCollection from "../../modules/WineCollection";
import { useRouter } from 'next/router'
import styles from '../../modules/css/WineCollection.module.css'
import { getUserOnBoardFromCookie } from '../../auth/userCookies';
export default function Profile() {
    const router = useRouter();
    // const [data,setData] = useState("")
    const nftId = router.query["id"];
    const [nft,setNft] = useState("")
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
        }
        //get nft by brand
        if(nftId){
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

            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getNftByBrand`, requestOptions)
            .then(response => response.text())
            .then(result => {
                const parseResult = JSON.parse(result)
                setNft(parseResult.data)
            })
            .catch(error => console.log('error', error));
        }
    },[nftId])
    return (
        <Fragment>  
            <Base> 
                <WineCollection></WineCollection>
                <div className={`container mt-40 ${styles["profile-card-container"]}`}>
                    <div className={`d-grid grid-col-3 gap-3 ${styles["profile-card-wrapper"]}`}>
                        {nft && nft.map((item)=>(
                            <WineCard
                                key={item._id}
                               data={item}
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
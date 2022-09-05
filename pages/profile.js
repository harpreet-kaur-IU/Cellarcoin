import React, { Fragment,useEffect, useState } from 'react'
import Base from "../layout/Base";
import Footer from "../modules/Footer";
import Newsletter from "../modules/Newsletter";
import WineCard from "../modules/WineCard";
import WineCollection from "../modules/WineCollection";
import styles from '../modules/css/WineCollection.module.css'
export default function Profile() {
    const [data,setData] = useState("")
    useEffect(()=>{
      var myHeaders = new Headers();
      myHeaders.append("Content-Type","application/json");
  
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getPremiumNft`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        setData(result.data)
      })
      .catch(error => console.log('error', error));
    },[])
    return (
        <Fragment>  
            <Base>
                <WineCollection></WineCollection>
                <div className={`container mt-40 ${styles["profile-card-container"]}`}>
                    <div className={`d-grid grid-col-3 gap-3 ${styles["profile-card-wrapper"]}`}>
                        {data && data.map((item)=>(
                            <WineCard
                                price={item.price}
                                favourites={item.favourites}
                                views={item.views}
                                imageUrl={item.imageUrl}
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
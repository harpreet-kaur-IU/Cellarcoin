import Filter from "../modules/Filter";
import Footer from "../modules/Footer";
import Newsletter from "../modules/Newsletter";
import WineCard from "../modules/WineCard";
import Base from "../layout/Base";
import React, { Fragment,useEffect, useState } from 'react'
import styles from '../modules/css/WineCard.module.css'
export default function Explore() {
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
                <div className={`container mt-144 ${styles["wine-card-page-container"]}`}>
                    <Filter></Filter>
                    <div className={`d-grid grid-col-3 gap-3 ${styles["wine-card-wrapper"]}`}>
                    {data && data.map((item)=>(
                        <WineCard
                            key={item.key}
                            id={item._id}
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
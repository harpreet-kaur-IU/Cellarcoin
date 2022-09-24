import React, { Fragment,useEffect, useState } from 'react'
import Base from "../../layout/Base";
import BackgroundImageBanner from "../../modules/BackgroundImageBanner";
import Footer from "../../modules/Footer";
import MarketPlaceBanner from "../../modules/MarketPlaceBanner";
import Newsletter from "../../modules/Newsletter";
import WineCard from "../../modules/WineCard";
import styles from '../../modules/css/MarketPlaceBanner.module.css'
import Loader from '../../modules/Vendors Panel/Loader';
export default function Purple() {
    const [data,setData] = useState("")
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
      var myHeaders = new Headers();
      myHeaders.append("Content-Type","application/json");
  
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getPremiumNft`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        setData(result.data)
        setLoading(false)
      })
      .catch(error => console.log('error', error));
    },[])
    return (
        <Fragment>  
            {loading && <Loader></Loader>}
            <Base>
                <MarketPlaceBanner></MarketPlaceBanner>
                <div className={`container ${styles["purple-market-container"]}`}>
                    <div className={`d-grid grid-col-3 gap-3 ${styles["purple-market-card-wrapper"]}`}>
                        {data && data.map((item)=>(
                            <WineCard
                                key={item.key}
                                name={item.name}
                                id={item._id}
                                price={item.price}
                                favourites={item.favourites}
                                views={item.views}
                                imageUrl={item.imageUrl}
                            ></WineCard>
                        ))}
                    </div>
                </div>
                <BackgroundImageBanner></BackgroundImageBanner>
                <Newsletter></Newsletter>
            </Base>
            <Footer></Footer>
        </Fragment>
    );
}
import Filter from "../modules/Filter";
import Footer from "../modules/Footer";
import Newsletter from "../modules/Newsletter";
import WineCard from "../modules/WineCard";
import Base from "../layout/Base";
import React, { Fragment,useEffect, useState } from 'react'
import styles from '../modules/css/WineCard.module.css'
import Loader from "../modules/Vendors Panel/Loader";
export default function Explore() {
    const [data,setData] = useState("")
    const [loading,setLoading] = useState(false)
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
      .then(response => response.text())
      .then(result =>{
          const parseResult = JSON.parse(result)
          setData(parseResult.data)
          setLoading(false)
      })
      .catch(error => console.log('error', error));
    }
    useEffect(()=>{
      var myHeaders = new Headers();
      myHeaders.append("Content-Type","application/json");
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
      };
      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getAllNft`, requestOptions)
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
                <div className={`container mt-144 ${styles["wine-card-page-container"]}`}>
                    <Filter handler={filterHandler}></Filter>
                    <div className={`d-grid grid-col-3 gap-3 ${styles["wine-card-wrapper"]}`}>
                    {data && data.map((item)=>(
                        <WineCard
                          key={item._id}
                          data = {item}
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
import React, { useEffect, useState }  from 'react'
import Header from './Header'
import styles from '.././css/Vendor Panel/Dashboard.module.css'
import {getOnBoardFromCookie} from '../../auth/userCookies';
import Loader from './Loader';
import {useRouter} from 'next/router'
import Moment from 'react-moment';
import DashboardCards from './DashboardCards';
import TopPerformingNFT from './TopPerformingNFT';
import NewNFTTable from './NewNFTTable';
const Dashboard = () => {
  // const[data,setData] = useState('');
  const [topNft,setTopNft] = useState("");
  const[dashboard,setDashboard] = useState('');
  const[nft,setNft] = useState('')
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  var JWTtoken = getOnBoardFromCookie();

  useEffect(()=>{
    if(JWTtoken){
      getDashboardStats()
      getNewNFT()
      topPerformingNFT()
    }else{
      router.push("/vendorlogin")
    }
  
  },[])


  /**
   * This function is responsible for calling dashboard stats API
   * and we are using this in dashboard cards
   */
  const getDashboardStats = ( ) =>{
      var myHeaders = new Headers();
      myHeaders.append("Authorization","Bearer "+JWTtoken);
      myHeaders.append("Content-Type","application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders
      };

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/dashboard?brandId=null`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        setDashboard(result)
      })
      .catch(error => console.log('error', error));
  }

  /**
   * This function will fetch the new nft via getlatestNft APi call
   * we are passing this data to NewNFTTable componet
   */
  const getNewNFT = () =>{
      var myHeaders = new Headers();
      myHeaders.append("Authorization","Bearer "+JWTtoken);
      myHeaders.append("Content-Type","application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders
      };

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/getLatestNft`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        setNft(result.nft)
      })
      .catch(error => console.log('error', error));
  }

  /**
   * This method is used to call top performing nft 
   * that we are passing to top performing nft component
   */
  const topPerformingNFT = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization","Bearer "+JWTtoken);
    myHeaders.append("Content-Type","application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}nft/topPerformingNFT`, requestOptions)
    .then(response => response.text())
    .then(result => {
      const parseResult = JSON.parse(result)
      setTopNft(parseResult.data)
      setLoading(false)
      
    })
    .catch(error =>{
      setLoading(false)
    });
  }

  return (
    <>
      <Header></Header>
      {loading && <Loader></Loader>}
      <div className={`vendor-container ${styles["dashboard-container"]}`}>
        <h4 className='l-50 f-600 text-primary mt-24'>Dashboard</h4>
        <div className='d-flex d-flex-wrap gap-2 mt-24'>
          <DashboardCards icon="images/ic_deals.png" count={dashboard.totalNft} title="Total NFTs"></DashboardCards>
          <DashboardCards icon="images/ic_account.png" count={dashboard.totalVolume} title="Total Volume"></DashboardCards>
          <DashboardCards icon="images/ic_trending_up.png" count="0" title="Monthy Sales"></DashboardCards>
          <DashboardCards icon="images/ic_send.png" count={dashboard.totalEarnings} title="Total Earnings"></DashboardCards>
        </div>
        <div className={`d-flex ${styles["nfts-wrapper"]}`}>
          <TopPerformingNFT topNft={topNft}></TopPerformingNFT>
         
          <NewNFTTable nft={nft}></NewNFTTable>
         
        </div>
      </div>
    </>
  )
}

export default Dashboard
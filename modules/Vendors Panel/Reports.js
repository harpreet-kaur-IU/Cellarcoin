import React, { useEffect, useState }  from 'react'
import dynamic from 'next/dynamic';
import styles from '.././css/Vendor Panel/Dashboard.module.css'
import Header from './Header'
import {getOnBoardFromCookie} from '../../auth/userCookies';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/router'
import DashboardCards from './DashboardCards';
import TopPerformingNFT from './TopPerformingNFT';
import NewNFTTable from './NewNFTTable';
import StatusDropdown from '../StatusDropdown';
const Reports = () => {
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
  const [sales,setSales] = useState("")
  const [topNft,setTopNft] = useState("");
  const[dashboard,setDashboard] = useState('');
  const[nft,setNft] = useState('')
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  var JWTtoken = getOnBoardFromCookie();

  useEffect(()=>{
    if(JWTtoken){
      salesGraph()
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

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}vendor/dashboard`, requestOptions)
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
    .then(response => response.json())
    .then(result => {
      setTopNft(result.data)
      setLoading(false)
    })
    .catch(error =>{
      setLoading(false)
    });
  }

const statusHandler = (val) =>{
  // if(nftId){
  //     var myHeaders = new Headers();
  //     myHeaders.append("Content-Type","application/json");

  //     var requestOptions = {
  //         method: 'GET',
  //         headers: myHeaders,
  //         redirect: 'follow'
  //     };
  //     setLoading(true)
  //     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getTransaction?nftId=${nftId}&status=${val}`, requestOptions)
  //     .then(response => response.text())
  //     .then(result => {
  //         const parseResult = JSON.parse(result)
  //         setActivity(parseResult.data)
  //         setLoading(false)
  //     })
  //     .catch(error => console.log('error', error));
  // }
}



const salesGraph = () =>{
  let arr= ["mon","tue","wed","thu","fri","sat","sun"]
  let arra= ["10","40","56","60","20","66","70"];

  setSales({
    options : {
      colors:["#3085F4","#3085F4"],
      chart: {
        id: "simple-chart",
        minHeight:"300px"
      },
      name: "Sales Graph",
      xaxis: {
        categories: arr//will be displayed on the x-asis
    }},
    series : [
    {
      name: "Visited Date", //will be displayed on the y-axis
      data:arra
    }]
  })
}
  return (
    <>
      <Header></Header>
      {loading && <Loader></Loader>}
        <div className={`vendor-container ${styles["dashboard-container"]}`}>
            <h4 className='l-50 f-600 text-primary mt-24'>Reports</h4>
            <div className='d-flex d-flex-wrap gap-2 mt-24'>
              <DashboardCards icon="images/ic_deals.png" count={dashboard.totalNft} title="Total NFTs"></DashboardCards>
              <DashboardCards icon="images/ic_account.png" count={dashboard.totalVolume} title="Total Volume"></DashboardCards>
              <DashboardCards icon="images/ic_trending_up.png" count="0" title="User Conversion"></DashboardCards>
              <DashboardCards icon="images/ic_send.png" count={dashboard.totalEarnings} title="Total Earnings"></DashboardCards>
            </div>
            <div className={`d-flex ${styles["nfts-wrapper"]}`}>
              <div className={`col-4 ${styles["new-nfts-wrapper"]}`}>
                <div className='d-flex d-flex-column d-align-center gap-1'>
                  <h5 className='f-600'>Visitor Frequency</h5>
                  <h6 className='text-primary f-600'>Average</h6>
                </div>
              </div>
              <div className={`col-8 p-20 ${styles["top-nfts-wrapper"]}`}>
                <div className='d-flex d-justify-space-between'>
                  <h5 className='f-600'>Sales</h5>
                  <div className='p-relative'>
                    <StatusDropdown placeholder="Daily" type="filter" icon={true} handler={statusHandler}></StatusDropdown>
                  </div>
                </div>
                {sales && <Chart height="328" options={sales.options} series={sales.series} type="bar" />}
              </div>
            </div>
            <div className={`d-flex ${styles["nfts-wrapper"]}`}>
              <TopPerformingNFT topNft={topNft}></TopPerformingNFT>
              <NewNFTTable nft={nft}></NewNFTTable>
            </div>
        </div>
    </>
  )
}

export default Reports
import {useEffect, useState} from 'react'
import { getUserOnBoardFromCookie } from '../auth/userCookies';
import style from './css/WineCollection1.module.css'
import NFTCard from './NFTCard';
import UserNftCards from './UserNftCards';
import UserTable from './UserTable';
import Loader from './Vendors Panel/Loader';
import WineCard from './WineCard';
const UserNft = () => {
    const [data,setData] = useState("");
    const [fav,setFav] = useState("");
    const [onSale,setOnSale] = useState("");
    const [activity,setActivity] = useState("");
    const [user,setUser] = useState("");
    const [activeTab, setActiveTab] = useState("tab1");
    const[loading,setLoading] = useState(false)
    const[walletAddress,setWalletAddress] = useState("")
    const JWTToken = getUserOnBoardFromCookie();
    const handleClick = (e) => {
        setActiveTab(e.target.id);
    };

    async function getAddress() {
        // const ethers = require("ethers");
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();
        // const addr = await signer.getAddress();
        // setWalletAddress(addr)
    }

    useEffect(()=>{
        //fetch user name from jwt token
        getAddress()
        function parseJwt() {
            if (!JWTToken) {return}
            const base64Url = JWTToken.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        }
        var user = parseJwt();
        setUser(user.user.name)

        //get collection list API
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+JWTToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getCollection`, requestOptions)
        .then(response => response.text())
        .then(result => {
            const parseResult = JSON.parse(result)
            setData(parseResult.nft[0].nftId)
            setLoading(false)
        })
        .catch(error => console.log('error', error));

        //get favorite nft API
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+JWTToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getFavourites`, requestOptions)
        .then(response => response.text())
        .then(result => {
            const parseResult = JSON.parse(result)
            setFav(parseResult.favourites)
            setLoading(false)
        })
        .catch(error => console.log('error', error));

        //get onsale nft API
        var myHeaders = new Headers();
        myHeaders.append("Authorization","Bearer "+JWTToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/userOnSale`, requestOptions)
        .then(response => response.text())
        .then(result => {
            const parseResult = JSON.parse(result)
            setOnSale(parseResult.data)
            setLoading(false)
        })
        .catch(error => console.log('error', error));

        //get activity nft API
        var myHeaders = new Headers();
        myHeaders.append("Authorization","Bearer "+JWTToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/userOnSale`, requestOptions)
        .then(response => response.text())
        .then(result => {
            const parseResult = JSON.parse(result)
            setActivity(parseResult)
            setLoading(false)
        })
        .catch(error => console.log('error', error));
    },[])

    const getFavourites = () =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+JWTToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/getFavourites`, requestOptions)
        .then(response => response.text())
        .then(result => {
            const parseResult = JSON.parse(result)
            setFav(parseResult.favourites)
            setLoading(false)
        })
        .catch(error => console.log('error', error));
    }

    const addFavouriteHandler = (value,id) =>{
        if(JWTToken){  
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
            .then(response => response.json())
            .then(result =>{
                getFavourites()
            })
            .catch(error => console.log('error', error));
          }else{
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/removeItem/${id}`, requestOptions)
            .then(response => response.json())
            .then(result =>{
                getFavourites()
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
    <>
        {loading && <Loader></Loader>}
        <div className={`container ${style["wine-collection-container"]}`}>
            <div className={`d-flex d-flex-column d-justify-start ${style["wine-collection-bg"]}`}>
                <div className={`${style["wine-collection-circle-img"]}`}>
                    <img src="images/wine-collection-circle.png"></img>
                </div>
            </div>
            <div className={`d-flex col-12 ${style["user-details"]}`}>
                <div className={`col-3 d-flex d-flex-column d-align-center gap-2 ${style["user-details-col-3"]}`}>
                    <div className={`d-flex d-flex-column gap-2 ${style["user-name-wallet-address"]}`}>
                        <h3 className={`text-center cursor-pointer f-700 l-137`}>{user}</h3>
                        <div className={`d-flex d-align-center gap-1`}>
                            <img src='images/polygon-icon.svg'></img>
                            <h5 className='font-16 f-400 l-137 word-break'>{walletAddress}</h5>
                        </div>
                    </div>
                    {/* <h5 className='text-center f-400 l-137'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis pretium dui, commodo sed id nunc vel pharetra.
                    </h5> */}
                </div>
                <div className={`offset-1 col-8 ${style["wine-tabs-col"]}`}>
                    <div className={`d-flex ${style["tabs-wrapper"]}`}>
                        <h3 onClick={handleClick} id="tab1" className={`cursor-pointer text-dark-gray font-24 f-500 l-137 ${activeTab === "tab1" ? style["active"] : ""} `}>Collection</h3>
                        <h3 onClick={handleClick} id="tab2" className={`cursor-pointer text-dark-gray font-24 f-500 l-137 ${activeTab === "tab2" ? style["active"] : ""} `}>On Sale</h3>
                        <h3 onClick={handleClick} id="tab3" className={`cursor-pointer text-dark-gray font-24 f-500 l-137 ${activeTab === "tab3" ? style["active"] : ""} `}>Favourites</h3>
                        <h3 onClick={handleClick} id="tab4" className={`cursor-pointer text-dark-gray font-24 f-500 l-137 ${activeTab === "tab4" ? style["active"] : ""} `}>Activity</h3>
                    </div>
                </div>
            </div>
            <>
                {/* <Filter></Filter> */}
                {activeTab == "tab1" &&
                    <div className={`offset-4 col-8 d-grid grid-col-2 gap-3 ${style["wine-tab-1"]}`}>
                       {data && data.map((item)=>(
                            <NFTCard
                                data={item}
                                key = {item._id}
                                status="Sell NFT"
                            />
                       ))}
                    </div>
                }
                {activeTab == "tab2" &&
                    <div className={`offset-4 col-8 d-grid grid-col-2 gap-3 ${style["wine-tab-2"]}`}>
                        {onSale && onSale.map((item)=>(
                            <WineCard data={item} key = {item._id}></WineCard>
                        ))}
                    </div>
                }
                {activeTab == "tab3" &&
                    <div className={`offset-4 col-8 d-grid grid-col-2 gap-3 ${style["wine-tab-2"]}`}>
                        {fav && fav.map((item)=>(
                            <WineCard handler={addFavouriteHandler} data={item.nftId} key = {item._id}></WineCard>
                        ))}
                    </div>
                }
                {activeTab == "tab4" &&
                     <>
                     <div className={`offset-4 col-8 ${style["wine-tab-3"]}`}>
                        <UserNftCards></UserNftCards>
                     </div>
                     <UserTable></UserTable>
                 </>
                }
            </>
        </div>
    </>
  )
}

export default UserNft
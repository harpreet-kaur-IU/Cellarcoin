import React, { Component, useEffect, useState ,useRef} from 'react'
import styles from '.././css/Vendor Panel/SideBar.module.css'
import Close from '../../icons/close'
import Menu from '../../icons/menu'
import Link from 'next/link'
import Router from 'next/router'
import useFirebaseAuth from '../../auth/useFirebaseAuth'
import { ethers } from "ethers";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import {getOnBoardFromCookie,removeOnBoardCookie} from '../../auth/userCookies';
import Web3Modal from "web3modal";
import { providers } from "ethers";

function useOutsideAlerter(ref,handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Header = (props) => {
  const wrapperRef = useRef(null);
  const handler = ()=>{
    setDropdown(false)
  }
  useOutsideAlerter(wrapperRef,handler);
  const [dropdown,setDropdown] = useState(false);
  const [user,setUser] = useState("");

  const dropdownHandler = () =>{
    setDropdown(!dropdown)
  }
  const createNftNavigation = ()=>{
    Router.push("/createnft")
  }
  const sideBarHandler = (e) => {
    e.currentTarget.classList.toggle(styles["open"]);
    console.log("Sidebar = "+styles["sidebar-wrapper"]);
    document.querySelector(`#sidebar-wrapper`).classList.toggle(styles["expand"])
    document.querySelector(`#sidebar-wrapper`).classList.toggle(styles["sidebar-wrapper"])
  }
  const profileHandler = () =>{
    Router.push("/multivendor");
  }
  const {signOut} = useFirebaseAuth();
  const logOutHandler = () => {
    signOut()
    .then(()=>{
      removeOnBoardCookie();
      Router.push("/vendorlogin");
    })
    .catch((error)=>console.log("error while logout"))
  }
  
  var JWTtoken = getOnBoardFromCookie();
  useEffect(()=>{
    if(JWTtoken){
      function parseJwt() {
        if (!JWTtoken) {return}
        const base64Url = JWTtoken.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
      }
      var user = parseJwt();
      setUser(user.user.name)
    }else{
      Router.push("/vendorlogin")
    }
    
  },[])

  const [connectedWallet, setConnectedWallet] = useState(false);
  const web3ModalRef = useRef(); // return the object with key named current

  // providers and signer  =>
  // providers is used for to get data from sc
  // signer is used for to sign data / set the data to sc

  const getSignerOrProvider = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      alert("Polygon Network");
      throw new Error("Change network to Rinkeby");
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return provider;
  };

  const connectWallet = async () => {
    try {
      await getSignerOrProvider();
      setConnectedWallet(true);
    } catch (error) {
      console.log(" error", error);
    }
  };

  useEffect(() => {
    web3ModalRef.current = new Web3Modal({
      network: "rinkeby",
      providerOptions: {},
    });
  }, []);







  // //web3 modal
  // let web3Modal;
  // const providerOptions = {
  //   coinbasewallet: {
  //     package: CoinbaseWalletSDK, // Required
  //     options: {
  //       appName: "My Awesome App", // Required
  //       infuraId: "INFURA_ID", // Required
  //       rpc: "", // Optional if `infuraId` is provided; otherwise it's required
  //       chainId: 1, // Optional. It defaults to 1 if not provided
  //       darkMode: false // Optional. Use dark theme, defaults to false
  //     }
  //   }
  // };

  // if (typeof window !== "undefined") {
  //   web3Modal = new Web3Modal({
  //     cacheProvider: false,
  //     providerOptions, // required
  //   });
  // }

  // const [isConnected, setIsConnected] = useState(false);
  // const [hasMetamask, setHasMetamask] = useState(false);
  // const [signer, setSigner] = useState(false);

  // useEffect(() => {
  //   if (typeof window.ethereum !== "undefined"){
  //     setHasMetamask(true);
  //   }
  // });

  // useEffect(()=>{
  //   if(signer){
  //     props.signerData(signer)
  //   }
  // },[signer])

  // async function connect(){
  //   if(typeof window.ethereum !== "undefined"){
  //     try{
  //       const web3ModalProvider = await web3Modal.connect();
  //       setIsConnected(true);
  //       const provider = new ethers.providers.Web3Provider(web3ModalProvider);
  //       setSigner(provider.Signer());
  //       // localStorage.removeItem('signerWeb3');
  //       // localStorage.setItem('signerWeb3',JSON.stringify(provider.getSigner()))
  //     }catch(e){
  //       console.log(e);
  //     }
  //   }else{
  //     setIsConnected(false);
  //   }
  // }

  // async function execute() {
  //   if (typeof window.ethereum !== "undefined") {
  //     const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  //     const contract = new ethers.Contract(contractAddress, abi, signer);
  //     try {
  //       await contract.store(42)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     console.log("Please install MetaMask");
  //   }
  // }
  // provider.on("accountsChanged", (accounts: string[]) => {
  //   console.log(accounts);
  // });
  return (
    <div className={`p-relative d-flex d-align-center d-justify-space-between ${styles["header-wrapper"]}`}>
        <div role="button" onClick={sideBarHandler} className={`${styles["bar-cross"]}`}>
            <Menu></Menu>
            <Close></Close>
        </div>
        <div className={`d-flex d-align-center d-justify-space-between col-12 ${styles["header-bar-wrapper"]}`}>
          {/* <div className={`d-flex d-align-center rounded-16 ${styles['header-search-box']}`}>
            <img src='images/search-icon-v.png'></img>
            <form>
              <input className='col-12' type="text" placeholder='Search' />
            </form>
          </div> */}
          <div className='p-relative d-flex d-align-center gap-3'>
            {/* <button onClick={dropdownHandler} className={`cursor-pointer ${styles["header-buttons"]}`}>Connect Wallet</button> */}
              {/* <WagmiConfig client={wagmiClient} />
              <RainbowKitProvider chains={chains} theme={lightTheme({
                accentColor:'#780543',
                accentColorForeground:'white',
                borderRadius:'small',
                fontStack:'system',
              })}/>
              <ConnectButton />
              <RainbowKitProvider />
              <WagmiConfig /> */}

              {/* <div>
                {hasMetamask ? (
                  isConnected ? (
                    "Connected! "
                  ) : (
                    <>
                      <button className={`cursor-pointer ${styles["header-buttons"]}`} onClick={() => connect()}>Connect Wallet</button>
                      <div className={`d-none cursor-pointer ${styles["header-buttons-icon"]}`} onClick={() => connect()}>
                        <img className='rounded-16 cursor-pointer' src='images/web3-wallet-icon.svg'></img>
                      </div>
                    </>
                  )
                ) : (
                  "Please install metamask"
                )}
                {isConnected ? <button onClick={() => execute()}>Execute</button> : ""}
              </div> */}
              {connectedWallet ?
                <div className="text-center">
                  <button className={`cursor-pointer ${styles["header-buttons"]}`} onClick={connectWallet}>Connected</button>
                </div>
                :
                <div className="text-center">
                  <button className={`cursor-pointer ${styles["header-buttons"]}`} onClick={connectWallet}>Connect</button>
                </div>
              }
              <button onClick={createNftNavigation} className={`cursor-pointer ${styles["header-buttons"]}`}>
                Create NFT
              </button>
              <Link href="/vendorNotification"><img className={`rounded-16 cursor-pointer ${styles["header-notification-icon"]}`} src='images/Notifications.png'></img></Link>
              <div className={`d-flex d-align-center gap-1 ${styles["header-profile-wrapper"]}`}>
                {/* <img className='cursor-pointer rounded-16' src='\``mages/our-pillars-1.png'></img> */}
                <h6 className='font-14 f-500 l-19'>{user}</h6>
                <img onClick={dropdownHandler} className='cursor-pointer rounded-16' src='images/arrow-down.png'></img>
              </div>
              {dropdown && 
                <div ref={wrapperRef} className={`p-absolute d-flex d-flex-column d-align-center ${styles["profile-dropdown"]}`}>
                  <h6 onClick={profileHandler} className='d-flex d-align-center d-justify-center font-14 f-500 l-22'>Profile</h6>
                  <h6 onClick={logOutHandler} className='d-flex d-align-center d-justify-center font-14 f-500 l-22'>Log Out</h6>
                </div>
              }
          </div>
        </div>
        {/* {dropdown && 
          <div className={`p-absolute ${styles["wallet-dropdown"]}`}>
            <div className='d-flex d-justify-space-between'>
              <h6 className='f-600 l-22'>Connect Wallet</h6>
              <img onClick={dropdownHandler} className={`cursor-pointer ${styles["wallet-cross"]}`} src='images/wallet-cross.png'></img>
            </div>
            <div className={`d-flex d-flex-column ${styles["wallet-items-wrapper"]}`}>
              <div className={`d-flex d-align-center d-justify-space-between ${styles["wallet-items"]}`}>
                <h6 className='font-14 f-400 l-22'>Meta Mask</h6>
                <img src='images/MetaMask.png'></img>
              </div>
              <div className={`d-flex d-align-center d-justify-space-between ${styles["wallet-items"]}`}>
                <h6 className='font-14 f-400 l-22'>WalletConnect</h6>
                <img src='images/wallet-connect.png'></img>
              </div>
              <div className={`d-flex d-align-center d-justify-space-between ${styles["wallet-items"]}`}>
                <h6 className='font-14 f-400 l-22'>Coinbase Wallet</h6>
                <img src='images/coin-base.png'></img>
              </div>
            </div>
          </div>
        } */}
    </div>
  )
}
export default Header
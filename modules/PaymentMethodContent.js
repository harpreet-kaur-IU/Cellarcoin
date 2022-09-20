import React, { useEffect, useState } from 'react'
import style from "./css/PaymentMethodContent.module.css"
import { ethers } from "ethers";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Web3Modal from "web3modal";
const PaymentMethodContent = () => {
    // connect wallet web3 code starts here
    let web3Modal;
    const providerOptions = {
      coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
          appName: "My Awesome App", // Required
          infuraId: "INFURA_ID", // Required
          rpc: "", // Optional if `infuraId` is provided; otherwise it's required
          chainId: 1, // Optional. It defaults to 1 if not provided
          darkMode: false // Optional. Use dark theme, defaults to false
        }
      }
    };
  
    if (typeof window !== "undefined") {
      web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions, // required
      });
    }
  
    const [isConnected, setIsConnected] = useState(false);
    const [hasMetamask, setHasMetamask] = useState(false);
    const [signer, setSigner] = useState(false);
  
    useEffect(() => {
      if (typeof window.ethereum !== "undefined") {
        setHasMetamask(true);
      }
    });
  
    // useEffect(()=>{
    //   if(signer){
    //     props.signerData(signer)
    //   }
    // },[signer])
    async function connect() {
      if (typeof window.ethereum !== "undefined") {
        try {
          const web3ModalProvider = await web3Modal.connect();
          setIsConnected(true);
          const provider = new ethers.providers.Web3Provider(web3ModalProvider);
          setSigner(provider.getSigner());
          // localStorage.removeItem('signerWeb3');
          // localStorage.setItem('signerWeb3',JSON.stringify(provider.getSigner()))
        } catch (e) {
          console.log(e);
        }
      } else {
        setIsConnected(false);
      }
    }
  
    async function execute() {
      if (typeof window.ethereum !== "undefined") {
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
          await contract.store(42)
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Please install MetaMask");
      }
    }
  // connect wallet web3 code ends here
  return (
    <div className={` ${style["payment-method-wrapper"]}`}>
        <div className='text-center'>
          <div>
            {hasMetamask ? (
              isConnected ? (
                ""
              ) : (
                <>
                  <button className={`b-nonecursor-pointer mt-40 btn-primary b-none font-20 f-500 l-137 ${style["connect-wallet-btn"]}`} onClick={() => connect()}>Connect to Wallet</button>
                  {/* <div className={`cursor-pointer d-none ml-32 ${style["connect-wallet-icon"]}`} onClick={() => connect()}>
                    <img className='rounded-16 cursor-pointer' src='images/web3-wallet-icon.svg'></img>
                  </div> */}
                </>
              )
            ) : (
              "Please install metamask"
            )}
            {isConnected ? <button className={`b-none cursor-pointer mt-40 btn-primary b-none font-20 f-500 l-137 ${style["connect-wallet-btn"]}`} onClick={() => execute()}>Connected</button> : ""}
          </div>
          {/* <button className={`cursor-pointer mt-40 btn-primary b-none font-20 f-500 l-137 ${style["connect-wallet-btn"]}`}>Connect to Wallet</button> */}
        </div>
        <h3 className='f-500 l-137'>Connected Wallet</h3>
    </div>
  )
}

export default PaymentMethodContent
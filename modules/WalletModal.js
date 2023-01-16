import React  from 'react'
import style from './css/WalletModal.module.css'
const WalletModal = ({setToggle2}) => {
    const handleClick3 = () =>{
        setToggle2(prev => !prev);
    }
    
  return (
    <div className={`p-absolute bg-pink rounded-16 ${style["modal-wrapper"]}`}>
        <img onClick={handleClick3} className={`d-block ${style["modal-cross-btn"]}`} src='images/cross.png'></img>
        <img className={`${style["modal-site-logo"]}`} src="images/site-logo.png"></img>
        <h3 className='mt-25 font-31 f-500 l-137 text-center'>Connect Wallet</h3>
        <div className={`${style["modal-content"]}`}>
            <div className={`col-12 bg-active d-flex d-flex-row d-align-center d-justify-space-between ${style["modal-content-items"]}`}>
                <h4 className='font-26 f-400 l-137'>MetaMask</h4>
                <img src='images/MetaMask.png'></img>
            </div>
            <div className={`mt-24 bg-active d-flex d-flex-row d-align-center d-justify-space-between ${style["modal-content-items"]}`}>
                <h4 className='font-26 f-400 l-137'>WalletConnect</h4>
                <img src='images/wallet-connect.png'></img>
            </div>
            <div className={`mt-24 bg-active d-flex d-flex-row d-align-center d-justify-space-between ${style["modal-content-items"]}`}>
                <h4 className='font-26 f-400 l-137'>Coinbase Wallet</h4>
                <img src='images/coin-base.png'></img>
            </div>
            <div className={`mt-24 bg-dark-active d-flex d-flex-row d-align-center d-justify-space-between ${style["modal-content-items"]}`}>
                <h4 className='font-26 f-400 l-137'>Portis</h4>
                <img src='images/portis.png'></img>
            </div>
            <div className={`mt-24 bg-active d-flex d-flex-row d-align-center d-justify-space-between ${style["modal-content-items"]}`}>
                <h4 className='font-26 f-400 l-137'>Fortmatic</h4>
                <img src='images/fort.png'></img>
            </div>
        </div>
    </div>
  )
}

export default WalletModal
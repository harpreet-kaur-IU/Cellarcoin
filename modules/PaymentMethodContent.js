import React from 'react'
import style from "./css/PaymentMethodContent.module.css"
const PaymentMethodContent = () => {
  return (
    <div className={` ${style["payment-method-wrapper"]}`}>
        <h3 className='f-500 l-137'>Connected Wallet</h3>
        <div className='text-center'>
          <button className={`cursor-pointer mt-40 btn-primary b-none font-20 f-500 l-137 ${style["connect-wallet-btn"]}`}>Connect to Wallet</button>
        </div>
    </div>
  )
}

export default PaymentMethodContent
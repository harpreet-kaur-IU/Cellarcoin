import React from 'react'
import PaymentMethodContent from './PaymentMethodContent'
import style from "./css/PaymentMethodContent.module.css"
const PaymentMethod = (props) => {
  return (
    <div>
      <h2 className={`f-600 l-137 text-black text-center ${style["payment-method-h2"]}`}>{props.heading}</h2>
      <PaymentMethodContent></PaymentMethodContent>
    </div>
  )
}

export default PaymentMethod
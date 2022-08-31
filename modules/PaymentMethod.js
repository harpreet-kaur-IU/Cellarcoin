import React from 'react'
import PaymentMethodContent from './PaymentMethodContent'

const PaymentMethod = (props) => {
  return (
    <div>
        <h2 className='f-600 l-137 text-black text-center'>{props.heading}</h2>
        <PaymentMethodContent></PaymentMethodContent>
    </div>
  )
}

export default PaymentMethod
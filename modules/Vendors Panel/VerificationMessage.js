import Link from 'next/link'
import React from 'react'
import styles from '.././css/Vendor Panel/Verification.module.css'

const VerificationMessage = () => {
  return (
    <div className={`col-6 offset-3 d-flex d-flex-column d-align-center d-justify-content ${styles["verification-wrapper"]}`}>
      <img src='images/Documents verify.png'></img>
      <h3 className='f-600 text-primary'>Verification in progress</h3>
      <h6 className='text-center f-400'>We will notify you when your account will be activated after verification. It might take 2 working days.</h6>
      <button className='btn-secondary f-600'>
        <Link href="/vendorlogin">Log Out</Link>
      </button>
    </div>
  )
}

export default VerificationMessage
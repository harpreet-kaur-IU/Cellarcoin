import React from 'react'
import FooterCompanyLogo from './FooterCompanyLogo'
import FooterMenuBar from './FooterMenuBar'
import FooterExplore from './FooterExplore'
import styles from './css/Footer.module.css'
const Footer = () => {
  return (
    <>
        <footer className='bg-primary mt-32'>
            <div className={`container d-flex d-flex-wrap text-white pt-76 pb-175 ${styles["footer-container"]}`}>
                <div className={`col-3 pr-56 ${styles["footer-company-logo-wrapper"]}`}>           
                    <img src='images/logo.png'></img>
                    <p className='mt-54 f-400 l-137 font-16'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo at risus proin placerat sit. Lacus, leo eleifend consequat, placerat imperdiet sed.</p> 
                </div>
                {/* <div className={`col-3 ${styles["footer-explore-wrapper"]}`}>
                    <FooterExplore></FooterExplore>
                </div> */}
                <div className={`col-9 ${styles["footer-menu-bar"]}`}>
                    <FooterMenuBar></FooterMenuBar>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer
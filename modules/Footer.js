import React from 'react'
import FooterCompanyLogo from './FooterCompanyLogo'
import FooterMenuBar from './FooterMenuBar'
import FooterExplore from './FooterExplore'

const Footer = () => {
  return (
    <>
        <footer className='bg-primary mt-88 '>
            <div className="container d-flex d-flex-wrap text-white pt-76 pb-175">
                <div className="col-3 pr-56">           
                    <FooterCompanyLogo></FooterCompanyLogo>
                </div>
                <div className='col-3 '>
                    <FooterExplore></FooterExplore>
                </div>
                <div className="col-6 ">
                    <FooterMenuBar></FooterMenuBar>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer
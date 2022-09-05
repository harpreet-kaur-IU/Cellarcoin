import React from 'react'
import styles from './css/Footer.module.css'

const FooterExplore = () => {
  return (
    <>
        <h3 className={`font-25 ${styles["footer-explore-h3"]}`}>Explore</h3>
        <div className={`d-grid grid-col-2 mt-24 ${styles["wine-explore-grid-gap"]}`}>
            <ul className=''>
                <li className='mt-16 f-500'><a className="text-white font-16" href="">Art</a></li>
                <li className='mt-16 f-500'><a className="text-white font-16" href="">Sports</a></li>
                <li className='mt-16 f-500'><a className="text-white font-16" href="">Utility</a></li>
            </ul>
            <ul className=''>
                <li className='mt-16 f-500'><a className="text-white font-16" href="">Collectibles</a></li>
                <li className='mt-16 f-500'><a className="text-white font-16" href="">Virtual World</a></li>
                <li className='mt-16 f-500'><a className="text-white font-16" href="">Trading Cards</a></li>
            </ul>
        </div>

    </>
  )
}

export default FooterExplore
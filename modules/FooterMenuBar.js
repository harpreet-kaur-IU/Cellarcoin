import React from 'react'

const FooterMenuBar = () => {
  return (
    <div className='d-grid grid-col-3'>
        <ul >
            <li>
                <h3 className='font-25'>My Account</h3>
                <ul className='mt-24'>
                    <li className='mt-16 f-500'><a className="text-white font-16" href="">My Profile</a></li>
                    <li className='mt-16 f-500'><a className="text-white font-16" href="">My Favorites</a></li>
                    <li className='mt-16 f-500'><a className="text-white font-16" href="">My Account Settings</a></li>
                    <li className='mt-16 f-500'><a className="text-white font-16" href="">My Wallet</a></li>
                </ul>
            </li>
        </ul>

        <ul >
            <li>
                <h3 className='font-25'>Resources</h3>
                <ul className='mt-24'>
                    <li className='mt-16 f-500'><a className="text-white font-16" href="">Help Center</a></li>
                    <li className='mt-16 f-500'><a className="text-white font-16" href="">Discord Community</a></li>
                    <li className='mt-16 f-500'><a className="text-white font-16" href="">Blog</a></li>
                    <li className='mt-16 f-500'><a className="text-white font-16" href="">Newsletter</a></li>
                </ul>
            </li>
        </ul>

        <ul>
            <li>
                <h3 className='font-25'>Company</h3>
                <ul className='mt-24'>
                    <li className='mt-16 f-500'><a className="text-white font-16" href="">About us</a></li>
                </ul>
            </li>
        </ul>

    </div>
  )
}

export default FooterMenuBar